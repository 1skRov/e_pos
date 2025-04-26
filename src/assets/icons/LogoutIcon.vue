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
      d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
      fill="none"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
