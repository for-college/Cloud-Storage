import { makeRequest } from '../makeRequest.js'

/**
 * Выход из аккаунта
*/
export const logOut = async () =>
  makeRequest(`/logout`, 'get', undefined, null)
