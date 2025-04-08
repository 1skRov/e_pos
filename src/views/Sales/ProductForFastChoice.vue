<script setup>
import { ref } from 'vue'

const quickItems = [
  { id: 1, name: 'Пирожки', price: 2500, image: 'https://via.placeholder.com/150?text=Пирожки' },
  { id: 2, name: 'Самса', price: 3500, image: 'https://via.placeholder.com/150?text=Самса' },
  { id: 3, name: 'Хот-дог', price: 2900, image: 'https://via.placeholder.com/150?text=Хот-дог' },
  { id: 4, name: 'Пицца', price: 4500, image: 'https://via.placeholder.com/150?text=Пицца' }
]

const selected = ref(new Set())
const multiSelect = ref(false)

const toggleItem = (id) => {
  if (!multiSelect.value) {
    selected.value = new Set([id])
    return
  }
  if (selected.value.has(id)) {
    selected.value.delete(id)
  } else {
    selected.value.add(id)
  }
}
</script>

<template>
  <div style="width:100%; display: flex; justify-content: space-between; height: 100%; overflow: hidden">
    <div style="border-right: 1px solid lightgray; width: 50%; height: 100%; overflow-y: auto;">
      <div style="display: flex; gap: 10px; font-size: 18px; align-items: center; margin-bottom: 12px;">
        <span>Выбрать несколько</span>
        <n-switch size="large" v-model:value="multiSelect" />
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
            <img :src="item.image" alt="" style="width: 100%; height: 100%; object-fit: cover" />
          </div>
          <div style="font-size: 16px; padding: 8px">
            <p style="font-weight: 500;">{{ item.name }}</p>
            <p>{{ item.price }} ₸</p>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 50%; height: 100%; overflow-y: auto">
      <!-- справа можно отрисовать детали выбранных -->
      <p v-if="selected.size === 0">Ничего не выбрано</p>
      <ul v-else>
        <li v-for="id in selected" :key="id">
          {{ quickItems.find(i => i.id === id)?.name }} — {{ quickItems.find(i => i.id === id)?.price }} ₸
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
