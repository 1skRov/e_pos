<script setup>
import {useRouter, useRoute} from 'vue-router'

import MainIcon from '@/assets/icons/MainIcon.vue'
import ReportIcon from '@/assets/icons/ReportIcon.vue'
import UserIcon from '@/assets/icons/UserIcon.vue'
import LogoutIcon from '@/assets/icons/LogoutIcon.vue'
import MoonIcon from '@/assets/icons/MoonIcon.vue'

const router = useRouter()
const route = useRoute()
const menuItems = [
  {label: 'Главная', icon: MainIcon, path: '/sales'},
  {label: 'Отчет', icon: ReportIcon, path: '/report'},
]

function navigate(path) {
  router.push(path)
}
</script>

<template>
  <div class="main-header">
    <div class="header-left">
      <div class="header_score">
        <strong>Счет №1</strong>
      </div>
      <div class="header_menu">
        <div
          v-for="item in menuItems"
          :key="item.path"
          :class="['menu-item', { active: route.path.startsWith(item.path) }]"
          @click="navigate(item.path)"
        >
          <component :is="item.icon" width="25" height="25"/>
          <strong>{{ item.label }}</strong>
        </div>
      </div>
    </div>
    <n-popover trigger="click">
      <template #trigger>
        <div class="header-right">
          <div class="user-icon">
            <user-icon width="25" height="25"></user-icon>
          </div>
          <span>Sarvar Rozikulov</span>
        </div>
      </template>
      <div class="popover-content">
        <div class="popover-item">
          <logout-icon width="20" height="20"></logout-icon>
          <span>Выйти из системы</span>
        </div>
        <div class="popover-item">
          <moon-icon width="20" height="20"></moon-icon>
          <span>Поменять тему</span>
        </div>
      </div>
    </n-popover>
  </div>
</template>

<style scoped lang="scss">
.main-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: #f4f6fd;
  color: #45556c;
  padding: 0 15px;
}

.header-left {
  display: flex;
  gap: 10px;
}

.header_score {
  font-size: 24px;
  width: 180px;
  display: flex;
  align-items: center;
}

.header_menu {
  font-size: 18px;
  display: flex;
  gap: 15px;

  .menu-item {
    padding: 13px 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s,
    color 0.3s;
  }

  .menu-item.active {
    background: #084661;
    color: #ffffff;
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  .user-icon {
    width: 35px;
    height: 35px;
    border-radius: 4px;
    background: #084661;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  span {
    font-size: 18px;
    font-weight: 500;
  }
}

.popover-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;

  .popover-item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    span {
      font-weight: 500;
      font-size: 16px;
      color: #45556c;
    }
  }
}
</style>
