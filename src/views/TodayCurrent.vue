<template>
  <div style="height:100%;" >
      <div class="head-title">
          <div  class="weather-content" >
            <span  class="weather-city">
                <h4 >{{moment(new Date()).format('MM月DD日')}}</h4>
                <h4 >西安</h4>  
            </span>
            <span class="weather-info" style="width:50%;display:inline-block;text-align:center;">
                <p class="weather-temp">{{weatherInfo.tem + '°C'}}</p>
                <p style="font-size:1em;">{{ '天气  ' + weatherInfo.wea}}</p>
                <p> {{weatherInfo.win}} {{weatherInfo.win_speed}}</p>
            </span>
            
          </div>
      </div>

      <div>
      </div>  
      <div  class="event-box">
          <div class="event-card"   v-if="eventsDetails.length == 0" >
            今天还没有待办事项，快快添加吧 <span @click="toAdd" style="color:red;">添加待办事项</span>
        </div>   
        <div class="event-card " v-for=" (item , index) in eventsDetails" :key="index" >
          <div class="event-container">
            <div class="event-time">
                <h2 style="color:#555;">{{ moment(item.start).format('HH:mm')}}</h2>
            </div>
            <div class="event-content">
                <div> <span>{{item.title}}</span> </div>
                <div ><p>{{item.desc}}</p></div>
                <!-- <div style="margin-bottom:5px;">{{moment(item.end).format('YYYY-MM-DD hh:mm')}}</div> -->
                <!-- <rater v-model="start" star="✩" disabled active-color="#FF9900" :margin="1"></rater> -->
            </div> 
            <div class="event-flag">
                <div> <x-switch :title="''" :value="true"></x-switch></div>
            </div>    
          </div>
        </div> 
      </div>
      <div class="add-event">
          <x-icon type="ios-plus" size="60" class="add-color" @click="toAdd"></x-icon>
      </div>
  </div>
</template>

<script>
import { XButton, Tabbar, TabbarItem, XSwitch, Rater } from 'vux'
import moment from 'moment'
export default {
  name: 'todayCurrent',
  components: {
    Tabbar, TabbarItem, XButton, XSwitch, Rater
  },
  data () {
    return {
      start: 3,
      moment: moment,
      weatherInfo: {},
      eventsDetails: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.getDayData()
      this.getWeather()
    },
    getWeather () {
      this.http.get('https://tianqiapi.com/api?version=v6&appid=33799233&appsecret=6EMf0eeV&city=西安').then(res => {
        this.weatherInfo = res.data
      })
    },
    getDayData (dateString) {
      this.dateStr = dateString || moment(new Date()).format('YYYY-MM-DD')
      this.http.get(`/event/day/${this.dateStr}`).then(res => {
        let target = res.data
        this.eventsDetails = target.data.map(val => {
          return {
            'id': val.id,
            'start': val.event_start_date,
            'end': val.event_end_date,
            'title': val.event_title,
            'desc': val.event_description
          }
        })
      })
    },
    toAdd () {
      this.$router.push({
        name: 'addEvent',
        params: {dateStr: moment(new Date()).format('YYYY-MM-DD')}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .event-box {
      margin:20px;
    }
    .today-container {
      border-top: 1px solid #e5e5e5;
      margin-top:10px;
    }
    .add-event{
        position: fixed !important;
        bottom:150px!important;
        right: 30px;
        z-index: 999999!important;
        .add-color{
          fill: #FC7930;
        }
    }
    .event-container{
      //  margin: 8px 10px;
       border-bottom: 1px solid #e5e5e5;
       align-items:center;
       display: flex;
       .event-time {
         width: 30%;
         text-align: center;
       }
       .event-content{
         padding: 5px 0;
         width: 50%;
         span {
            color: #333;
            font-size: 30px;
         }
         p{
            color: #888;
            font-size: 28px;
         }
       }
       .event-flag{
         width: 20%;
         padding-right: 20px;
     
       }
    }
    .head-title{
      background: url('../assets/head_title.jpg');
      height: 320px;
      background-size:cover;
       -moz-box-shadow: 2px 2px 8px #efefef;
      box-shadow: 2px 2px 8px #efefef;
    }
    .weather-content{
        padding-top:15%;
        display: flex;
        align-items:center;
        .weather-city{
          padding-top:20px;
          width:40%;
          display:inline-block;
          text-align:center;
        }
        .weather-info{
           width:50%;
           .weather-temp{
             font-size:2em;
             height:80px;
           }
        }
    }
   

</style>
