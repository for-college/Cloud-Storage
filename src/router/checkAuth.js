import { useAuthStore } from '@/stores/auth.js'
import { storeToRefs } from 'pinia'

/**
 * По заданию ее делать не надо, но это хорошая функция ^_^
 *
 * Функция принимает параметры от vue и смотрит, куда передвигается юзер
 * В зависимости от того, авторизирован он или нет, мы либо совершаем переход, либо переводим на регистрацию
 * В идеале в сторе для токена или на стадии его вставки проверять, валиден ли он, потому что юзер может подставить в localStorage все что угодно
 * Но угрозы это не несет, да и по заданию не проверяется
 */
export const checkAuth = (to, from, next) => {
  const state = useAuthStore()
  const { token } = storeToRefs(state)
  const isToLogin = to.name === 'login'
  const isToRegister = to.name === 'register'

  /**
   * Запрещаем ходить по сайту на авторизированным пользователяи
   */
  if (!(isToLogin || isToRegister) && !token.value) {
    return next({ name: 'register' })
  }

  next()
}
