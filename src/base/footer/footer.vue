<template>
  <footer class="footer">
    <div :class="{ active: current === index }" v-for="(item, index) in footData" :key="item.path" @click="gopage(item.path)">
      <i :class="['iconfont', item.iconClass]"></i>
      <span>{{ item.name }}</span>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    footData: {
      type: Array,
      default: () => {
        return [
          {path: '/home', iconClass: 'icon-shouye', name: '首页'},
          {path: '/ask', iconClass: 'icon-caidan', name: '问答'},
          {path: '/search', iconClass: 'icon-zixun', name: '搜索'},
          {path: '/my', iconClass: 'icon-wode', name: '我的'},
        ]
      }
    },
    current: {
      type: Number,
      default: 0
    }
  },
  methods: {
    gopage (path) {
      this.$router.push(path)
    }
  },
  computed: {
    isActive () {
      return 'active'
    }
  }
}
</script>

<style lang="less" scoped>
.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #232833;
  display: flex;
  font-size: 12px;
  color: rgba(255,255,255,.8);
  > div{
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active{
      color: #E2B96F;
    }
    i{
      font-size: 18px;
      margin-bottom: 4px;
    }
  }
}
</style>
