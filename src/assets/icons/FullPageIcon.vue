<script>
export default {
  name: 'FullPageIcon',
  props: {
    stroke: {
      type: String,
      default: '#45556c',
    },
    width: {
      type: Number,
      default: 20,
    },
    height: {
      type: Number,
      default: 20,
    },
  },
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <path
      d="M336 448h56a56 56 0 0056-56v-56M448 176v-56a56 56 0 00-56-56h-56M176 448h-56a56 56 0 01-56-56v-56M64 176v-56a56 56 0 0156-56h56"
      fill="none"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
