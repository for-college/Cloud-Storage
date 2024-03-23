import { makeRequest } from '../makeRequest.js'

/**
 * Получение файлов юзера
 */
export const getFiles = async () => makeRequest('/files/disk')
