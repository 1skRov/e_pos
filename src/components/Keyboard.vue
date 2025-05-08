<script>
import { defineComponent, ref, watch } from 'vue'
import { NInput, NIcon } from 'naive-ui'
import { BackspaceSharp } from '@vicons/ionicons5'

export default defineComponent({
  name: 'SearchKeyboard',
  components: {
    NInput,
    NIcon,
    BackspaceSharp,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'cancel'],
  setup(props, { emit }) {
    const currentValue = ref(props.modelValue)
    const originalValue = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (newVal) => {
        currentValue.value = newVal
        originalValue.value = newVal
      },
    )

    const appendValue = (val) => {
      currentValue.value += val
    }

    const backspace = () => {
      currentValue.value = currentValue.value.slice(0, -1)
    }

    const clear = () => {
      currentValue.value = ''
    }

    const cancelChanges = () => {
      currentValue.value = originalValue.value
      emit('cancel')
    }

    const confirmChanges = () => {
      originalValue.value = currentValue.value
      emit('update:modelValue', currentValue.value)
    }

    const keyboardRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ]

    return {
      currentValue,
      appendValue,
      backspace,
      clear,
      cancelChanges,
      confirmChanges,
      keyboardRows,
    }
  },
})
</script>

<template>
  <div class="search-keyboard-panel">
    <div class="input-back">
      <n-input class="search-input" v-model:value="currentValue" readonly size="large" placeholder="Поиск..."/>
      <button class="back-button" @click="backspace">
        <n-icon size="30" color="#0284c7">
          <BackspaceSharp />
        </n-icon>
      </button>
    </div>
    <div class="keys-panel">
      <div class="row" v-for="(row, index) in keyboardRows" :key="index">
        <button
          v-for="key in row"
          :key="key"
          class="key-button"
          @click="appendValue(key)"
        >
          {{ key }}
        </button>
      </div>
      <div class="row">
        <button class="key-button space-button" @click="appendValue(' ')">Пробел</button>
      </div>
      <div class="action-row">
        <button class="action-button clear-button" @click="clear">Очистить</button>
        <button class="action-button cancel-button" @click="cancelChanges">Отмена</button>
        <button class="action-button ok-button" @click="confirmChanges">ОК</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-keyboard-panel {
  display: flex;
  flex-direction: column;
  width: 690px;
  gap: 12px;

  .input-back {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;

    .search-input {
      width: 100%;
      font-size: 20px;
    }

    .back-button {
      width: 80px;
      height: 45px;
      font-size: 20px;
      border-radius: 8px;
      background: #e0f2fe;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .keys-panel {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .row {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;

      .key-button {
        border: 1px solid #7dd3fc;
        background: #e0f2fe;
        border-radius: 8px;
        font-size: 20px;
        width: 60px;
        height: 60px;
        cursor: pointer;

        &:active {
          background: #bae6fd;
        }
      }
      .space-button {
        flex: 1;
        text-align: center;
        font-size: 18px;
      }
    }

    .action-row {
      display: flex;
      gap: 8px;
      justify-content: space-around;

      .action-button {
        flex: 1;
        height: 60px;
        font-size: 20px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }

      .clear-button {
        background: #e0f2fe;
        color: #0284c7;
      }
      .cancel-button {
        background: #d23050;
        color: #ffffff;
      }
      .ok-button {
        background: #0284c7;
        color: #ffffff;
      }
    }
  }
}
</style>
