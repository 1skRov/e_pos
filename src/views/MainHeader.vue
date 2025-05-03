<script setup>
import {ref} from 'vue'

const activeItem = ref('Главная') // по умолчанию

const setActive = (item) => {
  activeItem.value = item
}
</script>

<template>
  <div class="main">
    <div style="display: flex; align-items: center; height: 100%">
      <div class="check"><h1>Счет №123</h1></div>
      <div class="navigation" :class="{ 'active-navigation': activeItem === 'Главная' }"
           @click="setActive('Главная')">
        <div class="navigation-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M12 10C16.4183 10 20 8.20914 20 6C20 3.79086 16.4183 2 12 2C7.58172 2 4 3.79086 4 6C4 8.20914 7.58172 10 12 10Z"
                fill="currentColor"></path>
              <path opacity="0.5"
                    d="M4 12V18C4 20.2091 7.58172 22 12 22C16.4183 22 20 20.2091 20 18V12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12Z"
                    fill="currentColor"></path>
              <path opacity="0.7"
                    d="M4 6V12C4 14.2091 7.58172 16 12 16C16.4183 16 20 14.2091 20 12V6C20 8.20914 16.4183 10 12 10C7.58172 10 4 8.20914 4 6Z"
                    fill="currentColor"></path>
            </g>
          </svg>
        </div>
        <div class="navigation-title">Главная
        </div>
      </div>
      <div class="navigation" :class="{ 'active-navigation': activeItem === 'Отчет' }"
           @click="setActive('Отчет')">
        <div class="navigation-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path opacity="0.5"
                    d="M2.75 2C2.75 1.58579 2.41421 1.25 2 1.25C1.58579 1.25 1.25 1.58579 1.25 2V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H22C22.4142 22.75 22.75 22.4142 22.75 22C22.75 21.5858 22.4142 21.25 22 21.25H12C9.62178 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12V2Z"
                    fill="currentColor"></path>
              <path
                d="M6.58735 6.53361C6.32976 6.20924 5.85798 6.15511 5.53361 6.4127C5.20924 6.6703 5.15511 7.14208 5.4127 7.46645L8.54622 11.4122C8.77195 11.6965 8.96444 11.9389 9.13539 12.1265C9.3131 12.3216 9.50875 12.5049 9.75521 12.6366C10.3875 12.9746 11.143 12.9911 11.7894 12.6808C12.0414 12.5599 12.2448 12.3853 12.4309 12.1982C12.6098 12.0182 12.8127 11.7843 13.0505 11.5102L13.0667 11.4916C13.3251 11.1937 13.4946 10.9989 13.6334 10.8594C13.7691 10.7228 13.8316 10.6852 13.8599 10.6716C14.0754 10.5682 14.3272 10.5736 14.538 10.6863C14.5657 10.7011 14.6265 10.7415 14.7562 10.8838C14.8887 11.0293 15.0496 11.2312 15.2948 11.54L18.4129 15.4664C18.6705 15.7908 19.1422 15.845 19.4666 15.5874C19.791 15.3298 19.8451 14.858 19.5875 14.5336L16.4542 10.5879C16.2284 10.3036 16.0359 10.0612 15.865 9.8736C15.6873 9.67853 15.4917 9.49525 15.2452 9.36349C14.6129 9.02546 13.8573 9.00903 13.2109 9.31923C12.959 9.44015 12.7555 9.61475 12.5695 9.8019C12.3906 9.98193 12.1877 10.2157 11.9499 10.4899L11.9337 10.5085C11.6752 10.8064 11.5057 11.0012 11.367 11.1407C11.2313 11.2773 11.1688 11.3149 11.1405 11.3285C10.925 11.4319 10.6731 11.4264 10.4624 11.3138C10.4347 11.299 10.3739 11.2586 10.2442 11.1163C10.1117 10.9708 9.9508 10.7689 9.70554 10.4601L6.58735 6.53361Z"
                fill="currentColor"></path>
            </g>
          </svg>
        </div>
        <div class="navigation-title">Отчет</div>
      </div>
    </div>
    <n-popover style="width: 300px" trigger="click">
      <template #trigger>
        <div class="profile">
          <div class="profile-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <circle cx="12" cy="6" r="4" fill="currentColor"></circle>
                <path opacity="0.5"
                      d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                      fill="currentColor"></path>
              </g>
            </svg>
          </div>
          <div class="profile-name"><h3>Sarvar Rozikulov</h3></div>
        </div>
      </template>
      <div class="logout">
        <div class="log-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path opacity="0.6"
                    d="M15 2H14C11.1716 2 9.75736 2 8.87868 2.87868C8 3.75736 8 5.17157 8 8V16C8 18.8284 8 20.2426 8.87868 21.1213C9.75736 22 11.1716 22 14 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2Z"
                    fill="currentColor"></path>
              <path opacity="0.4"
                    d="M8 8C8 6.46249 8 5.34287 8.14114 4.5H8C5.64298 4.5 4.46447 4.5 3.73223 5.23223C3 5.96447 3 7.14298 3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5H8.14114C8 18.6571 8 17.5375 8 16V12.75V11.25V8Z"
                    fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.46967 11.4697C4.17678 11.7626 4.17678 12.2374 4.46967 12.5303L6.46967 14.5303C6.76256 14.8232 7.23744 14.8232 7.53033 14.5303C7.82322 14.2374 7.82322 13.7626 7.53033 13.4697L6.81066 12.75L14 12.75C14.4142 12.75 14.75 12.4142 14.75 12C14.75 11.5858 14.4142 11.25 14 11.25L6.81066 11.25L7.53033 10.5303C7.82322 10.2374 7.82322 9.76256 7.53033 9.46967C7.23744 9.17678 6.76256 9.17678 6.46967 9.46967L4.46967 11.4697Z"
                    fill="currentColor"></path>
            </g>
          </svg>
        </div>
        <div class="log-title"><strong>Выйти из системы</strong></div>
      </div>
    </n-popover>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--blue-100);
}

.check {
  margin-right: 50px;
  color: var(--slate-500);
}

.navigation {
  display: flex;
  align-items: center;
  height: 100%;
  gap: 12px;
  padding: 5px;
  margin-right: 10px;
  border: 1px solid var(--blue-200);
  border-radius: 6px;
  min-width: 150px;
  cursor: pointer;

  .navigation-icon {
    width: 40px;
    height: 100%;
    background: var(--blue-50);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 26px;
      height: 26px;
      color: var(--blue-800);
    }
  }

  .navigation-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--blue-800);
    letter-spacing: 1px;
  }
}

.active-navigation {
  background: var(--blue-500);

  .navigation-icon {
    background: #ffffff;

    svg {
      color: var(--blue-700)
    }
  }

  .navigation-title {
    color: var(--blue-50)
  }
}

.profile {
  display: flex;
  min-width: 200px;
  align-items: center;
  gap: 12px;
  height: 100%;
  cursor: pointer;
  border-radius: 6px;
  background: var(--blue-50);
  padding: 5px;

  .profile-icon {
    width: 40px;
    height: 100%;
    background: var(--blue-100);
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    display: flex;

    svg {
      width: 28px;
      height: 28px;
      color: var(--blue-600);
    }
  }

  .profile-name {
    color: var(--slate-500);
  }
}

.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  background: var(--slate-100);
  border-radius: 6px;

  .log-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 25px;
      height: 25px;
      color: var(--slate-600);
    }
  }

  .log-title {
    color: var(--slate-600);
    font-size: 18px;
  }
}
</style>
