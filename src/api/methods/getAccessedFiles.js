import { makeRequest } from '../makeRequest.js'

/**
 * Получение файлов, к которым есть доступ
 */
export const getAccessedFiles = async () => makeRequest('/files/shared')
