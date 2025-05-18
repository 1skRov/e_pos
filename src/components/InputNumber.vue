<script>
import {defineComponent, ref, watch} from 'vue'
import {NInput, NButton, NIcon} from 'naive-ui'
import {BackspaceSharp, RemoveOutline, AddOutline} from '@vicons/ionicons5'

export default defineComponent({
  name: 'CalcItem',
  components: {
    NInput,
    NButton,
    NIcon,
    BackspaceSharp,
    RemoveOutline,
    AddOutline
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue', 'cancel'],
  setup(props, {emit}) {
    const currentValue = ref(props.modelValue.toString())
    const originalValue = ref(props.modelValue.toString())

    watch(
      () => props.modelValue,
      (newVal) => {
        currentValue.value = newVal.toString()
        originalValue.value = newVal.toString()
      },
    )

    const appendValue = (val) => {
      currentValue.value += val
    }

    const backspace = () => {
      currentValue.value = currentValue.value.slice(0, -1)
    }

    const cancelChanges = () => {
      currentValue.value = originalValue.value
      emit('cancel')
    }

    const confirmChanges = () => {
      originalValue.value = currentValue.value
      emit('update:modelValue', Number(currentValue.value))
      emit('close')
    }

    const decrement = () => {
      const num = Number(currentValue.value) || 0
      currentValue.value = String(num - 1)
    }
    const increment = () => {
      const num = Number(currentValue.value) || 0
      currentValue.value = String(num + 1)
    }
    const clearEntry = () => {
      currentValue.value = ''
    }

    return {
      currentValue,
      appendValue,
      backspace,
      cancelChanges,
      confirmChanges,
      decrement,
      increment,
      clearEntry
    }
  },
})
</script>

<template>
  <div class="calc-panel">
    <div class="input-back">
      <n-button tertiary circle @click="decrement">
        <n-icon size="30">
          <RemoveOutline/>
        </n-icon>
      </n-button>
      <n-input class="calc-input" v-model:value="currentValue" readonly size="large" />
      <n-button tertiary circle @click="increment">
        <n-icon size="30">
          <AddOutline/>
        </n-icon>
      </n-button>
    </div>
    <div class="numbers-panel">
      <div class="num-buttons">
        <button class="number-button" @click="appendValue('7')">7</button>
        <button class="number-button" @click="appendValue('8')">8</button>
        <button class="number-button" @click="appendValue('9')">9</button>
        <button class="number-button" @click="appendValue('4')">4</button>
        <button class="number-button" @click="appendValue('5')">5</button>
        <button class="number-button" @click="appendValue('6')">6</button>
        <button class="number-button" @click="appendValue('1')">1</button>
        <button class="number-button" @click="appendValue('2')">2</button>
        <button class="number-button" @click="appendValue('3')">3</button>
        <button class="number-button" @click="appendValue('0')">0</button>
        <button class="number-button" @click="appendValue('.')">.</button>
        <button class="number-button" @click="backspace">
          <n-icon size="30" color="#0284c7">
            <BackspaceSharp />
          </n-icon>
        </button>
      </div>
      <div class="additional-buttons">
        <button class="ok" @click="confirmChanges">ОК</button>
        <button class="cancel" @click="cancelChanges">Отмена</button>
        <button class="CE" @click="clearEntry">CE</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
}

.number-button {
  border: 1px solid #7dd3fc;
  background: #e0f2fe;
  border-radius: 8px;
  font-size: 20px;
  width: 75px;
  height: 75px;

  &:active {
    background: #bae6fd;
  }
}

.calc-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 8px;

  .input-back {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;

    .calc-input {
      width: 100%;
      font-size: 20px;
    }
  }

  .numbers-panel {
    display: flex;
    gap: 8px;

    .num-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .additional-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;

      button {
        width: 100px;
        height: 100%;
        font-size: 20px;
        border-radius: 8px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .ok {
        background: #0284c7;
        color: white;

        &:active {
          background: #0b9eea;
        }
      }

      .cancel {
        background: #d23050;
        color: #ffffff;

        &:active {
          background: #f14668;
        }
      }

      .CE {
        background: #f5b106;

        &:active {
          background: #f6d322;
        }
      }
    }
  }
}
</style>
