<template>
  <div >
      <div class="head-content">
          <div  class="user_bg" >
              <div class="user_img"></div>
              <div class="user_info">
                  <span>阿敏</span>
                  <rater v-model="start" star="✩" disabled active-color="#FF9900" :margin="1"></rater>
                  <p style="font-size:0.9em;"> 签名：得不到的永远在骚动。</p>
              </div>
          </div>
          <div class="head-foot">
            	<div class="foot-info">
                 <div class="foot-info-content">
                    <span>1124</span>
                    <h4>当日</h4>
                 </div>
                 <div class="foot-info-content">
                    <span>300</span>
                    <h4>本周</h4>
                 </div>
                 <div class="foot-info-content">
                     <span>6000</span>
                     <h4>本月</h4>
                 </div>
                 
              </div>
          </div>
      </div>
      <div>
        <group>
            <cell title="账号与安全" value="" is-link></cell>
            <cell title="历史统计" value="" is-link></cell>
            <cell title="设置" value="" is-link></cell>
            <cell title="关于日程" value="版本0.1.0" is-link></cell>
        </group>  
      </div>  
      <div class="login-out"> 
         <x-button type="warn" @click.native="backHome">返回</x-button>
      </div>
  </div>
   
</template>

<script>
import { Rater, Card, Cell, Group, XButton } from 'vux'
export default {
  name: 'myconfig',
  components: {Rater, Card, Cell, Group, XButton},
  data () {
    return {
      start: 3
    }
  },
  methods: {
    backHome () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .head-content{
     height: 400px;
     background: rgb(207, 221, 228);
    color: White;
    -moz-box-shadow: 5px 5px 10px #B7B7B7;
    box-shadow: 5px 5px 10px #B7B7B7;
    position: relative;
    padding-top: 0px;
    .user_bg {
      width: 100%;
      display: flex;
      padding-top: 50px;
      padding-left: 45px;
      .user_img{
        background: url('../assets/head_title.jpg');
        height: 180px;
        width:180px;
        border-radius: 50%; 
        -moz-box-shadow: 5px 5px 10px #B7B7B7;
        box-shadow: 5px 5px 10px #B7B7B7;
        background-size:cover
      }
      .user_info{
        padding-left: 40px;
        
        padding-top:40px;
        font-size: 35px;
        color: rgb(73, 36, 17);
      }
      
    }
    .head-foot {
      position: absolute;
      bottom: 15px;
        width: 100%;;
      .foot-info{
          display: flex;
          width: 100%;;
          .foot-info-content{
            width: 32%;
            text-align: center
          }
      }
      
    }
    
  }
  .login-out{
       margin-top:200px; 
    }
</style>