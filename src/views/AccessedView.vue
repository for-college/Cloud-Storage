<script setup>
import { onMounted, reactive } from 'vue'
import { getAccessedFiles } from '@/api/methods'

import Title from '@/components/Title.vue'
import FilesRender from '@/components/FilesRender.vue'

const userFiles = reactive({
  data: [],
  isLoading: false,
})

onMounted(async () => {
  const handleGetFiles = async () => {
    userFiles.isLoading = true
    try {
      const data = await getAccessedFiles()
      userFiles.data = data
      console.log('userFiles.data', data)
    } catch (e) {
      userFiles.data = []
      console.log(e)
    } finally {
      userFiles.isLoading = false
    }
  }

  await handleGetFiles()
})
</script>

<template>
  <main>
    <template v-if="userFiles.data.length">
      <Title is="p">Доступные файлы</Title>
      <FilesRender :data="userFiles.data" />
    </template>
    <Title is="p" v-else-if="userFiles.isLoading">Загрузка...</Title>
    <Title is="p" v-else>Нет доступных файлов</Title>

  </main>
</template>
