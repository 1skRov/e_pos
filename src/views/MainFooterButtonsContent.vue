<script>
import QuickItemsDrawer from '@/views/Sales/ProductForFastChoice.vue'
import Payment from '@/views/Sales/PaymentDrawer.vue'
import AdditionalFunctions from '@/views/Sales/AdditionalFunctions.vue'

export default {
  components: { AdditionalFunctions, Payment, QuickItemsDrawer },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showQuickItems: false,
      showAdditionalFunctions: false,
      showPayment: false,
    }
  },
  methods: {
    quickItems() {
      this.showQuickItems = true
    },
    additionalFunctions() {
      this.showAdditionalFunctions = true
    },
    payment() {
      this.showPayment = true
    },
  },
>>>>>>> 95ab7cebd445f88602117c9db897880cceb04d29
}
</script>

<template>
  <div class="buttons-content">
    <div class="additional-buttons" v-if="!isCollapsed">
      <button>Отложка</button>
      <button @click="additionalFunctions">Доп.Функции</button>
      <button @click="quickItems">Быстрые товары</button>
    </div>
    <div class="payment-button" :class="{ isCollapsedPayment: isCollapsed }">
      <button @click="payment">Оплата</button>
    </div>
    <n-drawer v-model:show="showQuickItems" placement="bottom" height="60%">
      <n-drawer-content title="Быстрые товары">
        <QuickItemsDrawer @close="showQuickItems = false" />
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
  >>>>>>> 95ab7cebd445f88602117c9db897880cceb04d29
</template>

<style scoped lang="scss">
.buttons-content {
  display: flex;
  gap: 10px;
  height: 100%;
  width: 100%;
}

.additional-buttons {
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  height: 100%;
  justify-content: space-between;

  button {    background: var(--blue-500);
    color: var(--blue-50);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 1px;
    width: 200px;
    height: 75px;
    border-radius: 6px;
    border: none;
    //box-shadow: 10px 5px 5px darkblue;
    &:active {
      background: var(--blue-400);
    }
  }
}

.payment-button {
  height: 100%;

  button {
    background: #5ee9b5;
    color: #004f3b;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 1px;
    width: 200px;
    height: 100%;
    border-radius: 6px;
    border: 1px solid #00d492;
    //box-shadow: 10px 5px 5px darkblue;
    &:active {
      background: var(--blue-400);
    }

    &.isCollapsedPayment {
      height: 75px;
    }
  }
}
</style>
