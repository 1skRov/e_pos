<script>
import MainPageHeader from '@/components/MainPageHeader.vue'
import MainPageFooter from '@/components/MainPageFooter.vue'

export default {
  name: 'MainPage',
  components: { MainPageFooter, MainPageHeader },
}
</script>

<template>
  <div class="app-container">
    <main-page-header class="header"></main-page-header>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <main-page-footer class="footer"></main-page-footer>
  </div>
</template>

<style scoped></style>
