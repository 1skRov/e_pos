<script>
import {defineComponent, ref, h, computed} from 'vue'
import {NButton, NTag, NIcon, NInputNumber, NPopover, NInput, NDataTable} from 'naive-ui'
import {AddOutline, RemoveOutline, TrashOutline} from '@vicons/ionicons5'
import CalcItem from '@/components/InputNumber.vue'

export default defineComponent({
  components: {CalcItem},
  setup() {
    const data = ref(
      Array.from({length: 20}).map((_, index) => ({
        key: index,
        name: `Товар №${index + 1}`,
        count: Math.floor(Math.random() * 10) + 1,
        discount: Number((Math.random() * 10).toFixed(2)),
        price: (index + 1) * 100,
        customTotal: null,
      }))
    )

    const selectedRowKeys = ref([])
    const isDeleted = computed(() => selectedRowKeys.value.length > 0)

    const deleteSelected = () => {
      data.value = data.value.filter((row) => !selectedRowKeys.value.includes(row.key))
      selectedRowKeys.value = []
    }

    const updateCount = (row, delta) => {
      const target = data.value.find((r) => r.key === row.key)
      if (target) {
        target.count = Math.max(0, target.count + delta)
        target.customTotal = null
      }
    }

    const deleteRow = (row) => {
      data.value = data.value.filter((item) => item.key !== row.key)
    }

    const columns = [
      {
        type: 'selection',
      },
      {
        title: 'Наименование',
        key: 'name',
      },
      {
        title: 'Количество',
        key: 'count',
        render(row) {
          return h('div', {style: {display: 'flex', alignItems: 'center', gap: '6px'}}, [
            h(
              NButton,
              {
                size: 'large',
                tertiary: true,
                circle: true,
                onClick: () => updateCount(row, -1),
              },
              {
                icon: () => h(NIcon, {component: RemoveOutline}),
              },
            ),
            h(
              NPopover,
              {trigger: 'click', placement: 'right-start', style: 'padding: 0'},
              {
                trigger: () =>
                  h(NInputNumber, {
                    value: row.count,
                    'onUpdate:value': (val) => {
                      row.count = val
                      row.customTotal = null
                    },
                    min: 0,
                    size: 'medium',
                    showButton: false,
                    style: 'width: 60px',
                  }),
                default: () =>
                  h(CalcItem, {
                    modelValue: row.count,
                    'onUpdate:modelValue': (val) => {
                      row.count = val
                      row.customTotal = null
                    },
                  }),
              }
            ),
            h(
              NButton,
              {
                size: 'large',
                tertiary: true,
                circle: true,
                onClick: () => updateCount(row, 1),
              },
              {
                icon: () => h(NIcon, {component: AddOutline}),
              }
            ),
          ])
        },
      },
      {
        title: 'Скидка',
        key: 'discount',
        render(row) {
          return h(
            NPopover,
            {trigger: 'click', placement: 'right-start'},
            {
              trigger: () =>
                h(
                  NTag,
                  {type: 'warning', bordered: false, round: true},
                  {default: () => `${row.discount}%`}
                ),
              default: () =>
                h(CalcItem, {
                  modelValue: row.discount,
                  'onUpdate:modelValue': (val) => {
                    row.discount = val
                    row.customTotal = null
                  },
                }),
            }
          )
        },
      },
      {
        title: 'Цена',
        key: 'price',
        render(row) {
          return `${row.price} ₸`
        },
      },
      {
        title: 'Итого',
        key: 'total',
        render(row) {
          const calculatedTotal = row.price * row.count * (1 - row.discount / 100)
          const total = row.customTotal !== null ? row.customTotal : calculatedTotal

          return h(
            NPopover,
            {trigger: 'click', placement: 'right-start', style: 'padding: 0'},
            {
              trigger: () => h('span', null, `${total.toFixed(2)} ₸`),
              default: () =>
                h(CalcItem, {
                  modelValue: total,
                  'onUpdate:modelValue': (val) => {
                    row.customTotal = val
                  },
                }),
            }
          )
        },
      },
      {
        title: '',
        key: 'actions',
        align: 'center',
        render(row) {
          return h(
            NButton,
            {
              size: 'large',
              secondary: true,
              type: 'error',
              strong: true,
              circle: true,
              onClick: () => deleteRow(row),
            },
            {
              icon: () => h(NIcon, {component: TrashOutline}),
            }
          )
        },
      },
    ]

    const tableHeight = computed(() => `${window.innerHeight - 190 - 275}px`)

    return {
      data,
      columns,
      selectedRowKeys,
      isDeleted,
      deleteSelected,
      tableHeight,
    }
  },
})
</script>

<template>
  <div class="sales-table">
    <div style="display: flex; width: 100%; justify-content: space-between">
      <n-input type="text" placeholder="Введите поиск..." :style="{ width: '33%' }"/>
      <n-button strong secondary type="error" v-if="isDeleted" @click="deleteSelected">
        Удалить выбранные
      </n-button>
    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      :row-key="(row) => row.key"
      :style="{ 'font-size': '16px' }"
      v-model:checked-row-keys="selectedRowKeys"
      :max-height="tableHeight"
    />
  </div>
</template>

<style scoped>
.sales-table {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
