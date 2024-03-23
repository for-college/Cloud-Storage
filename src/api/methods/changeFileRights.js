import { makeRequest } from '../makeRequest.js'

/**
 * Изменение прав доступа для файла
*/
export const changeFileRights = async (fileId, email) =>
  makeRequest(`/files/${fileId}/accesses`, 'post', JSON.stringify({ email }))
