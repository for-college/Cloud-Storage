<script setup>
import { reactive, ref } from 'vue'

import { handleDownloadFile, handleUploadFiles } from '@/utils'

import Form from '@/components/Form.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'

const isUploading = ref(false)
const uploadedFiles = reactive({data: []})

const onFileChange = async (event) => {
  const files = event.target.files
  if (!files?.length) return

  isUploading.value = true
  try {
    uploadedFiles.data = await handleUploadFiles(files)
  } catch (e) {
    uploadedFiles.data = []
    console.log(e)
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <main>
    <section>
      <Title>Загрузка файлов</Title>

      <p>
        Выберите файлы для загрузки (до 2 МБ, doc, pdf, docx, zip, jpeg, jpg, png):
      </p>

      <Form method="post" @submit.prevent="onFileChange" :submit="onFileChange">
        <input id="fileInput" multiple type="file" @change="onFileChange"/>
      </Form>
    </section>

    <div v-if="isUploading">
      <p>Загрузка файлов...</p>
    </div>

    <section v-else-if="uploadedFiles.data.length > 0">
      <Title>Загруженные файлы</Title>
      <ul class="filesList">
        <li class="item" v-for="(file, index) in uploadedFiles.data" :key="file.file_id">
          <p>{{ index + 1 }}. {{ file.name }}</p>

          <p class="status">
            Статус:
            <template v-if="file.success">загружен</template>
            <template v-else>ошибка</template>
          </p>

          <Button v-if="file.success" @click="handleDownloadFile(file)" style-type="outline">Скачать</Button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.item a {
  padding: 5px;
  display: inline-block;
}

.item a:hover {
  color: var(--secondary-color);
}

.item:active a:hover {
  color: var(--primary-bg);
}

.filesList {
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status {
  margin: 10px 0;
}
</style>
