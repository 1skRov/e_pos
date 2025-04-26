<script>
export default {
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
      fill="none"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M256 112v288M400 256H112"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
