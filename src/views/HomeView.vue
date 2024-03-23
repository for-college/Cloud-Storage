<script setup>
import { onMounted, reactive } from 'vue'

import { getFiles, removeFile } from '@/api/methods'

import Title from '@/components/Title.vue'
import FilesRender from '@/components/FilesRender.vue'

const userFiles = reactive({
  data: [],
  isLoading: false,
})

const handleGetFiles = async () => {
  userFiles.isLoading = true
  try {
    userFiles.data = await getFiles()
  } catch (e) {
    userFiles.data = []
    console.log(e)
  } finally {
    userFiles.isLoading = false
  }
}

onMounted(async () => await handleGetFiles())

const handleDelete = async (fileId) => {
  try {
    const response = await removeFile(fileId)

    if (!response.success) {
      return
    }

    await handleGetFiles()
  } catch (e) {
    console.error(e)
  }
}

</script>

<template>
  <div>
    <Title is="span" v-if="userFiles.isLoading">Загрузка...</Title>
    <Title v-else-if="!userFiles.data.length">Загруженные файлы не найдены</Title>

    <template v-else>
      <Title>Список ваших файлов</Title>
      <FilesRender :data="userFiles.data" show-additional-buttons :on-delete="handleDelete"/>
    </template>
  </div>
</template>
