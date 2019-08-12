<template>
  <div class="register">
    <login-style
      top='80px'
      title="Welcome Back" 
      :btnData='btnData'
      showForget='true'
      @submitClick='submitClick'>
    </login-style>
  </div>
</template>
<script>
import loginStyle from '@/base/loginStyle/loginStyle'
import { POST_LOGIN } from '@/api'
import { handleResponse, setLocalStorage } from '@/assets/js/common'

export default {
  name: "register",
  data () {
    return {
      btnData: {
        redText: '登录',
        blueText: '注册',
        blueLink: '/register'
      }
    }
  },
  methods: {
    submitClick (data) {
      POST_LOGIN(data.phone, data.password).then(res => {
        handleResponse(res, () => {
          // 存储 token
          setLocalStorage('token', res.token, 'string')
          // 跳转至我的页面
          this.$router.push('/my')
        })
      })
    },
  },
  components: {
    loginStyle
  }
};
</script>
<style lang="less" scoped>
.register {
  position: relative;
  height: 100%;
  background: url("./bg.jpg") no-repeat #252831 0 100%;
  background-size: 100%;
}
</style>

