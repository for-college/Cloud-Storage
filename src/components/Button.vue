<script setup>
defineProps({
  id: String,
  styleType: {
    default: 'bordered',
    required: false,
    type: String
  },
  type: {
    required: false,
    type: String,
    default: 'button'
  },
})
</script>

<template>
  <button :class="['button', styleType]" :type="type">
    <slot/>
  </button>
</template>

<style scoped>
.button {
  background-color: transparent;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;

  cursor: pointer;
  font-weight: bold;

  transition: all .15s linear;
}

.bordered {
  border: 1px solid var(--secondary-color);
  background-color: var(--secondary-color);
}

.outline {
  border: 1px solid var(--secondary-color);
  color: var(--secondary-color);
}

.button.outline:hover {
  background-color: var(--secondary-color);
  color: white;
}

.button.bordered:hover {
  background-color: transparent;
  color: var(--secondary-color);
}

.button.outline:active {
  background-color: #00e896;
  color: white;
}

.button.bordered:active {
  background-color: transparent;
  border: 1px solid transparent;
  color: #00e896;
}

</style>
