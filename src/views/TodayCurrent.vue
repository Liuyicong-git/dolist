<template>
  <div style="height:100%;" >
          <div class="head-title">
              <div style="padding-top:17%;">
               
                <span style="width:30%;display:inline-block;text-align:center;">
                    <h4 style="padding-bottom:5px;">{{moment(new Date()).format('MM月DD日')}}</h4>
                    <h4 >西安</h4>  
                </span>
                <span style="width:50%;display:inline-block;text-align:center;">
                    <p>{{weatherInfo.tem}}</p>
                    <p>{{weatherInfo.wea}}</p>
                    <p> {{weatherInfo.win}} {{weatherInfo.win_speed}}</p>
                </span>
                
              </div>
          </div>

          <div>
          </div>  
          <div style="margin:5px;">
            <div class="event-card"   v-if="eventsDetails.length == 0" >
                今天还没有行程，快快添加吧 <span @click="toOption" style="color:red;">操作</span>
            </div>   
            <div class="event-card " v-for=" (item , index) in eventsDetails" :key="index" >
              <div class="event-container">
                <div class="event-time">
                    <h2 style="color:#555;">{{ moment(item.start).format('HH:mm')}}</h2>
                </div>
                <div class="event-content">
                    <div>{{item.title}} </div>
                    <div style="padding-top:5px;margin-bottom:5px;">{{item.desc}}</div>
                    <!-- <div style="margin-bottom:5px;">{{moment(item.end).format('YYYY-MM-DD hh:mm')}}</div> -->
                    <rater v-model="start" star="✩" disabled active-color="#FF9900" :margin="1"></rater>
                </div> 
                <div class="event-flag">
                    <div> <x-switch :title="''" :value="true"></x-switch></div>
                </div>    
              </div>

                    <!-- <div class="event-card-title">
                        <x-button mini type="primary">{{ moment(item.start).format('HH:mm')}}</x-button>
                        <span style="padding-left:10px;">{{item.title}}</span>
                        <span @click="toOption(item)" style="float:right;">操作</span>
                    </div>  
                    <div >
                        <x-button mini type="primary" style="visibility:hidden;">{{ moment(item.start).format('HH:mm')}}</x-button>
                        <span style="padding-left:18px;"><span>{{item.desc}}</span></span>
                    </div>  
                    <div class="event-card-foot">
                        <x-button mini type="primary">截止时间</x-button><span style="padding-left:10px;">{{moment(item.end).format('YYYY-MM-DD hh:mm')}}</span>
                    </div>       -->
            </div> 
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
      this.http.get('https://tianqiapi.com/api?version=v6&appid=33799233&appsecret=6EMf0eeV').then(res => {
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
    toOption (item) {
      this.$router.push({
        name: 'addEvent',
        params: {...item, dateStr: moment(new Date()).format('YYYY-MM-DD')}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .today-container {
     // background-color:#fff;
      border-top: 1px solid #e5e5e5;
      margin-top:10px;
    }
    // .event-card{
    //   margin: 8px 10px;
    //   border: 1px solid #e5e5e5;
    //   .event-card-title {
    //     padding: 10px 10px;
    //   }
    //   .event-card-foot {
    //     padding: 10px 10px;
    //   }
    // }
    .event-container{
       margin: 8px 10px;
       border-bottom: 1px solid #e5e5e5;
       align-items:center;
      //  border: 1px solid #e5e5e5;
       display: flex;
       .event-time {
         width: 30%;
         text-align: center;

       }
       .event-content{
         width: 50%;
         padding-left:20px;
     
       }
       /deep/.event-flag{
         width: 20%;
         .weui-switch{
           height: 20px!important;
         }
        /deep/ .weui-switch:after, .weui-switch-cp__box:after{
           height: 18px!important;
         }
       }

    }
    .head-title{
      background: url('../assets/head_title.jpg');
      height: 300px;
    }

</style>
