<template>
  <div class="sales-table">
    <div class="sales-head">
      <div class="select">
        <n-select
          filterable
          placeholder="Выберите товар..."
          style="width: 280px"
          size="large"
          :options="productOptions"
          v-model:value="selectedProductId"
          @update:value="addProductToTable"
          ref="productSelect"
        />
        <n-popover placement="bottom" trigger="click" @update:show="showKeyboardPopover">
          <template #trigger>
            <n-button strong secondary type="primary" size="large">
              <keyboard-icon stroke="#2563eb" width="30" height="30"></keyboard-icon>
            </n-button>
          </template>
          <KeyBoard v-model="searchInputValue" @keyboardInput="handleKeyboardInput"></KeyBoard>
        </n-popover>
      </div>
      <div class="header-btns">
        <n-button
          strong
          secondary
          type="error"
          size="large"
          :disabled="selectedItems.length === 0"
          @click="deleteSelectedItems"
        >
          Удалить выбранные
        </n-button>
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
        <tr v-for="(item, index) in salesItems" :key="index">
          <td>{{ getProductById(item.productId)?.name || 'Товар не найден' }}</td>
          <td align="center">
            <n-popover
              placement="bottom"
              trigger="click"
              @update:show="showNumberBoardPopover(index, 'quantity')"
            >
              <template #trigger> {{ item.quantity }}</template>
              <number-board @input="updateItem(index, 'quantity', $event)"></number-board>
            </n-popover>
          </td>
          <td align="center">
            <n-popover
              placement="bottom"
              trigger="click"
              @update:show="showNumberBoardPopover(index, 'discount')"
            >
              <template #trigger> {{ item.discount }}</template>
              <number-board @input="updateItem(index, 'discount', $event)"></number-board>
            </n-popover>
          </td>
          <td align="center">{{ getProductById(item.productId)?.price }}</td>
          <td align="center">{{ calculateItemTotal(item) }}</td>
          <td align="center">
            <button class="delete-table-item" @click="removeItem(index)">
              <trash-icon stroke="#f62626" width="20" height="20"></trash-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import FullPageIcon from '@/assets/icons/FullPageIcon.vue'
import KeyboardIcon from '@/assets/icons/keyboard.vue'
import NumberBoard from '@/components/InputNumber.vue'
import KeyBoard from '@/components/Keyboard.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import { NSelect, NPopover, NButton } from 'naive-ui'

const productOptions = ref([])
const salesItems = ref([])
const selectedProductId = ref(null)
const showPopover = ref(false)
const activePopoverIndex = ref(null)
const activePopoverField = ref(null)
const productSelect = ref(null)
const selectedItems = ref([])
const searchInputValue = ref('')

const productsData = ref([
  { id: '12345', name: 'Пирожки', price: 500 },
  { id: '67890', name: 'Чай', price: 200 },
  { id: '13579', name: 'Кофе', price: 350 },
  { id: '24680', name: 'Булочка', price: 400 },
])

onMounted(() => {
  productOptions.value = productsData.value.map((product) => ({
    label: product.name,
    value: product.id,
  }))

  window.addEventListener('keydown', handleBarcodeScan)
})

const getProductById = (id) => {
  return productsData.value.find((product) => product.id === id)
}

const addProductToTable = () => {
  if (selectedProductId.value) {
    const existingItemIndex = salesItems.value.findIndex(
      (item) => item.productId === selectedProductId.value,
    )
    if (existingItemIndex !== -1) {
      salesItems.value[existingItemIndex].quantity++
    } else {
      salesItems.value.push({
        productId: selectedProductId.value,
        quantity: 1,
        discount: 0,
      })
    }
    selectedProductId.value = null
  }
}

const updateItem = (index, field, value) => {
  salesItems.value[index][field] = Number(value)
}

const removeItem = (index) => {
  salesItems.value.splice(index, 1)
}

const calculateItemTotal = (item) => {
  const product = getProductById(item.productId)
  if (product) {
    return product.price * item.quantity - item.discount
  }
  return 0
}

const showNumberBoardPopover = (index, field) => {
  activePopoverIndex.value = index
  activePopoverField.value = field
  showPopover.value = true
}

const showKeyboardPopover = (show) => {
  showPopover.value = show
}

const handleKeyboardInput = (value) => {
  console.log('Ввод с клавиатуры:', value)
  searchInputValue.value = value

  if (productSelect.value && productSelect.value.focus) {
    productSelect.value.focus()
  }
}

const handleBarcodeScan = (event) => {
  if (!showPopover.value && event.key && /^\d+$/.test(event.key) && event.key.length > 5) {
    const scannedProductId = event.key
    selectedProductId.value = scannedProductId
    addProductToTable()
  }
}

const deleteSelectedItems = () => {
  console.log('Удалить выбранные элементы')
}
</script>

<style scoped>
/* Стили остаются прежними */
.sales-table {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sales-head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  cursor: pointer;
}
</style>
