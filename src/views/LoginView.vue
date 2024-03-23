<script setup>
import {computed, reactive, ref} from 'vue'

import FormItem from '@/components/FormItem.vue'
import Button from '@/components/Button.vue'
import Title from '@/components/Title.vue'
import ErrorText from '@/components/ErrorText.vue'
import Form from '@/components/Form.vue'

import {login} from '@/api/methods'
import router from '@/router'
import {useAuthStore} from '@/stores/auth.js'

const {setToken} = useAuthStore()

const loginInput = ref()
const passwordInput = ref()
const errors = reactive({
  data: {}
})

const onSubmit = async () => {
  errors.data = {}
  const data = await login(loginInput.value, passwordInput.value)

  if (data?.code === 401 || data?.code === 422) {
    errors.data = data.message
    return
  }

  setToken?.(data.token)
  await router.replace({name: 'home'})
}

const updateInput = (field, event) => {
  switch (field) {
    case 'login':
      errors.data.email = []
      loginInput.value = event.target.value
      break
    case 'password':
      errors.data.password = []
      passwordInput.value = event.target.value
      break
    default:
      break
  }
}

const authFailed = computed(() => errors.data)
</script>

<template>
  <main class="wrapper">
    <Form method="post" :submit="onSubmit">
      <Title>
        Вход
      </Title>

      <ErrorText v-if="errors.data.length">
        {{ authFailed }}
      </ErrorText>

      <FormItem
          id="login"
          :error-messages="errors?.data?.email"
          :on-change="(event) => updateInput('login', event)"
          :value="loginInput"
          label="Введите логин"
          placeholder="Введите логин"
      />

      <FormItem
          id="password"
          :error-messages="errors?.data?.password"
          :on-change="(event) => updateInput('password', event)"
          :value="passwordInput"
          label="Введите пароль"
          placeholder="Введите пароль"
          type="password"
      />

      <Button type="submit" @submit="onSubmit">
        Логин
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
