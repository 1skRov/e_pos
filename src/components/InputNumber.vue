<script>
import {BackspaceSharp} from "@vicons/ionicons5";
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    BackspaceSharp
  },
  setup() {
  }
});
</script>

<template>
  <div class="numbers-panel">
    <div class="num-btns">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>0</button>
      <button>00</button>
      <button>.</button>
    </div>
    <div class="add-btns">
      <button class="clear">
        <n-icon size="30" color="">
          <BackspaceSharp/>
        </n-icon>
      </button>
      <button class="cancel">Отмена</button>
      <button class="ok">ОК</button>
    </div>
  </div>
</template>

<style scoped>
.numbers-panel {
  padding: 20px;
  display: flex;
  max-width: 350px;
  gap: 8px;

  .num-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    button {
      border: 1px solid #7dd3fc;
      background: #e0f2fe;
      border-radius: 8px;
      font-size: 20px;
      width: 60px;
      height: 60px;

      &:active {
        background: #bae6fd;
      }
    }
  }

  .add-btns {
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      width: 100px;
      height: 60px;
      font-size: 20px;
      border-radius: 8px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .cancel {
      background: #d23050;
      color: #ffffff;
      border: none;
    }
    .ok {
      background: #0284c7;
      color: white;
    }
  }
}
</style>
