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
              <keyboard-icon stroke="#2563eb" width="30" height="30" />
            </n-button>
          </template>
          <KeyBoard v-model="searchInputValue" @keyboardInput="handleKeyboardInput" />
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
          <full-page-icon stroke="#2563eb" />
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
            v-model:show="activePopovers[`quantity-${index}`]"
          >
            <template #trigger> {{ item.quantity }} </template>
            <CalcItem
              v-model="salesItems[index].quantity"
              @cancel="() => (activePopovers[`quantity-${index}`] = false)"
              @close="() => (activePopovers[`quantity-${index}`] = false)"
            />
          </n-popover>
        </td>
        <td align="center">
          <n-popover
            placement="bottom"
            trigger="click"
            v-model:show="activePopovers[`discount-${index}`]"
          >
            <template #trigger> {{ item.discount }} </template>
            <CalcItem
              v-model="salesItems[index].discount"
              @cancel="() => (activePopovers[`discount-${index}`] = false)"
              @close="() => (activePopovers[`discount-${index}`] = false)"
            />
          </n-popover>
        </td>

        <td align="center">{{ getProductById(item.productId)?.price }}</td>
        <td align="center">{{ calculateItemTotal(item) }}</td>
        <td align="center">
          <button class="delete-table-item" @click="removeItem(index)">
            <trash-icon stroke="#f62626" width="20" height="20" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FullPageIcon from '@/assets/icons/FullPageIcon.vue'
import KeyboardIcon from '@/assets/icons/keyboard.vue'
import KeyBoard from '@/components/Keyboard.vue'
import TrashIcon from '@/assets/icons/TrashIcon.vue'
import CalcItem from '@/components/InputNumber.vue'
import { NSelect, NPopover, NButton } from 'naive-ui'

const productOptions = ref([])
const salesItems = ref([])
const selectedProductId = ref(null)
const productSelect = ref(null)
const selectedItems = ref([])
const searchInputValue = ref('')
const activePopovers = ref({})

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

const getProductById = (id) => productsData.value.find((p) => p.id === id)

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

const removeItem = (index) => {
  salesItems.value.splice(index, 1)
}

const calculateItemTotal = (item) => {
  const product = getProductById(item.productId)
  return product ? product.price * item.quantity - item.discount : 0
}

const showKeyboardPopover = (show) => {
  // если нужно управлять состоянием клавиатуры
}

const handleKeyboardInput = (value) => {
  searchInputValue.value = value
  if (productSelect.value && productSelect.value.focus) {
    productSelect.value.focus()
  }
}

const handleBarcodeScan = (event) => {
  if (event.key && /^\d+$/.test(event.key) && event.key.length > 5) {
    selectedProductId.value = event.key
    addProductToTable()
  }
}

const deleteSelectedItems = () => {
  console.log('Удалить выбранные элементы')
}
</script>

<style scoped>
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
