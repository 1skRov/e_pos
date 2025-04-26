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
      stroke-linejoin="round"
      stroke-width="32"
      d="M160 336V48l32 16 32-16 31.94 16 32.37-16L320 64l31.79-16 31.93 16L416 48l32.01 16L480 48v224"
    />
    <path
      d="M480 272v112a80 80 0 01-80 80h0a80 80 0 01-80-80v-48H48a15.86 15.86 0 00-16 16c0 64 6.74 112 80 112h288"
      fill="none"
      :stroke="stroke"
      stroke-linejoin="round"
      stroke-width="32"
    />
    <path
      fill="none"
      :stroke="stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M224 144h192M288 224h128"
    />
  </svg>
</template>

<style scoped lang="scss"></style>
