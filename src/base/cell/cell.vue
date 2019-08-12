<template>
  <div class="cell-item" :class="{ cellBoder: border }" @click="handleCellClick">
    <div class="cell-item-title">
      <i :class="['iconfont', icon.class]" :style="`color:${icon.color};font-size:${icon.size};`"></i>
      <span>{{ title }}</span>
    </div>
    <div class="cell-item-content">
      <span>{{ content }}</span>
      <i class="iconfont icon-youjiantou"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    margin: {
      type: Number,
      default: 0
    },
    icon: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    to: {
      type: String,
      default: ""
    },
    border: {
      type: String,
      default: "true"
    }
  },
  methods: {
    handleCellClick() {
      
      if (!this.to) return;
      this.$router.push(this.to);
    }
  }
};
</script>

<style lang="less" scoped>
.cell-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 3rem;
  padding: 0 1rem;
  .cell-item-title {
    display: flex;
    i {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }
  .cell-item-content {
    display: flex;
    align-items: center;
    span {
      margin-right: 0.5rem;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.6);
      position: relative;
      top: -1px;
    }
  }
}
.cellBoder {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
