import { makeRequest } from '../makeRequest.js'

/**
 * Скачивание файла
*/
export const downloadFile = async (fileId) =>
  makeRequest(`/files/${fileId}`, 'get', undefined, 'blob')
