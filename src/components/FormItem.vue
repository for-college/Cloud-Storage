<script setup>
defineProps({
  value: String,
  id: String,
  onChange: Function,
  label: String,
  placeholder: String,
  type: {
    required: false,
    default: 'text',
    type: String
  },
  errorMessages: {
    required: false,
    type: Array,
    default: []
  },
  isRequired: {
    required: false,
    type: Boolean,
    default: false
  },
})
</script>

<template>
  <div class="inputWrapper">
    <label :for="id">
      {{ label }}
    </label>

    <input
        :id="id"
        :class="['input', {error: errorMessages?.length}]"
        :placeholder="placeholder"
        :required="isRequired"
        :type="type"
        :value="value"
        @input="onChange"
    >

    <!-- Рендер ошибок, если имеются -->
    <ul v-if="errorMessages.length">
      <li class="errorMessage" v-for="errorMessage in errorMessages">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.inputWrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input {
  border-radius: 5px;
  padding: 5px 8px;
  outline: none;
  border: 1px solid var(--secondary-bg);
  background-color: var(--light-bg);
  color: white;
}

.error {
  border: 1px solid var(--error-text);
  color: var(--error-text);
}

.errorMessage {
  color: var(--error-text);
  font-size: 16px;
}
</style>
