import { makeRequest } from '../makeRequest.js'

/**
 * Редактирование файла
*/
export const editFile = async (fileId, name) =>
  makeRequest(`/files/${fileId}`, 'PATCH', JSON.stringify({name}))
