<script setup>
import { computed, reactive } from 'vue'

import FormItem from '@/components/FormItem.vue'
import Form from '@/components/Form.vue'
import Button from '@/components/Button.vue'
import Title from '@/components/Title.vue'
import ErrorText from '@/components/ErrorText.vue'

import { registration } from '@/api/methods'
import router from '@/router'

const inputData = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
})

const errors = reactive({
  data: {}
})

const onSubmit = async () => {
  errors.data = {}
  const data = await registration(inputData.email, inputData.password, inputData.first_name, inputData.last_name)

  if (data?.code === 401 || data?.code === 422) {
    errors.data = data.message
    return
  }

  await router.replace({name: 'login'})
}

const updateInput = (field, event) => {
  switch (field) {
    case 'login':
      errors.data.email = []
      inputData.email = event.target.value
      break
    case 'password':
      errors.data.password = []
      inputData.password = event.target.value
      break
    case 'first_name':
      errors.data.first_name = []
      inputData.first_name = event.target.value
      break
    case 'last_name':
      errors.data.last_name = []
      inputData.last_name = event.target.value
      break
    default:
      break
  }

  throw new Error('Unknown field')
}

const authFailed = computed(() => errors.data)
</script>

<template>
  <main class="wrapper">
    <Title>
      Регистрация
    </Title>

    <ErrorText v-if="errors.data.length">
      {{ authFailed }}
    </ErrorText>

    <Form :submit="onSubmit" method="post">
      <FormItem
          id="login"
          :error-messages="errors?.data?.email"
          :on-change="(event) => updateInput('login', event)"
          :value="inputData.email"
          label="Введите логин"
          placeholder="Введите логин"
      />

      <FormItem
          id="password"
          :error-messages="errors?.data?.password"
          :on-change="(event) => updateInput('password', event)"
          :value="inputData.password"
          label="Введите пароль"
          placeholder="Введите пароль"
          type="password"
      />

      <FormItem
          id="first_name"
          :error-messages="errors?.data?.first_name"
          :on-change="(event) => updateInput('first_name', event)"
          :value="inputData.first_name"
          label="Введите имя"
          placeholder="Введите имя"
      />

      <FormItem
          id="last_name"
          :error-messages="errors?.data?.last_name"
          :on-change="(event) => updateInput('last_name', event)"
          :value="inputData.last_name"
          label="Введите фамилию"
          placeholder="Введите фамилию"
      />

      <Button type="submit" @submit="onSubmit">
        Регистрация
      </Button>
    </Form>


  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
