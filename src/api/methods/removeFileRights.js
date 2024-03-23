import { makeRequest } from '../makeRequest.js'

/**
 * Удаление прав доступа для файла
*/
export const removeFileRights = async (fileId, email) =>
  makeRequest(`/files/${fileId}/accesses`, 'delete', JSON.stringify({ email }))
