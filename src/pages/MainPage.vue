<script>
import MainHeader from "@/views/MainHeader.vue";
import MainFooter from "@/views/MainFooter.vue";

export default {
  name: 'MainPage',
  components: {MainHeader, MainFooter},
}
</script>

<template>
  <div class="app-container">
    <MainHeader class="header"></MainHeader>
    <div class="main-content">
<!--      <router-view></router-view>-->
    </div>
    <main-footer class="footer"></main-footer>
  </div>
</template>

<style scoped></style>
