<template>
  <div class="register">
    <login-style
      top='60px'
      title="Sign up here" 
      desc='precious collection is waiting for you'
      :btnData='btnData'
      :showNickname='true'
      @submitClick='submitClick'>
    </login-style>
  </div>
</template>
<script>
import loginStyle from '@/base/loginStyle/loginStyle'
import { POST_REGISTER } from '@/api'
import { handleResponse, setLocalStorage } from '@/assets/js/common'

export default {
  name: "register",
  data () {
    return {
      btnData: {
        redText: '注册',
        blueText: '登录',
        blueLink: '/login'
      },
    }
  },
  methods: {
    submitClick (data) {
      // 请求注册接口
      POST_REGISTER(data.nickname, data.phone, data.password).then(res => {
        handleResponse(res, () => {
          setLocalStorage('token', res.token, 'string')
          this.$router.push('/my')
        })
      })
    }
  },
  components: {
    loginStyle
  }
};
</script>
<style lang="less" scoped>
.register {
  height: 100%;
  background: url("./bg.jpg") no-repeat #252831 0 100%;
  background-size: 100%;
}
</style>

