import { downloadFile } from '@/api/methods'

/**
 * Скачивание файла при клике на кнопку
 * Принимает file и отправляет запрос для получения бинарника от сервера
 * Потом создаётся ссылка и в href подставляется data на основе этого бинарника
 * Собственно, для скачивания клием по ссылке
 *
 * @param {never} file
 */
export const handleDownloadFile = async (file) => {
    /** Получаем бинарник */
    const data = await downloadFile(file.file_id)

    /** Создаем ссылку и скачиваем файл */
    const a = document.createElement("a");
    a.href = URL.createObjectURL(data);
    a.download = file.name
    a.click();
}
