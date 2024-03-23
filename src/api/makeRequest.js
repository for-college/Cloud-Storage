import { API_URL } from '@/config/constants.js'

/**
 * Утилита для удобного взаимодействия с сервером
 *
 * @param {string} path
 * @param {'get' | 'post' | 'PATCH' | 'delete'} method
 * @param {string|undefined} body
 * @param type
 */
export const makeRequest = async (
  path,
  method = 'get',
  body = undefined,
  type = undefined
) => {
  /**
   * Для каждого из post/patch запросов в задании передаётся body
   * Если его вдруг нет - ошибочка
   */
  const methodsWithBody = ['post', 'PATCH']
  if (methodsWithBody.includes(method) && !body) {
    throw new Error('wassup where is ur body')
  }

  const token = localStorage.getItem('token')

  /** Токен требуется во всех запросах, кроме авторизации и регистрации */
  const pathsWithoutToken = ['/authorization', '/registration']
  if (!pathsWithoutToken.includes(path) && !token) {
    throw new Error('token for request not found')
  }

  const headers = {
    Authorization: `Bearer ${token}`
  }

  /** Для форм даты fetch сам поставит нужный тип контента */
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(API_URL + path, {
    body,
    method,
    headers
  })

  /**
   * Для скачивания файлов нам нужен .blob(), поэтому доп. параметр для этого
   * В идеале вынести логику обработки ответа из makeRequest, чтобы она возвращала чистый response
   * Также, как сделано в нашем сетевом городе (https://github.com/diary-spo/core)
   */
  if (type === 'blob') {
    return response.blob()
  }

  if (type === null) {
    return response
  }

  return response.json()
}
