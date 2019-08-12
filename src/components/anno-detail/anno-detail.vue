<template>
  <div class="anno-detail">
    <app-header title="公告详情" />
    <div class="detail">
      <scroll>
        <h1>{{ annoDetail.title }}</h1>
        <div class="data">
          <span>作者：{{ annoDetail.author }}</span>
          <span>阅读量：{{ annoDetail.watch_num + 1 }}</span>
          <span>{{ annoDetail.create_time }}</span>
        </div>
        <div class="border" style="margin-bottom: 10px;"></div>
        <div class="desc">{{ annoDetail.content }}</div>
      </scroll>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/base/header/header'
import Scroll from '@/base/scroll/scroll'
import { GET_ANNO_DETAIL, POST_ANNO_ADDWATCHNUM } from '@/api'
import { handleResponse } from '@/assets/js/common'

export default {
  data () {
    return {
      annoDetail: {}
    }
  },
  components: {
    AppHeader,
    Scroll
  },
  created () {
    this.anno_id = this.$route.params.id
    this._reqAnnoDetail()
    this._reqAddWatchNum()
  },
  methods: {
    _reqAnnoDetail () {
      GET_ANNO_DETAIL(this.anno_id).then(res => {
        handleResponse(res, () => {
          this.annoDetail = res.data
        })
      })
    },
    _reqAddWatchNum () {
      POST_ANNO_ADDWATCHNUM(this.anno_id)
    }
  }
}
</script>
<style lang="less" scoped>
.anno-detail{
  .detail{
    position: fixed;
    top: 41px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
    h1{
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .data{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
}
</style>

