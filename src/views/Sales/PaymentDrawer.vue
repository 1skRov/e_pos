<script setup>
import { ref, watch, computed } from 'vue'
import { NInput, NTabs, NTabPane } from 'naive-ui'

const paymentTypes = [
  { key: 'cash', label: 'Наличными' },
  { key: 'kaspi', label: 'Kaspi' },
  { key: 'card', label: 'Карта' },
  { key: 'debt', label: 'Долг' },
  { key: 'bonus', label: 'Бонус' },
]

const activeTab = ref('cash')
const inputValue = ref('0')
const paymentAmounts = ref({ cash: 0, kaspi: 0, card: 55, debt: 2233, bonus: 0 })

watch(activeTab, (newTab) => {
  inputValue.value = String(paymentAmounts.value[newTab] || 0)
})

function appendDigit(digit) {
  if (digit === 'CE') {
    inputValue.value = '0'
  } else if (digit === '.') {
    if (!inputValue.value.includes('.')) inputValue.value += '.'
  } else {
    inputValue.value = inputValue.value === '0' ? digit : inputValue.value + digit
  }
  paymentAmounts.value[activeTab.value] = parseFloat(inputValue.value) || 0
}

const totalPaid = computed(() =>
  paymentTypes.reduce((sum, t) => sum + (paymentAmounts.value[t.key] || 0), 0),
)
</script>

<template>
  <div class="payment-panel">
    <div class="main-content" style="display: flex; gap: 20px">
      <div class="left-panel" style="display: flex; flex-direction: column; gap: 20px">
        <n-input
          v-model:value="inputValue"
          readonly
          size="large"
          style="font-size: 40px; width: 100%"
        />
        <div class="numbers-panel">
          <div class="line">
            <button class="number-button" @click="appendDigit('7')">7</button>
            <button class="number-button" @click="appendDigit('8')">8</button>
            <button class="number-button" @click="appendDigit('9')">9</button>
          </div>
          <div class="line">
            <button class="number-button" @click="appendDigit('4')">4</button>
            <button class="number-button" @click="appendDigit('5')">5</button>
            <button class="number-button" @click="appendDigit('6')">6</button>
          </div>
          <div class="line">
            <button class="number-button" @click="appendDigit('1')">1</button>
            <button class="number-button" @click="appendDigit('2')">2</button>
            <button class="number-button" @click="appendDigit('3')">3</button>
          </div>
          <div class="line">
            <button class="number-button" @click="appendDigit('.')">.</button>
            <button class="number-button" @click="appendDigit('0')">0</button>
            <button class="number-button" @click="appendDigit('CE')">CE</button>
          </div>
        </div>
      </div>
      <div class="type-and-summary">
        <n-tabs
          v-model:value="activeTab"
          type="card"
          placement="left"
          size="large"
          style="width: auto"
        >
          <n-tab-pane v-for="t in paymentTypes" :key="t.key" :name="t.key" :tab="t.label" />
        </n-tabs>
        <div class="summary-panel">
          <div v-for="t in paymentTypes" :key="t.key" class="summary">
            <span class="type">{{ t.label }}</span>
            <span class="value">{{ paymentAmounts[t.key].toFixed(2) }}</span>
          </div>
          <div class="change">
            <span>Сдача</span>
            <span>{{ (250000 - totalPaid).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 8px">
      <button class="action-refund action-button">Оформить возврат</button>
      <button class="action-cancel action-button">Отмена</button>
      <button class="action-pay action-button">Оплатить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-panel {
  .main-content {
    display: flex;
    gap: 20px;
    background: var(--blue-50);
  }

  .left-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 450px;
    min-width: 260px;
    width: 50%;
  }

  .numbers-panel {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .line {
      display: flex;
      width: 100%;
      gap: 20px;

      .number-button {
        min-width: 70px;
        max-width: 150px;
        width: 100%;
        border: 1px solid var(--blue-400);
        background: var(--blue-200);
        border-radius: 6px;
        font-size: 24px;
        height: 70px;

        &:active {
          background: var(--blue-100);
          border: 1px solid var(--blue-300);
          color: var(--blue-600);
          animation: press 0.2s 1 linear;
        }
      }
    }
  }

  .type-and-summary {
    display: flex;
    gap: 20px;
    width: 100%;
    min-width: 320px;
    max-width: 650px;
  }

  .summary-panel {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px;

    .summary {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: var(--slate-700);

      .value {
        font-weight: 500;
      }
    }

    .change {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 12px;
      font-weight: 600;
      font-size: 22px;
    }
  }

  .action-button {
    flex: 1;
    padding: 18px 24px;
    font-size: 20px;
    border: none;
    border-radius: 8px;
    background: #0284c7;
    color: #fff;
    cursor: pointer;

    &:active {
      background: #0ea5e9;
    }
  }

  .action-refund {
    background: #c70237;
    color: #fff;

    &:active {
      background: #fa3c5f;
    }
  }
}
</style>
