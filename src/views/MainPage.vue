<script>
import MainPageHeader from "@/components/MainPageHeader.vue";
import MainPageFooter from "@/components/MainPageFooter.vue";

export default {
  name: "MainPage",
  components: {MainPageFooter, MainPageHeader}
}
</script>

<template>
  <div class="main-sales-container">
    <main-page-header class="header"></main-page-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <main-page-footer class="footer"></main-page-footer>
  </div>
</template>

<style scoped>
.main-sales-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.content {
  margin-top: 65px;
  margin-bottom: 275px;
  overflow-y: auto;
  flex: 1;
}
</style>
