<template>
  <div class="eventForm">
    <div>
      <group>
        <x-input title="事件名称" placeholder="请输入事件名称" v-model="requestEntity.event_title"></x-input>
        <x-textarea :max="50" placeholder="请输入事件内容" v-model="requestEntity.event_description"></x-textarea>
        <datetime v-model="requestEntity.event_start_date" format="YYYY-MM-DD HH:mm" 
        :minute-list="['00', '15', '30', '45']" @on-change="change" title="开始时间"></datetime>
        <datetime v-model="requestEntity.event_end_date" format="YYYY-MM-DD HH:mm" 
        :minute-list="['00', '15', '30', '45']" @on-change="change" title="结束时间"></datetime>
        <x-button type="primary" v-if="!isEdit" @click.native="submit">新增日程</x-button>
        <x-button type="primary"  v-if="isEdit" @click.native="update">修改日程</x-button>
        <x-button type="warn" @click.native="backHome">返回</x-button>
      </group>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { Group, XInput, XButton, Datetime, XTextarea } from 'vux'
export default {
  name: 'addEvent',
  components: {
    XInput,
    Group,
    XButton,
    Datetime,
    XTextarea
  },
  created () {
    if (this.$route.params.id) {
      this.requestEntity.event_start_date = moment(this.$route.params.start).format('YYYY-MM-DD HH:mm')
      this.requestEntity.event_end_date = moment(this.$route.params.end).format('YYYY-MM-DD HH:mm')
      this.requestEntity.id = this.$route.params.id
      this.requestEntity.event_description = this.$route.params.desc
      this.requestEntity.event_title = this.$route.params.title
      this.isEdit = true
    } else {
      this.requestEntity.event_start_date = moment(this.$route.params.dateStr).format('YYYY-MM-DD HH:mm')
      this.requestEntity.event_end_date = moment(this.$route.params.dateStr).format('YYYY-MM-DD HH:mm')
    }
  },
  data () {
    return {
      isEdit: false,
      requestEntity: {
        event_title: '',
        event_description: '',
        event_start_date: '',
        event_end_date: ''

      }
    }
  },
  methods: {
    change (value) {
      console.log('change', value)
    },
    backHome () {
      this.$router.push({name: 'home'})
    },
    submit () {
      this.http.post('/event/', this.requestEntity).then(res => {
        this.$vux.toast.text('新增成功')
        this.$router.push({name: 'home', params: {day: this.requestEntity.event_start_date}})
      })
    },
    update () {
      this.http.put('/event/', this.requestEntity).then(res => {
        this.$vux.toast.text('修改成功')
        this.$router.push({name: 'home', params: {day: this.requestEntity.event_start_date}})
      })
    }
  }
}
</script>
