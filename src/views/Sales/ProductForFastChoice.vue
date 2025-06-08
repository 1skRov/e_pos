<script setup>
import { ref } from 'vue'
import { Trash } from '@vicons/ionicons5'
import PlusIcon from '@/assets/icons/PlusIcon.vue'
import MinusIcon from '@/assets/icons/MinusIcon.vue'

const emit = defineEmits(['close'])

const quickItems = [
  { id: 1, name: 'Пирожки', price: 2500, image: './src/assets/images/cake.jpg' },
  { id: 2, name: 'Самса', price: 3500, image: './src/assets/images/samsa.jpg' },
  { id: 3, name: 'Хот-дог', price: 2900, image: './src/assets/images/hd.jpg' },
  { id: 4, name: 'Пицца', price: 4500, image: './src/assets/images/pizza1.jpg' },
  { id: 5, name: 'Пицца', price: 4500, image: './src/assets/images/pizza2.jpg' },
]

const selected = ref(new Set())
const multiSelect = ref(false)

const selectedItems = ref([])

const toggleItem = (id) => {
  const item = quickItems.find((q) => q.id === id)
  if (!item) return

  if (!multiSelect.value) {
    if (selected.value.has(id)) {
      if (selectedItems.value[0]) {
        selectedItems.value[0].quantity++
      }
    } else {
      selected.value = new Set([id])
      selectedItems.value = [{ ...item, quantity: 1 }]
    }
    return
  }

  if (selected.value.has(id)) {
    const target = selectedItems.value.find((i) => i.id === id)
    if (target) target.quantity++
  } else {
    selected.value.add(id)
    selectedItems.value.push({ ...item, quantity: 1 })
  }
}

const increaseQty = (item) => {
  item.quantity++
}
const decreaseQty = (item) => {
  if (item.quantity > 1) item.quantity--
}
const removeItem = (id) => {
  selected.value.delete(id)
  selectedItems.value = selectedItems.value.filter((i) => i.id !== id)
}

function handleAdd() {
  emit('close')
}

function handleCancel() {
  emit('close')
}
</script>

<template>
  <div class="fast-choice">
    <div class="left">
      <div class="multiple-flag">
        <span>Выбрать несколько</span>
        <n-switch size="large" v-model:value="multiSelect" />
      </div>

      <div class="product-list">
        <div
          v-for="item in quickItems"
          :key="item.id"
          @click="toggleItem(item.id)"
          class="product-item"
          :style="{
            border: selected.has(item.id) ? '2px solid #3b82f6' : '2px solid lightgray',
            backgroundColor: selected.has(item.id) ? 'var(--blue-100)' : '#ffffff',
          }"
        >
          <div class="image">
            <img :src="item.image" alt="some img" />
          </div>
          <div class="text">
            <p class="name" :class="{ selected: selected.has(item.id) }">{{ item.name }}</p>
            <p class="price" :class="{ selected: selected.has(item.id) }">{{ item.price }} ₸</p>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <p v-if="selected.size === 0">Ничего не выбрано</p>
      <div v-else>
        <div class="header-content">
          <p>Добавляемые продукты</p>
          <div style="display: flex; gap: 8px">
            <n-button
              type="primary"
              size="large"
              style="font-weight: bold; font-size: 20px"
              @click="handleAdd"
            >
              Добавить
            </n-button>
            <n-button
              type="error"
              size="large"
              style="font-weight: bold; font-size: 20px"
              @click="handleCancel"
            >
              Отменить
            </n-button>
          </div>
        </div>
        <div
          class="add-products"
          style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px"
        >
          <div
            class="product"
            v-for="item in selectedItems"
            :key="item.id"
            style="align-items: center; gap: 12px"
          >
            <n-button
              type="error"
              @click="removeItem(item.id)"
              size="large"
              strong
              secondary
              circle
            >
              <n-icon size="20">
                <Trash />
              </n-icon>
            </n-button>
            <div class="title" style="width: 100px; font-weight: 500">{{ item.name }}</div>
            <div class="count" style="display: flex; align-items: center; gap: 8px">
              <button @click="decreaseQty(item)" class="plus-rounded">
                <minus-icon width="20px" height="20px" stroke="#ffffff"></minus-icon>
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQty(item)" class="minus-rounded">
                <plus-icon width="20px" height="20px" stroke="#ffffff"></plus-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fast-choice {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;

  .left {
    border-right: 1px solid lightgray;
    width: 50%;
    height: 100%;
    overflow-y: auto;

    .multiple-flag {
      display: flex;
      gap: 10px;
      font-size: 18px;
      align-items: center;
      margin-bottom: 12px;
    }

    .product-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .product-item {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 200px;
        height: 200px;
        border-radius: 6px;
        overflow: hidden;
        transition: border 0.2s ease;

        .image {
          height: 120px;
          width: 100%;
          padding: 5px;

          img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            border-radius: 6px;
          }
        }

        .text {
          font-size: 16px;
          padding: 5px 6px;

          .name {
            font-weight: 500;
            color: var(--slate-600);

            &.selected {
              color: var(--blue-600);
            }
          }

          .price {
            font-weight: 600;
            color: var(--slate-600);

            &.selected {
              color: var(--blue-600);
            }
          }
        }
      }
    }
  }

  .right {
    width: 50%;
    height: 100%;
    overflow-y: auto;
    padding: 0 12px;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 18px;
        color: var(--slate-600);
        font-weight: 600;
      }
    }
  }
}

.addCancel {
  width: 130px;
  height: 50px;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add {
  background: #084661;

  &:active {
    background: #105d7e;
  }
}

.cancel {
  background: #d23050;

  &:active {
    background: #fc5173;
  }
}

.product {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 20px;
  justify-content: space-between;

  .delete {
    color: red;
    background: #ffe7e7;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
}

.count span {
  min-width: 100px;
  text-align: center;
  font-weight: 600;
}
</style>
