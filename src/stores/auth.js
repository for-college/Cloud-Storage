import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useAuthStore = defineStore('counter', () => {
  const token = ref(localStorage.getItem('token'))

  const checkToken = () => {
    const storageToken = localStorage.getItem('token')

    if (!storageToken) return

    token.value = storageToken
  }

  /**
   * @param {string} value
   */
  const setToken = (value) => {
    token.value = value
    localStorage.setItem('token', value)
  }

  return { setToken, token }
})
