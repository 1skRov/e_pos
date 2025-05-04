<script>
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    }
  }
}

</script>

<template>
<div class="buttons-content">
  <div class="additional-buttons" v-if="!isCollapsed">
    <button>Отложка</button>
    <button>Доп.Функции</button>
    <button>Быстрые товары</button>
  </div>
  <div class="payment-button" :class="{ isCollapsedPayment: isCollapsed }">
    <button>Оплата</button>
  </div>
</div>
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
  button {
    background: var(--blue-500);
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
