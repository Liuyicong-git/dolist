<template>
  <div >
    <FullCalendar
      class="full-c"
      locale="zh-cn"
      :header="header"
      :dayNames="dayNames"
    

      @datesRender="handMonthChange"
      defaultView="dayGridMonth"
      :defaultDate="dateStr"
      :plugins="calendarPlugins"
      :buttonText="buttonText"
     
      :events="events"
      @dateClick="handleDateClick"
      @eventClick="eventClick"
    />
    <div>
    <div class="do-container">
          <h4 style="color:#666;padding:8px 10px;">待办事项 <span style="float:right;">15/24</span></h4>
          <progress-bar 
           :val="15/24*100" 
           size="large"
           :bar-border-radius=10
           style="padding: 0px 10px;" text-align="right" />
          <div class="event-card"   v-if="eventsDetails.length == 0" >
              今天还没有行程，快快添加吧 <span @click="toOption" style="color:red;">操作</span>
          </div>  
          <div class="event-card" v-for=" (item , index) in eventsDetails" :key="index" >
            <div class="event-card-title">
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
            </div>      
          </div> 
                  
      </div>  
     
    </div>  
  </div>
</template>

<script>

import ProgressBar from 'vue-simple-progress'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import { Card, Group, CellBox, Cell, Timeline, TimelineItem, XProgress, Box, XButton } from 'vux'
export default {
  name: 'Home',
  components: {
    FullCalendar, // make the <FullCalendar> tag available,
    Card,
    Group,
    CellBox,
    Cell,
    Timeline,
    TimelineItem,
    XProgress,
    Box,
    ProgressBar,
    XButton

  },
  data () {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      dateStr: '',
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
    //  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      events: [],
      moment: moment,
      eventsDetails: [],
      buttonText: {
        today: '今天',
        month: '月',
        day: '日'
      }
    }
  },
  created () {
    this.getMonthData()
    this.getDayData(this.$route.params ? this.$route.params.day : null)
  },
  methods: {

    getMonthData (monthString) {
      let monthStr = monthString || moment(new Date()).format('YYYY-MM')
      this.http.get(`/event/month/${monthStr}`).then(res => {
        let target = res.data
        this.events = target.data.map(val => {
          return {
            'id': val.id,
            'start': val.event_start_date,
            'end': val.event_end_date,
            'title': val.event_title,
            'desc': val.event_description
          }
        })
        this.eventsDetails = this.events.filter(val =>
          new Date(val.start).getTime() >= new Date(this.dateStr).getTime() && new Date(val.start).getTime() <= (new Date(this.dateStr).getTime() + 1 * 24 * 60 * 60 * 1000)
        )
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
    getEventDetails (dateStr) {
      this.eventsDetails = this.events.filter(val =>
        new Date(val.start).getTime() >= new Date(dateStr).getTime() && new Date(val.start).getTime() <= (new Date(dateStr).getTime() + 1 * 24 * 60 * 60 * 1000)
      )
    },
    handMonthChange (info) {
      let monthStr = moment(info.view.currentStart).format('YYYY-MM')
      this.getMonthData(monthStr)
    },
    handleDateClick (info) {
      this.dateStr = moment(info.dateStr).format('YYYY-MM-DD')

      this.getDayData(this.dateStr)
    },
    eventClick (eventInfo) {
      console.log(event)
      let dateStr = moment(new Date(eventInfo.event.start)).format('YYYY-MM-DD')
      this.getDayData(dateStr)
    },
    toOption (item) {
      this.$router.push({
        name: 'addEvent',
        params: {...item, dateStr: this.dateStr}
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .do-container{
     background-color:#fff;
     border-top: 1px solid #e5e5e5;
     margin-top:10px;
  }
  .event-card{
    margin: 8px 10px;
    border: 1px solid #e5e5e5;
    .event-card-title {
       padding: 10px 10px;
    }
    .event-card-foot {
       padding: 10px 10px;
    }
  }

  /deep/  .full-c {
     margin-top:5px;
     .fc-prev-button{
        background-color:transparent;
        border: none;
        color: #FC7930;
      }
      .fc-next-button{
        background-color:transparent;
        border: none;
        color: #FC7930;
      }
      .fc-header-toolbar{
        float: left;
        margin-bottom:0.5em;
        font-size: 1em;
      }
  }
  .fc{
    font-size: 0.5em;
  }

</style>

