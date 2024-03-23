import { uploadFiles } from '@/api/methods'

/**
 * Загрузка файла на сервер
*/
export const handleUploadFiles = async (files) => {
    /** Формируем бинарник */
    const formData = new FormData()

    /** Добавляем в него файлы по индексу */
    for (let i = 0; i < files.length; i++) formData.append(`files[${i}]`, files[i])

    /** Загружаем на сервер и отдаем ответ */
    return uploadFiles(formData)
};
