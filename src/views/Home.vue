<template>
  <div id="home" style="height:100%;">
      <router-view ></router-view>
        <tabbar v-model="barIndex" slot="bottom"  class="tabbarStyle">
            <tabbar-item  selected  link="/home">
              <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
              <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item link="/plan">
              <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
              <span slot="label">日程</span>
            </tabbar-item>
            <tabbar-item badge="2">
              <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
              <span slot="label">我</span>
            </tabbar-item>
        </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, ViewBox } from 'vux'
export default {
  name: 'home',
  components: { Tabbar, TabbarItem, ViewBox },
  data () {
    return {
      barIndex: 0
    }
  }
}
</script>

<style>
.weui-tabbar {
  position: fixed !important;
  bottom:0!important;
  left: 0 !important;
  z-index: 999999!important;
}

</style>
