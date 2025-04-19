<script setup>
import {ref} from 'vue'
import {Trash} from '@vicons/ionicons5'

const quickItems = [
  {id: 1, name: 'Пирожки', price: 2500, image: './src/assets/images/cake.jpg'},
  {id: 2, name: 'Самса', price: 3500, image: './src/assets/images/samsa.jpg'},
  {id: 3, name: 'Хот-дог', price: 2900, image: './src/assets/images/hd.jpg'},
  {id: 4, name: 'Пицца', price: 4500, image: './src/assets/images/pizza1.jpg'},
  {id: 5, name: 'Пицца', price: 4500, image: './src/assets/images/pizza2.jpg'},
]

const selected = ref(new Set())
const multiSelect = ref(false)

const selectedItems = ref([])

const toggleItem = (id) => {
  const item = quickItems.find(q => q.id === id)
  if (!item) return

  if (!multiSelect.value) {
    if (selected.value.has(id)) {
      if (selectedItems.value[0]) {
        selectedItems.value[0].quantity++
      }
    } else {
      selected.value = new Set([id])
      selectedItems.value = [{...item, quantity: 1}]
    }
    return
  }

  if (selected.value.has(id)) {
    const target = selectedItems.value.find(i => i.id === id)
    if (target) target.quantity++
  } else {
    selected.value.add(id)
    selectedItems.value.push({...item, quantity: 1})
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
  selectedItems.value = selectedItems.value.filter(i => i.id !== id)
}
</script>

<template>
  <div
    style="width:100%; display: flex; justify-content: space-between; height: 100%; overflow: hidden">
    <div style="border-right: 1px solid lightgray; width: 50%; height: 100%; overflow-y: auto;">
      <div
        style="display: flex; gap: 10px; font-size: 18px; align-items: center; margin-bottom: 12px;">
        <span>Выбрать несколько</span>
        <n-switch size="large" v-model:value="multiSelect"/>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 8px">
        <div
          v-for="item in quickItems"
          :key="item.id"
          @click="toggleItem(item.id)"
          :style="{
            border: selected.has(item.id) ? '2px solid #0284c7' : '1px solid lightgray',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            width: '150px',
            height: '150px',
            borderRadius: '8px',
            overflow: 'hidden',
            transition: 'border 0.2s ease'
          }"
        >
          <div style="height: 60%; width: 100%">
            <img :src="item.image" alt="" style="width: 100%; height: 100%; object-fit: fill"/>
          </div>
          <div style="font-size: 16px; padding: 8px">
            <p style="font-weight: 500;">{{ item.name }}</p>
            <p>{{ item.price }} ₸</p>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 50%; height: 100%; overflow-y: auto; padding: 0 12px">
      <p v-if="selected.size === 0">Ничего не выбрано</p>
      <div v-else>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <p style="font-size: 16px;">Добавляемые продукты</p>
          <div style="display: flex; gap: 8px">
            <button class="add">Добавить</button>
            <button class="cancel">Отменить</button>
          </div>
        </div>
        <div class="add-products"
             style="display: flex; flex-direction: column; gap: 12px; margin-top: 12px;">
          <div class="product" v-for="item in selectedItems" :key="item.id"
               style="align-items: center; gap: 12px">
            <button class="delete" @click="removeItem(item.id)" style="cursor: pointer;">
              <n-icon size="20">
                <Trash/>
              </n-icon>
            </button>
            <div class="title" style="width: 100px">{{ item.name }}</div>
            <div class="count" style="display: flex; align-items: center; gap: 8px">
              <button @click="decreaseQty(item)" class="plus">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQty(item)" class="minus">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  border: none;
  background: none;
  font-size: 18px;
  border-radius: 8px;
  letter-spacing: 1.5px;
  font-weight: 500;
}

.add {
  background: #0284c7;
  width: 130px;
  height: 50px;
  color: #ffffff;
}

.cancel {
  background: #d23050;
  width: 130px;
  height: 50px;
  color: #ffffff;
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
  }
}

.plus, .minus {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  background: lightgray;
  font-size: 20px;
}

.count span {
  min-width: 100px;
  text-align: center;
}
</style>
