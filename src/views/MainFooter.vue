<script setup>
import MainFooterButtonsContent from "@/views/MainFooterButtonsContent.vue";
import {ref} from "vue";

const isCollapsed = ref(false)
const toggleFooter = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="main-footer" :class="{ collapsed: isCollapsed }">
    <div class="wrap" @click="toggleFooter">
      <svg v-if="isCollapsed" class="up" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path opacity="0.5"
                d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                fill="currentColor"></path>
          <path
            d="M8 7.75C7.58579 7.75 7.25 7.41421 7.25 7C7.25 6.58579 7.58579 6.25 8 6.25H16C16.4142 6.25 16.75 6.58579 16.75 7C16.75 7.41421 16.4142 7.75 16 7.75H8Z"
            fill="currentColor"></path>
          <path
            d="M12.75 17C12.75 17.4142 12.4142 17.75 12 17.75C11.5858 17.75 11.25 17.4142 11.25 17L11.25 11.8107L9.53033 13.5303C9.23744 13.8232 8.76256 13.8232 8.46967 13.5303C8.17678 13.2374 8.17678 12.7626 8.46967 12.4697L11.4697 9.46967C11.6103 9.32902 11.8011 9.25 12 9.25C12.1989 9.25 12.3897 9.32902 12.5303 9.46967L15.5303 12.4697C15.8232 12.7626 15.8232 13.2374 15.5303 13.5303C15.2374 13.8232 14.7626 13.8232 14.4697 13.5303L12.75 11.8107V17Z"
            fill="currentColor"></path>
        </g>
      </svg>
      <svg viewBox="0 0 24 24" v-else class="down" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path opacity="0.5"
                d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                fill="currentColor"></path>
          <path
            d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7L11.25 12.1893L9.53033 10.4697C9.23744 10.1768 8.76256 10.1768 8.46967 10.4697C8.17678 10.7626 8.17678 11.2374 8.46967 11.5303L11.4697 14.5303C11.6103 14.671 11.8011 14.75 12 14.75C12.1989 14.75 12.3897 14.671 12.5303 14.5303L15.5303 11.5303C15.8232 11.2374 15.8232 10.7626 15.5303 10.4697C15.2374 10.1768 14.7626 10.1768 14.4697 10.4697L12.75 12.1893V7Z"
            fill="currentColor"></path>
          <path
            d="M8 16.25C7.58579 16.25 7.25 16.5858 7.25 17C7.25 17.4142 7.58579 17.75 8 17.75H16C16.4142 17.75 16.75 17.4142 16.75 17C16.75 16.5858 16.4142 16.25 16 16.25H8Z"
            fill="currentColor"></path>
        </g>
      </svg>
    </div>
    <div
      class="footer-content">
      <div class="left-content">
        <div class="left-item" v-if="!isCollapsed">
          <span>Внесено</span>
          <span>123</span>
        </div>
        <div class="left-item" v-if="!isCollapsed">
          <span>Сдача</span>
          <span>123</span>
        </div>
        <div class="left-item" v-if="!isCollapsed">
          <span>Общий чек</span>
          <span>хз пока что</span>
        </div>
        <div class="left-item" :class="{ isCollapsedLeft: isCollapsed }">
          <h1>Итого</h1>
          <h1>123000</h1>
        </div>
      </div>
      <div class="right-content" :class="{ isCollapsedRight: isCollapsed }">
        <MainFooterButtonsContent :isCollapsed="isCollapsed"></MainFooterButtonsContent>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-footer {
  background: var(--ice-blue);
  display: flex;
  padding: 10px 15px;
}

.footer-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-between;
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

    &.isCollapsedLeft {
      margin: 0;
    }
  }
}

.right-content {
  height: 100%;

  .isCollapsedRight {
    width: 100%;
  }
}

.wrap {
  width: 65px;

  svg {
    width: 60px;
    height: 60px;
    color: var(--blue-700);
  }
}
</style>
