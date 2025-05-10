<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { NInput, NIcon, NButton } from 'naive-ui'
import { BackspaceSharp } from '@vicons/ionicons5'

export default defineComponent({
  name: 'SearchKeyboard',
  components: {
    NInput,
    NIcon,
    BackspaceSharp,
    NButton,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'cancel', 'keyboardInput'],
  setup(props, { emit }) {
    const currentValue = ref(props.modelValue)
    const originalValue = ref(props.modelValue)
    const currentLayout = ref('ru')

    watch(
      () => props.modelValue,
      (newVal) => {
        currentValue.value = newVal
        originalValue.value = newVal
      },
    )

    const appendValue = (val) => {
      currentValue.value += val
      emit('keyboardInput', currentValue.value)
    }

    const backspace = () => {
      currentValue.value = currentValue.value.slice(0, -1)
      emit('keyboardInput', currentValue.value)
    }

    const clear = () => {
      currentValue.value = ''
      emit('keyboardInput', currentValue.value)
    }

    const cancelChanges = () => {
      currentValue.value = originalValue.value
      emit('cancel')
    }

    const confirmChanges = () => {
      originalValue.value = currentValue.value
      emit('update:modelValue', currentValue.value)
    }

    const layouts = ref({
      ru: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'],
      ],
      en: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
      ],
    })

    const toggleLayout = () => {
      currentLayout.value = currentLayout.value === 'ru' ? 'en' : 'ru'
    }

    const currentKeyboardRows = computed(() => layouts.value[currentLayout.value])

    return {
      currentValue,
      appendValue,
      backspace,
      clear,
      cancelChanges,
      confirmChanges,
      currentKeyboardRows,
      toggleLayout,
      currentLayout,
    }
  },
})
</script>

<template>
  <div class="search-keyboard-panel">
    <div class="keys-panel">
      <div class="row" v-for="(row, index) in currentKeyboardRows" :key="index">
        <button v-for="key in row" :key="key" class="key-button click-effect" @click="appendValue(key)">
          {{ key }}
        </button>
      </div>
      <div class="row">
        <button class="key-button space-button" @click="appendValue(' ')">Пробел</button>
        <n-button class="lang-button" @click="toggleLayout"
          >{{ currentLayout.toUpperCase() }}
        </n-button>
      </div>
      <div class="action-row">
        <button class="action-button cancel-button" @click="cancelChanges">Отмена</button>
        <button class="action-button clear-button" @click="clear">Очистить</button>
        <button class="back-button" @click="backspace">
          <n-icon size="30" color="var(--blue-600)">
            <BackspaceSharp />
          </n-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-keyboard-panel {
  width: 750px;
  padding: 5px;

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
        border: 1px solid var(--blue-300);
        background: var(--blue-100);
        border-radius: 6px;
        font-size: 20px;
        width: 60px;
        height: 60px;

        &:active {
          background: var(--blue-200);
          border: 1px solid var(--blue-400);
          animation: press 0.2s 1 linear;
        }
      }

      &:first-child .key-button {
        width: 45px;
      }
    }

    .row:last-child {
      align-items: center;
    }

    .space-button {
      flex: 1;
      text-align: center;
      font-size: 18px;
    }

    .lang-button {
      width: 80px;
      height: 60px;
      font-size: 16px;
    }

    .action-row {
      display: flex;
      gap: 8px;
      justify-content: space-around;
      margin-top: 8px;

      .action-button {
        flex: 1;
        height: 60px;
        font-size: 20px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }

      .back-button {
        width: 80px;
        height: 45px;
        font-size: 20px;
        border-radius: 8px;
        background: var(--blue-200);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:active {
          background: var(--blue-300);
        }
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
