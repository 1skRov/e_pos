<script setup>
import {ref, h} from 'vue'
import QuickItemsDrawer from "@/views/Sales/ProductForFastChoice.vue"
import {useMessage, NAlert} from 'naive-ui'

const showQuickItems = ref(false)
const {error} = useMessage()

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
        whiteSpace: 'pre-wrap'
      }
    },
    {
      default: () =>
        `Произошла непредвиденная ошибка при попытке выполнить операцию.
Пожалуйста, проверьте введённые данные и попробуйте снова.
Если проблема сохраняется, обратитесь в техподдержку.`
    }
  )
}

function handleExampleMessage() {
  error('', {
    render: renderErrorAlert,
    closable: true
  })
}
</script>

<template>
  <div class="main-footer">
    <div class="sale-information">
      <div class="info-item" style="margin-bottom: 15px;">
        <h1>Итого</h1>
        <h1 class="value">250000</h1>
      </div>
      <div class="info-item">
        <h2>Получено</h2>
        <h2 class="value">120000</h2>
      </div>
      <div class="info-item">
        <h2>Сдача</h2>
        <h2 class="value">56</h2>
      </div>
    </div>
    <div class="btns">
      <div class="additional-buttons">
        <button @click="handleExampleMessage">Пример сообщения</button>
        <button>Закрыть заказ</button>
        <button @click="showQuickItems = true">Быстрые товары</button>
        <button>отложка</button>
        <button>доп. функции</button>
      </div>
      <div class="finish-delete">
        <button class="delete">Удалить выбранные</button>
        <button class="pay">Оплатить</button>
      </div>
    </div>
    <n-drawer v-model:show="showQuickItems" placement="bottom" height="60%">
      <n-drawer-content title="Быстрые товары">
        <QuickItemsDrawer @close="showQuickItems = false"/>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped lang="scss">
.main-footer {
  background: #e0f2fe;
  padding: 12px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  min-height: 270px;

  button {
    border: none;
    background: none;
    font-size: 20px;
    border-radius: 8px;
  }

  .sale-information {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #bae6fd;
    padding: 20px;
    color: #444343;
    min-width: 300px;
    max-width: 800px;

    .info-item {
      display: flex;
      width: 100%;
      justify-content: space-between;

      h1, h2 {
        width: 100%;
      }

      .value {
        padding-left: 8px;
      }
    }
  }

  .btns {
    display: flex;
    gap: 8px;
    max-width: 500px;

    .additional-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      button {
        background: #ffffff;
        width: 160px;
        height: 75px;
        padding: 10px;
        border: 1px solid #bae6fd;

        &:hover {
          background: #f0f9ff;
        }

        &:active {
          background: #e0f2fe;
          color: #0284c7;
        }
      }
    }

    .finish-delete {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .delete {
        width: 160px;
        text-align: center;
        background: #d23050;
        color: #ffffff;
        height: 75px;
        border: 1px solid #ffffff;
      }

      .pay {
        background: #0284c7;
        color: #ffffff;
        flex: 1;
        font-size: 28px;

        &:active {
          background: #0ea5e9;
        }
      }
    }
  }
}
</style>
