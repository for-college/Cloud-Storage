<script setup>
defineProps({
  submit: {
    type: Function,
    required: false
  },
  method: {
    type: String,
    required: true
  },
})
</script>

<template>
  <form class="form" :method="method"  :submit.prevent="submit" @submit.prevent="submit">
    <slot />
  </form>
</template>

<style scoped>
.form {
  padding: 20px 50px;
  border-radius: 10px;
  background-color: var(--secondary-bg);

  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
