<script setup>
import MainFooterButtonsContent from "@/views/MainFooterButtonsContent.vue";
</script>

<template>
  <div class="main-footer">
    <div class="left-content">
      <div class="left-item">
        <span>Внесено</span>
        <span>123</span>
      </div>
      <div class="left-item">
        <span>Сдача</span>
        <span>123</span>
      </div>
      <div class="left-item">
        <span>Общий чек</span>
        <span>хз пока что</span>
      </div>
      <div class="left-item">
        <h1>Итого</h1>
        <h1>123000</h1>
      </div>
    </div>
    <div class="right-content">
      <MainFooterButtonsContent></MainFooterButtonsContent>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-footer {
  background: var(--ice-blue);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
}

.left-content {
  padding: 10px;
  min-width: 400px;
  height: 100%;
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;

  .left-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;

    span {
      font-size: 16px;
    }
  }
}

.right-content {
  height: 100%;
}
</style>
