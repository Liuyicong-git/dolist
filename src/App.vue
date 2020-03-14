<template>
  <div id="app">
    <router-view ></router-view>
  </div>
   
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";

#app {
  width: 750px;
  height: 1334px;
  background: salmon;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>