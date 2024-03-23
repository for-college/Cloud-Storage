<script setup>

</script>

<template>
<component is="strong" class="text">
  <slot />
</component>
</template>

<style scoped>
.text {
  margin: 10px 0;
  padding: 5px 10px;
  border: 1px solid var(--error-text);
  border-radius: 10px;
  color: var(--error-text);
}
</style>