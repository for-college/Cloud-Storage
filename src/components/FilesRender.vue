<script setup>
import router from '@/router/index.js'
import { handleDownloadFile } from '@/utils'

import Button from '@/components/Button.vue'

defineProps({
  data: {
    type: Array,
    required: true
  },
  showAdditionalButtons: {
    type: Boolean,
    default: false
  },
  onDelete: {
    type: Function,
    required: false
  }
})

const handleChangeRights = async (fileId, fileName) => {
  await router.push({ name: `rights`, params: { id: fileId, name: fileName } })
}

const handleEdit = async (fileId, fileName) => {
  await router.push({ name: `edit`, params: { id: fileId, name: fileName } })
}

</script>

<template>
  <div class="filesWrapper">
    <ul class="filesList">
      <li v-for="(file, index) in data" :key="file.file_id">
        {{ index + 1 }}. <br/>
        id: {{ file.file_id }}
        <p>{{ file.name }}</p>

        <div class="buttonsList">
          <Button @click="handleDownloadFile(file)">Скачать</Button>
          <template v-if="showAdditionalButtons">
            <Button @click="onDelete(file.file_id)">Удалить</Button>
            <Button @click="handleChangeRights(file.file_id, file.name)">Изменить права доступа</Button>
            <Button @click="handleEdit(file.file_id, file.name)">Редактировать</Button>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.buttonsList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttonsList button {
  max-width: 300px;
}

.filesList {
  padding: 0 15px;
  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
}
</style>
