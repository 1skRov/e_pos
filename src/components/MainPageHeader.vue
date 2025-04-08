<script>
import {defineComponent, h, ref} from "vue";
import {NIcon} from "naive-ui";
import {BookOutline as BookIcon, Person} from "@vicons/ionicons5";
import {useRouter} from 'vue-router';

function renderIcon(icon) {
  return () => h(NIcon, null, {default: () => h(icon)});
}


const menuOptions = [
  {
    label: "Продажа",
    key: "sales",
    icon: renderIcon(BookIcon)
  },
  {
    label: "Смена",
    key: "shift",
    icon: renderIcon(BookIcon),
  },
  {
    label: "Отчет",
    key: "report",
    icon: renderIcon(BookIcon)
  },
  {
    label: "Возврат",
    key: "undo",
    icon: renderIcon(BookIcon),
  }
];

const count = 542;

export default defineComponent({
  components: {
    Person,
  },
  setup() {
    const router = useRouter();
    const activeKey = ref("sales");

    const handleMenuSelect = (key) => {
      router.push({ name: key });
    };
    return {
      activeKey,
      menuOptions,
      count,
      handleMenuSelect,
    };
  }
});
</script>

<template>
  <div class="main-header">
    <div class="menu-list">
      <div class="count">Счет № {{ count }}</div>
      <div class="menu-items">
        <n-menu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          responsive
          @update:value="handleMenuSelect"
          style="font-weight: 500;"
        />
      </div>
    </div>
    <div class="info-user">
      <n-icon size="20" color="#0284c7">
        <Person />
      </n-icon>
      <div style="color: gray">Sarvar Rozikulov</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-header {
  width: 100%;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  font-size: 20px;
  font-weight: 500;
  border-bottom: 1px solid #bae6fd;

  .menu-list {
    display: flex;
    align-items: center;
    width: 100%;

    .count {
      padding: 4px 8px;
      border-right: 1px solid #e3e2e2;
      min-width: 200px;
    }

    .menu-items {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
  .info-user {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    min-width: 150px;
  }
}
</style>
