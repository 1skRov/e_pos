<script setup>
import { ref } from 'vue'
import QuickItemsDrawer from '@/views/Sales/ProductForFastChoice.vue'
import AdditionalFunctions from '@/views/Sales/AdditionalFunctions.vue'
import Payment from '@/views/Sales/Payment.vue'

const showQuickItems = ref(false)
const showAdditionalFunctions = ref(false)
const showPayment = ref(false)
</script>

<template>
  <div class="main-footer">
    <div class="footer-left">
      <div class="left-item">
        <p class="sum">Итого</p>
        <p class="sum value">200</p>
      </div>
      <div class="left-item">
        <p>внесено</p>
        <p>200</p>
      </div>
      <div class="left-item">
        <p>сдача</p>
        <p>200</p>
      </div>
    </div>
    <div class="footer-right">
      <div class="additional-buttons">
        <button class="add-btn">Отложка</button>
        <button class="add-btn" @click="showQuickItems = true">Быстрые товары</button>
        <button class="add-btn" @click="showAdditionalFunctions = true">Доп. функции</button>
      </div>
      <div class="pay">
        <button class="pay-btn" @click="showPayment = true">Оплатить</button>
      </div>
    </div>
    <n-drawer v-model:show="showQuickItems" placement="bottom" height="60%">
      <n-drawer-content title="Быстрые товары">
        <QuickItemsDrawer @close="showQuickItems = false"/>
      </n-drawer-content>
    </n-drawer>

    <n-drawer v-model:show="showAdditionalFunctions" placement="bottom" height="60%">
      <n-drawer-content title="Дополнительные функции">
        <AdditionalFunctions></AdditionalFunctions>
      </n-drawer-content>
    </n-drawer>

    <n-drawer v-model:show="showPayment" placement="right" width="75%">
      <n-drawer-content title="Оплата">
        <Payment></Payment>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped lang="scss">
.main-footer {
  display: flex;
  align-items: stretch;
  height: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 15px;
  background: var(--footer-bg);
}

.footer-left {
  padding: 10px;
  border-radius: 4px;
  background: #ffffff;
  min-width: 270px;
}

.left-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #45556c;

  p {
    font-weight: 500;
    font-size: 18px;
  }

  .sum {
    font-size: 28px;
    font-weight: 600;
  }
  .value {
    color: #097f23;
  }
}
.footer-right {
  display: flex;
  gap: 15px;
}
.additional-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pay-btn {
  border: 1px solid #2591a3;
  background: #2591a3;
  width: 160px;
  height: 100%;
  color: #ffffff;
  font-weight: 500;
  border-radius: 4px;
  font-size: 32px;
  padding: 0 10px;
  cursor: pointer;
  &:active {
    background: #03a0b2;
  }
}
</style>
