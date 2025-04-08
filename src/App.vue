<script>
import { themeOverrides  } from '@/assets/plugins/theme.js'

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
    <router-view />
  </n-config-provider>
</template>

<style scoped>
</style>
