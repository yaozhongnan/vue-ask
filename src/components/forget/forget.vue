<template>
  <div class="forget">
    <header-main title='修改密码'></header-main>
    <br>
    <van-cell-group
      :border='false'>
      <van-field
        label="手机号"
        v-model="phone"
        :border='false'
        clearable
        placeholder="请输入您的手机号"
      />
      <div class="border"></div>
      <van-field
        label="新密码"
        type='password'
        clearable
        v-model="password"
        placeholder="请输入要更改的密码"
      />
    </van-cell-group>
    <div class="border"></div>
    <a href="javascript;;" class="submit-btn" @click.prevent='handleSubmitClick'>确认修改</a>
  </div>
</template>
<script>
import HeaderMain from "@/base/header/header";
import { Toast, Dialog } from "vant";
import { POST_MODIFY_PASSWORD } from "@/api";
import { handleResponse } from "@/assets/js/common";

export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  components: {
    HeaderMain
  },
  methods: {
    handleSubmitClick() {
      if (!this.phone) {
        return Toast("请输入手机号码");
      }
      if (!/^1[0-9]{10}$/.test(this.phone)) {
        return Toast("请输入正确的手机号码");
      }

      if (!this.password) {
        return Toast("请输入密码");
      }
      if (this.password.length < 6 || this.password.length > 12) {
        return Toast("请输入6-12位密码");
      }

      POST_MODIFY_PASSWORD(this.phone, this.password).then(res => {
        handleResponse(res, () => {
          Dialog.alert({
            title: '温馨提示',
            message: '您的密码已修改，需要重新登录！'
          }).then(() => {
            localStorage.setItem('token', '')
            this.$router.push('/login')
          });
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.forget {
  .van-cell-group{
    background-color: transparent;
    .van-cell{
      background-color: transparent;
      color: rgba(255,255,255,.6);
    }
  }
}
</style>


