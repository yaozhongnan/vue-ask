<template>
  <div class="tab-header pd">
    <h2 class="title">
      {{ title }}
    </h2>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.tab-header{
  line-height: 41px;
  display: flex;
  justify-content: space-between;
  .title{
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
  }
}
</style>
