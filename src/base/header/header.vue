<template>
  <header class="header">
    <div class="back" v-show="showBack" @click="back(path)">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <h1>{{ title }}</h1>
    <div class="right">
      <slot name="right"></slot>
    </div>
    <div class="border"></div>
  </header>
</template>
<script>
export default {
  props: {
    showBack: {
      type: String,
      default: 'ture'
    },
    path: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back (path) {
      path ? this.$emit('back') : this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  position: relative;
  background-color: #20232A;
  text-align: center;
  color: #fff;
  .back{
    position: absolute;
    top: 8px;
    left: 8px;
    i{
      font-size: 24px;
    }
  }
  h1{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
    vertical-align: top;
  }
  .right{
    position: absolute;
    top: 0;
    right: 0;
    line-height: 40px;
    height: 40px;
  }
}
</style>

