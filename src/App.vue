<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
html body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
<script>
import { getCurrentInstance } from "vue";
export default {};
</script>
