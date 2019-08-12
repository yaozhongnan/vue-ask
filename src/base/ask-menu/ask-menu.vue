<template>
  <div class="ask-menu">
    <i @click="handleMenuClick" style="color:#E2B96F;font-size: 22px;" class="iconfont icon-caidan"></i>
    <van-popup class="popup-box bg" v-model="showPopup">
      <div class="title">
        <span>选择问答分类</span>
        <i @click="showPopup = false" style="color:#fff;font-size: 20px;" class="iconfont icon-guanbi"></i>
      </div>
      <ul>
        <li v-for="item in categoryList" :key="item.cate_id">
          <a href="javascript:;" @click="handleMenuTabClick(item.cate_id)">{{ item.cate_name }}</a>
        </li>
      </ul>
    </van-popup>
  </div>
</template>
<script>
import { GET_ASK_CATEGORY } from "@/api";
import { handleResponse } from "@/assets/js/common";

export default {
  data() {
    return {
      showPopup: false,
      categoryList: []
    };
  },
  created() {
    this._reqCategory();
  },
  methods: {
    // 处理点击菜单按钮事件
    handleMenuClick() {
      this.showPopup = true;
    },
    handleMenuTabClick(id) {
      this.showPopup = false;
      this.$router.push(`/ask/category/${id}`)
    },
    // 请求问答分类接口
    _reqCategory() {
      GET_ASK_CATEGORY().then(res => {
        handleResponse(res, () => {
          this.categoryList = res.data;
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ask-menu {
  .popup-box {
    padding: 1rem;
    width: 70%;
  }
  .popup-box .title {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .popup-box ul {
    display: flex;
    flex-wrap: wrap;
  }
  .popup-box ul li {
    width: 50%;
    padding-right: 1rem;
    margin-bottom: 1rem;
  }
  .popup-box ul li a {
    display: block;
    color: #4caaff;
    text-align: center;
    border: 1px solid #4caaff;
  }
}
</style>

