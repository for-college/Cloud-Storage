<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { changeFileRights, getFiles } from '@/api/methods'

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

/**
 * Получение юзеров, у которых есть права на файл
 * Т.к. отдельного роута для этого нет, приходится получать все файлы и фильровать по id
*/
const handleGetFiles = async () => {
  userFiles.isLoading = true
  try {
    userFiles.data = (await getFiles()).filter(file => file.file_id === userFiles.fileId)?.[0].accesses
  } catch (e) {
    userFiles.data = []
    console.log(e)
  } finally {
    userFiles.isLoading = false
  }
}

const handleChangeFileName = async () => {
  try {
    userFiles.successMessage = ''
    const data = await changeFileRights(userFiles.fileId, userFiles.newFileName)

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

onMounted(async () => {
  const route = useRoute()
  const params = route.params

  userFiles.fileId = params.id

  await handleGetFiles()
})

</script>

<template>
  <main>
    <ErrorText v-if="userFiles.isError">Ошибка при работе с сервером</ErrorText>
    <Title is="p" v-else-if="userFiles.successMessage">Успешно</Title>
    <Title is="p" v-else-if="!userFiles.data?.length">Доступа к файлу нет у других юзеров</Title>

    <Title is="p">Добавление прав доступа</Title>

    <Title is="p" v-if="userFiles.isLoading">Загрузка...</Title>
    <Form v-else method="post" @submit.prevent="handleChangeFileName">
      <FormItem
          :on-change="handleInputChange"
          :error-messages="userFiles.errors?.email"
          :value="userFiles.newFileName || userFiles.fileName"
          id="edit"
          type="email"
          label="Добавить пользователя"
      />

      <Button type="submit">Добавить</Button>
    </Form>

  </main>
</template>
