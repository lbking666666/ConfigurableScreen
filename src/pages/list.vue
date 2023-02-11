<template>
  <div class="home">
    1111
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "Home",
  mounted() {
    // 使用
  },
  methods: {
    clickEvent(num: string): void {
      alert(num);
    },
  },
});
</script>
<style scoped lang="less">
.home {
  width:100%;
  height:100%;
  color:#000;
}
</style>
