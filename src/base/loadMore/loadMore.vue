<template>
  <div class="loadmore-box" ref='loadMore'>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check='false'
      @load="onLoad"
      :offset="10">
        <!-- 数据 -->
        <slot></slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  props: {
    //是否处于加载状态
    loading: {
      type: Boolean,
      default: false
    },
    //是否已加载完所有数据
    finished: {
      type: Boolean,
      default: false
    },
    //是否处于下拉刷新状态
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods:{
    onLoad() {      //上拉加载
      console.log('上拉了');
      this.loading = true
      setTimeout(() => {
        this.$toast('刷新成功');
        this.loading = false;
      }, 1000);
    },
    onRefresh() {       //下拉刷新
      this.isLoading = true;
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    }
  },
  mounted(){
    let winHeight = document.documentElement.clientHeight
    // 设置滚动区域容器的高度
    this.$refs.loadMore.style.height = (winHeight - 43 - 50 - 4.4*this.rem - 50 - 12) + 'px'
  },
  computed: {
    // 计算 1rem 对应的 font-size 值
    rem () {
      let winWidth = document.documentElement.clientWidth
      if (winWidth < 414) {
        return 14
      } else if (winWidth < 768){
        return 16
      } else if (winWidth < 1024) {
        return 26
      } else {
        return 26
      }
      
    }
  }
}
</script>
<style lang="less" scoped>
.loadmore-box{
  overflow: auto;
}
</style>

