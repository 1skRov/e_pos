<script>
import {themeOverrides} from '@/assets/plugins/theme.js'

export default {
  setup() {
    return {
      themeOverrides: themeOverrides
    }
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <router-view/>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
