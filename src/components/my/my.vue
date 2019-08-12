<template>
  <div class="root-wrap">
    <!-- header -->
    <TabHeader title="我的"></TabHeader>
    <div class="my">
      <Scroll>
        <!-- 身份卡 -->
        <div class="card-box">
          <span>持卡人：{{ myIndexData.nickname }}</span>
          <span>出生日期：{{ myIndexData.create_time }}</span>
        </div>
        <!-- cell -->
        <div class="cell">
          <cell v-for="item in cellList" :key="item.title" :title="item.title" :content='item.content' :icon='item.icon' :to='item.to'></cell>
        </div>
        <!-- 退出登录 -->
        <a class="exit" href="javascript:;" @click.prevent='handleExitLogin'>退出登录</a>
       </Scroll>
    </div>
    <!-- footer -->
    <app-footer :current=3></app-footer>
    <!-- popup -->
    <div v-if="showPopupAndMask" class="login-popup">
      <h3>您还没有登录，马上登录体验更多功能吧</h3>
      <router-link to="/login">立即登录</router-link>
      <router-link to="/register">免费注册</router-link>
    </div>
    <!-- 遮罩 -->
    <div v-if="showPopupAndMask" class="mask"></div>
  </div>
</template>
<script>
import AppFooter from "@/base/footer/footer";
import TabHeader from "@/base/tabHeader/tabHeader";
import Scroll from "@/base/scroll/scroll";
import Cell from "@/base/cell/cell";
import { myCellData } from "@/assets/js/data";
import {
  getLocalStorage,
  setLocalStorage,
  handleResponse
} from "@/assets/js/common";
import { GET_EXIT, GET_MY_INDEX } from "@/api";
import { Dialog } from "vant";

export default {
  data() {
    return {
      cellList: myCellData,
      loginPopup: true,
      showPopupAndMask: true,
      myIndexData: {}
    };
  },
  created() {
    this._checkToken();
    this.token ? this._reqMyIndexData() : "";
  },
  components: {
    AppFooter,
    TabHeader,
    Cell,
    Scroll
  },
  methods: {
    // 退出登录
    handleExitLogin() {
      // 确认弹框
      Dialog.confirm({
        title: "温馨提示",
        message: "真的要离开吗？",
        confirmButtonText: "是的"
      })
        .then(() => {
          GET_EXIT(this.token).then(res => {
            handleResponse(res, () => {
              // 清除 token
              setLocalStorage("token", "", "string");
              // 跳转到登录页面
              this.$router.push("/login");
            });
          });
        })
        .catch(() => {
          console.log("已关闭");
        });
    },
    // 请求我的接口，获取用户信息
    _reqMyIndexData() {
      GET_MY_INDEX(this.token).then(res => {
        handleResponse(res, () => {
          this.myIndexData = res.data;
        });
      });
    },
    // 检查是否存在 token 值，存在则隐藏 mask 和 popup 组件
    _checkToken() {
      this.token = getLocalStorage("token", "string");
      this.token ? (this.showPopupAndMask = false) : "";
    }
  }
};
</script>
<style lang="less" scoped>
.login-popup {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  height: 12rem;
  background: #20232a;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 12px;
  }
  a {
    line-height: 2.8rem;
    width: 80%;
    background-color: #e2b96f;
    text-align: center;
    border-radius: 2px;
    margin-top: 1.2rem;
  }
  a:last-child {
    background-color: #63b9ff;
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.my {
  position: fixed;
  top: 41px;
  left: 0;
  right: 0;
  bottom: 50px;
  .card-box {
    display: flex;
    flex-direction: column;
    height: 6rem;
    margin: 1rem 1rem 2rem;
    padding: 1rem;
    background: url("./bg.png") no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px 0px 4px #fff;
    span {
      margin-bottom: 1rem;
    }
    span:last-child {
      font-size: 12px;
    }
  }
  .exit {
    display: block;
    width: 70%;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin: 20px auto 0;
    background-color: #2a2e38;
  }
}
</style>
<style>
.van-dialog__header {
  color: #666;
}
</style>