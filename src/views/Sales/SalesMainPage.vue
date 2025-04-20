<template>
  <div class="sales-table">
    <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
      <n-select
        v-model:value="selectedProduct"
        :options="productOptions"
        filterable
        placeholder="Выберите товар..."
        style="width: 33%;"
        @update:value="handleSelect"
      />
      <n-button
        v-if="isDeleted"
        strong
        secondary
        type="error"
        @click="deleteSelected"
      >
        Удалить выбранные
      </n-button>
    </div>
    <n-data-table
      :columns="columns"
      :data="data"
      :row-key="row => row.key"
      v-model:checked-row-keys="selectedRowKeys"
      :max-height="tableHeight"
      :style="{ fontSize: '16px' }"
    />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch, h } from 'vue'
import {
  NButton,
  NTag,
  NIcon,
  NInputNumber,
  NPopover,
  NDataTable,
  NSelect
} from 'naive-ui'
import { AddOutline, RemoveOutline, TrashOutline } from '@vicons/ionicons5'
import CalcItem from '@/components/InputNumber.vue'

export default defineComponent({
  components: {
    NButton,
    NTag,
    NIcon,
    NInputNumber,
    NPopover,
    NDataTable,
    NSelect,
    CalcItem
  },
  setup() {
    const allProducts = ref(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        name: `Товар №${i + 1}`,
        price: (i + 1) * 100,
        discount: Number((Math.random() * 10).toFixed(2))
      }))
    )

    const productOptions = computed(() =>
      allProducts.value.map(p => ({
        label: `${p.name} — ${p.price} ₸`,
        value: p.id
      }))
    )

    const selectedProduct = ref(null)

    const nextKey = ref( allProducts.value.length )

    const data = ref([])

    const handleSelect = (productId) => {
      if (productId === null) return
      const prod = allProducts.value.find(p => p.id === productId)
      if (prod) {
        data.value.push({
          key: nextKey.value++,
          name: prod.name,
          count: 1,
          discount: prod.discount,
          price: prod.price,
          customTotal: null
        })
      }
      selectedProduct.value = null
    }

    const selectedRowKeys = ref([])
    const isDeleted = computed(() => selectedRowKeys.value.length > 0)

    const deleteSelected = () => {
      data.value = data.value.filter(row => !selectedRowKeys.value.includes(row.key))
      selectedRowKeys.value = []
    }

    const updateCount = (row, delta) => {
      const target = data.value.find(r => r.key === row.key)
      if (target) {
        target.count = Math.max(0, target.count + delta)
        target.customTotal = null
      }
    }

    const deleteRow = (row) => {
      data.value = data.value.filter(item => item.key !== row.key)
    }

    const popoverState = reactive({})

    const columns = [
      { type: 'selection' },
      {
        title: 'Наименование',
        key: 'name',
        render(row) {
          return h(
            'div',
            {
              style: { cursor: 'pointer' },
              onClick: () => {
                const i = selectedRowKeys.value.indexOf(row.key)
                if (i >= 0) selectedRowKeys.value.splice(i, 1)
                else selectedRowKeys.value.push(row.key)
              }
            },
            row.name
          )
        }
      },
      {
        title: 'Количество',
        key: 'count',
        render(row) {
          if (!popoverState[row.key]) popoverState[row.key] = {}
          return h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [
            h(
              NButton,
              {
                size: 'small',
                tertiary: true,
                circle: true,
                onClick: () => updateCount(row, -1)
              },
              { icon: () => h(NIcon, { component: RemoveOutline }) }
            ),
            h(
              NPopover,
              {
                trigger: 'click',
                placement: 'right-start',
                show: popoverState[row.key].count,
                'onUpdate:show': val => {
                  popoverState[row.key].count = val
                },
                style: 'padding: 0'
              },
              {
                trigger: () =>
                  h(NInputNumber, {
                    value: row.count,
                    'onUpdate:value': val => {
                      row.count = val
                      row.customTotal = null
                    },
                    min: 0,
                    size: 'medium',
                    showButton: false,
                    style: 'width: 60px'
                  }),
                default: () =>
                  h(CalcItem, {
                    modelValue: row.count,
                    'onUpdate:modelValue': val => {
                      row.count = val
                      row.customTotal = null
                      popoverState[row.key].count = false
                    },
                    onCancel: () => {
                      popoverState[row.key].count = false
                    }
                  })
              }
            ),
            h(
              NButton,
              {
                size: 'small',
                tertiary: true,
                circle: true,
                onClick: () => updateCount(row, 1)
              },
              { icon: () => h(NIcon, { component: AddOutline }) }
            )
          ])
        }
      },
      {
        title: 'Скидка',
        key: 'discount',
        render(row) {
          if (!popoverState[row.key]) popoverState[row.key] = {}
          return h(
            NPopover,
            {
              trigger: 'click',
              placement: 'right-start',
              show: popoverState[row.key].discount,
              'onUpdate:show': val => {
                popoverState[row.key].discount = val
              }
            },
            {
              trigger: () =>
                h(
                  NTag,
                  { type: 'warning', bordered: false, round: true },
                  { default: () => `${row.discount}%` }
                ),
              default: () =>
                h(CalcItem, {
                  modelValue: row.discount,
                  'onUpdate:modelValue': val => {
                    row.discount = val
                    row.customTotal = null
                    popoverState[row.key].discount = false
                  },
                  onCancel: () => {
                    popoverState[row.key].discount = false
                  }
                })
            }
          )
        }
      },
      {
        title: 'Цена',
        key: 'price',
        render: row => `${row.price} ₸`
      },
      {
        title: 'Итого',
        key: 'total',
        render(row) {
          if (!popoverState[row.key]) popoverState[row.key] = {}
          const calc = row.price * row.count * (1 - row.discount / 100)
          const total = row.customTotal != null ? row.customTotal : calc
          return h(
            NPopover,
            {
              trigger: 'click',
              placement: 'right-start',
              style: 'padding: 0',
              show: popoverState[row.key].total,
              'onUpdate:show': val => {
                popoverState[row.key].total = val
              }
            },
            {
              trigger: () => h('span', null, `${total.toFixed(2)} ₸`),
              default: () =>
                h(CalcItem, {
                  modelValue: total,
                  'onUpdate:modelValue': val => {
                    row.customTotal = val
                    popoverState[row.key].total = false
                  },
                  onCancel: () => {
                    popoverState[row.key].total = false
                  }
                })
            }
          )
        }
      },
      {
        title: '',
        key: 'actions',
        align: 'center',
        render: row =>
          h(
            NButton,
            {
              size: 'small',
              secondary: true,
              type: 'error',
              strong: true,
              onClick: () => deleteRow(row)
            },
            { icon: () => h(NIcon, { component: TrashOutline }) }
          )
      }
    ]

    const tableHeight = computed(() => `${window.innerHeight - 190 - 275}px`)

    return {
      allProducts,
      productOptions,
      selectedProduct,
      data,
      columns,
      selectedRowKeys,
      isDeleted,
      deleteSelected,
      handleSelect,
      tableHeight
    }
  }
})
</script>

<style scoped>
.sales-table {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
