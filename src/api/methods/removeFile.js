import { makeRequest } from '../makeRequest.js'

/**
 * Удаление файла
*/
export const removeFile = async (fileId) =>
  makeRequest(`/files/${fileId}`, 'delete')
