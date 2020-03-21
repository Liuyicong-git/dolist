<template>
  <div id="app">
    <el-carousel :interval="5000"  arrow="never" height="100vh">
      <el-carousel-item v-for="(item ,index) in list" :key="index">
        <img  :src="item.url" />
      </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import { Carousel, CarouselItem} from 'element-ui'
export default {
  name: 'App',
  components: {
    'el-carousel': Carousel,
    'el-carousel-item': CarouselItem
  },
  data () {
    return {
      list: [
         {title: null, url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'},
         {title: null, url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'},
         {title: null, url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'},
         {title: null, url: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'}
      ]
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img {
     width: 100%;
     height: 100%;
     object-fit:cover;
  }
</style>


