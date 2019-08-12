<template>
  <div class="my-reply">
    <app-header title="我的评论" />
    <p>此功能正在开发中，估计开发不出来。</p>
  </div>
</template>
<script>
import AppHeader from "@/base/header/header";

export default {
  data() {
    return {
    };
  },
  components: {
    AppHeader
  }
};
</script>
<style lang="less" scope>
.my-reply {
  p{
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -102px;
    text-align: center;
    font-size: 12px;
  }
}
</style>
