<script setup>
import {RouterLink} from "vue-router"
import {storeToRefs} from "pinia"

import {useAuthStore} from "@/stores/auth.js"
import router from "@/router/index.js"
import {logOut} from "@/api/methods/logOut.js"

import Button from "@/components/Button.vue"


const state = useAuthStore()

const { token } = storeToRefs(state)

const handleLogOut = async () => {
  try {
    await logOut()
    state.setToken('')

    await router.replace({name: 'login'})
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <header class="header">
    <nav>
      <ul class="list anuth" v-if="!token">
        <li class="item">
          <RouterLink to="/register">Регистрация</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/login">Вход</RouterLink>
        </li>
      </ul>

      <ul class="list auth" v-else>
        <li class="item">
          <RouterLink to="/">Список загруженных файлов</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/upload">Загрузка файлов</RouterLink>
        </li>
        <li class="item">
          <RouterLink to="/accessed">Список доступных файлов</RouterLink>
        </li>
        <li class="item">
          <Button @click="handleLogOut()">Выход</Button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: var(--secondary-bg);
  border-radius: 10px;
}

.list {
  display: flex;
  gap: 10px;

  list-style-type: none;
}

.item a {
  padding: 5px;
  display: inline-block;
}

.item:hover a {
  color: var(--secondary-color);
}

.item:active a {
  color: var(--primary-bg);
}

.anuth {
  justify-content: flex-start;
}

.auth {
  justify-content: space-between;
}
</style>
