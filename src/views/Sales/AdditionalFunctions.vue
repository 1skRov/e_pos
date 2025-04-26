<script setup>
import { useMessage, NAlert } from 'naive-ui'
const { error } = useMessage()
import { h } from 'vue'
const renderErrorAlert = (props) => {
  return h(
    NAlert,
    {
      type: props.type === 'loading' ? 'default' : props.type,
      title: 'Ошибка обработки',
      closable: props.closable,
      onClose: props.onClose,
      style: {
        boxShadow: 'var(--n-box-shadow)',
        maxWidth: 'calc(100vw - 32px)',
        width: '600px',
        lineHeight: '1.6',
        whiteSpace: 'pre-wrap',
      },
    },
    {
      default: () =>
        `Произошла непредвиденная ошибка при попытке выполнить операцию.
Пожалуйста, проверьте введённые данные и попробуйте снова.
Если проблема сохраняется, обратитесь в техподдержку.`,
    },
  )
}

function handleExampleMessage() {
  error('', {
    render: renderErrorAlert,
    closable: true,
  })
}
</script>

<template>
<button class="add-btn" @click="handleExampleMessage">Пример сообщения</button>
</template>

<style scoped lang="scss">
</style>
