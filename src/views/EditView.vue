<script setup>
import { onMounted, reactive } from 'vue'
import { editFile } from '@/api/methods'
import { useRoute } from 'vue-router'

import Title from '@/components/Title.vue'
import FormItem from '@/components/FormItem.vue'
import Form from '@/components/Form.vue'
import Button from '@/components/Button.vue'
import ErrorText from '@/components/ErrorText.vue'

const userFiles = reactive({
  data: [],
  fileName: '',
  newFileName: '',
  fileId: '',
  isError: false,
  errors: [],
  successMessage: ''
})

const handleChangeFileName = async () => {
  try {
    userFiles.successMessage = ''
    const data = await editFile(userFiles.fileId, userFiles.newFileName)

    if (data.code === 422 || data.code === 401) {
      userFiles.errors = data.errors
      return
    }

    userFiles.successMessage = 'Успех'
  } catch (e) {
    console.log(e)
    userFiles.successMessage = ''
    userFiles.isError = true
  }
}

const handleInputChange = (e) => {
  userFiles.newFileName = e.target.value
}

onMounted(() => {
  const route = useRoute()
  const params = route.params

  userFiles.newFileName = params.name
  userFiles.fileName = params.name
  userFiles.fileId = params.id
})

</script>

<template>
  <main>
    <ErrorText v-if="userFiles.isError">Ошибка при работе с сервером</ErrorText>
    <Title is="p" v-if="userFiles.successMessage">Успешно</Title>

    <template v-if="userFiles.fileName">
      <Title is="p">Редактирование файла</Title>

      <Form method="post" @submit.prevent="handleChangeFileName">
        <FormItem
            :on-change="handleInputChange"
            :error-messages="userFiles.errors?.name"
            :value="userFiles.newFileName || userFiles.fileName"
            id="edit"
            label="Имя файла"
        />

        <Button type="submit">Обновить</Button>
      </Form>
    </template>

    <Title is="p" v-else-if="userFiles.isLoading">Загрузка...</Title>
    <Title is="p" v-else>Нет доступных файлов</Title>
  </main>
</template>
