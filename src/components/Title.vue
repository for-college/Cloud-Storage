<script setup>
defineProps({
  id: String,
  component: {
    required: false,
    type: String,
    default: 'h2'
  },
})
</script>

<template>
  <component
      :is="component"
      :id="id"
      :class="['title', component]"
  >
    <slot/>
  </component>
</template>

<style scoped>
.title {
  font-size: 26px;
  margin-bottom: 5px;
  text-align: center;
}
</style>