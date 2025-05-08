<template>
  <div class="sales-table">
    <div class="sales-head">
      <div class="select">
        <n-select filterable placeholder="Выберите товар..." style="width: 280px" size="large" />
        <n-popover placement="bottom" trigger="click" @update:show="showPopover">
          <template #trigger>
            <n-button strong secondary type="primary" size="large">
              <keyboard-icon stroke="#2563eb" width="30" height="30"></keyboard-icon>
            </n-button>
          </template>
          <KeyBoard></KeyBoard>
        </n-popover>
      </div>
      <div class="header-btns">
        <n-button strong secondary type="error" size="large">Удалить выбранные</n-button>
        <n-button strong secondary type="primary" size="large">
          <full-page-icon stroke="#2563eb"></full-page-icon>
        </n-button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th style="text-align: center">Количество</th>
          <th style="text-align: center">Скидка</th>
          <th style="text-align: center">Цена</th>
          <th style="text-align: center">Итого</th>
          <th style="text-align: center">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Пирожки</td>
          <td align="center">
            <n-popover placement="bottom" trigger="click" @update:show="showPopover">
              <template #trigger> 25</template>
              <number-board></number-board>
            </n-popover>
          </td>
          <td align="center">
            <n-popover placement="bottom" trigger="click" @update:show="showPopover">
              <template #trigger> 2500</template>
              <number-board></number-board>
            </n-popover>
          </td>
          <td align="center">500</td>
          <td align="center">
            <n-popover placement="bottom" trigger="click" @update:show="showPopover">
              <template #trigger> 2500</template>
              <number-board></number-board>
            </n-popover>
          </td>
          <td align="center">
            <button class="delete-table-item">
              <trash-icon stroke="#f62626" width="20" height="20"></trash-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FullPageIcon from '@/assets/icons/FullPageIcon.vue'
import KeyboardIcon from '@/assets/icons/keyboard.vue'
import NumberBoard from '@/components/InputNumber.vue'
import KeyBoard from '@/components/Keyboard.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'

export default defineComponent({
  components: { TrashIcon, KeyboardIcon, FullPageIcon, NumberBoard, KeyBoard },
  data() {
    return {
      show_board: false,
    }
  },
  methods: {
    showPopover() {
      this.show_board = !this.show_board
    },
  },
})
</script>

<style scoped>
.sales-table {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .sales-head {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .table-wrapper {
    border-radius: 6px;
    border: 1px solid var(--blue-300);
  }

  .select {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .header-btns {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-weight: 500;
  font-size: 18px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--blue-300);
}

thead {
  background-color: var(--blue-50);
  overflow: hidden;
}

thead th {
  color: var(--blue-700);
  padding: 12px;
  text-align: left;
}

tbody td {
  padding: 10px;
  color: var(--slate-600);
  border-top: 1px solid var(--blue-300);
}

tbody td + tbody td {
  border-top: 1px solid var(--slate-300);
}

tr:active {
  background-color: #eef5fb;
}

.delete-table-item {
  border: 1px solid #f89595;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-radius: 6px;
  background: #f5c6c6;
}
</style>
