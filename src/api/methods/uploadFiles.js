import { makeRequest } from '../makeRequest.js'

/**
 * Загрузка файлов на сервер
 */
export const uploadFiles = async (formData) =>
  makeRequest('/files', 'post', formData)
