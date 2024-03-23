import { makeRequest } from '../makeRequest.js'

/**
 * Регистрация
 */
export const registration = async (email, password, first_name, last_name) =>
  makeRequest(
    '/registration',
    'post',
    JSON.stringify({ email, password, first_name, last_name })
  )
