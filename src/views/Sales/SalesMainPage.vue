<script>
import {defineComponent, ref, h} from "vue";
import {
  NDataTable,
  NButton,
  NTag,
  NIcon,
  NInputNumber
} from "naive-ui";
import {AddOutline, RemoveOutline, TrashOutline} from "@vicons/ionicons5";

export default defineComponent({
  setup() {
    const data = ref(
      Array.from({length: 10}).map((_, index) => ({
        key: index,
        name: `Товар №${index + 1}`,
        count: Math.floor(Math.random() * 10) + 1,
        discount: Number((Math.random() * 10).toFixed(2)),
        price: (index + 1) * 100
      }))
    );

    const updateCount = (row, delta) => {
      const target = data.value.find(r => r.key === row.key);
      if (target) {
        target.count = Math.max(0, target.count + delta);
      }
    };

    const deleteRow = (row) => {
      data.value = data.value.filter(item => item.key !== row.key);
    };

    const columns = [
      {
        type: "selection"
      },
      {
        title: "Наименование",
        key: "name"
      },
      {
        title: "Количество",
        key: "count",
        render(row) {
          return h(
            "div",
            {style: {display: "flex", alignItems: "center", gap: "6px"}},
            [
              h(
                NButton,
                {
                  size: "large",
                  tertiary: true,
                  circle: true,
                  onClick: () => updateCount(row, -1)
                },
                {
                  icon: () => h(NIcon, {component: RemoveOutline})
                }
              ),
              h(NInputNumber, {
                value: row.count,
                "onUpdate:value": (val) => (row.count = val),
                min: 0,
                size: "medium",
                showButton: false,
                style: "width: 60px"
              }),
              h(
                NButton,
                {
                  size: "large",
                  tertiary: true,
                  circle: true,
                  onClick: () => updateCount(row, 1)
                },
                {
                  icon: () => h(NIcon, {component: AddOutline})
                }
              )
            ]
          );
        }
      },
      {
        title: "Скидка",
        key: "discount",
        render(row) {
          return h(
            NTag,
            {type: "warning", bordered: false, round: true},
            {default: () => `${row.discount}%`}
          );
        }
      },
      {
        title: "Цена",
        key: "price",
        render(row) {
          return `${row.price.toFixed(2)} ₸`;
        }
      },
      {
        title: "Итого",
        key: "total",
        render(row) {
          const total = row.price * row.count * (1 - row.discount / 100);
          return `${total.toFixed(2)} ₸`;
        }
      },
      {
        title: "",
        key: "actions",
        align: "center",
        render(row) {
          return h(
            NButton,
            {
              size: "large",
              secondary: true,
              type: "error",
              strong: true,
              circle: true,
              onClick: () => deleteRow(row)
            },
            {
              icon: () => h(NIcon, {component: TrashOutline})
            }
          );
        }
      }
    ];

    return {
      data,
      columns,
    };
  }
});
</script>

<template>
  <div class="sales-table">
    <n-data-table
      :columns="columns"
      :data="data"
      :row-key="row => row.key"
    />
  </div>
</template>

<style scoped>
.sales-table {
  padding: 12px;
}
</style>
