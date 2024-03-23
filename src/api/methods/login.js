import { makeRequest } from '../makeRequest.js'

/**
 * Авторизация
 */
export const login = async (email, password) =>
  makeRequest('/authorization', 'post', JSON.stringify({ email, password }))
