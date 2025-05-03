<script>
import MainPageHeader from '@/components/MainPageHeader.vue'
import MainPageFooter from '@/components/MainPageFooter.vue'
import MainHeader from "@/views/MainHeader.vue";

export default {
  name: 'MainPage',
  components: {MainHeader, MainPageFooter, MainPageHeader},
}
</script>

<template>
  <div class="app-container">
    <!--    <main-page-header class="header"></main-page-header>-->
    <MainHeader class="header"></MainHeader>
    <div class="main-content">
<!--      <router-view></router-view>-->
    </div>
<!--    <main-page-footer class="footer"></main-page-footer>-->
  </div>
</template>

<style scoped></style>
