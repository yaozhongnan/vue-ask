<template>
  <div class="card-box">
    <header-main title='个人资料'></header-main>
    <div class="card">
      <van-cell-group :border='false'>
        <vue-core-image-upload
          crop="local"
          @imagechanged='imagechanged'
          @imageuploading='imageuploading'
          @errorhandle='errorhandle'
          :max-file-size="3145728"
          :max-width='100'
          :max-height='100'
          extensions='png,jpg,gif'
          inputAccept=''
          :isXhr='false'>
          <div class="avatar">
            <span>当前头像</span>
            <div>
              <span>修改头像</span>
              <img :src="information.avatar" alt="">
            </div>
          </div>
        </vue-core-image-upload>
        <div class="border"></div>
        <van-field
          clearable
          :border='false'
          label="昵称"
          v-model="information.nickname"
          placeholder="请输入用户名"
        />
        <div class="border"></div>
        <van-field
          label="手机号"
          :border='false'
          readonly
          :value='information.phone'
          icon='question'
          @click-icon="$toast('手机号不可更改')"
        />
        <div class="border"></div>
        <van-field
          label="性别"
          :border='false'
          v-model="information.gender"
          readonly
          @click="showSexActionsheet = true"
        />
        <div class="border"></div>
        <van-field
          label="生日"
          :border='false'
          v-model="information.birthday"
          readonly
          @click="showBirPopup = true"
          placeholder="请选择"
        />
        <div class="border"></div>
        <van-field
          label="个人简介"
          v-model="information.bio"
          clearable
          type="textarea"
          placeholder="这家伙什么也没说"
          rows="3"
          autosize
        />
      </van-cell-group>
      <div class="border"></div>
      <!-- 性别部分 actionsheet -->
      <van-actionsheet
        v-model="showSexActionsheet"
        :actions="sexActions"
        @select='sexSelect'
      />
      <!-- 生日部分 picker 结合 popup使用 -->
      <van-popup v-model="showBirPopup" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :visible-item-count='3'
          @confirm='birPickerConfirm'
          @cancel='showBirPopup = false'
        />
      </van-popup>
      <a class="sumit-btn" @click.prevent='handleModifyClick' href="javascript:;">确认修改</a>
    </div>
  </div>
</template>
<script>
import Scroll from "@/base/scroll/scroll";
import HeaderMain from "@/base/header/header";
import { dateFilter } from "@/assets/js/filters";
import VueCoreImageUpload from "vue-core-image-upload";
import { GET_MY_INFORMATION, POST_MY_INFORMATION } from "@/api";
import {
  handleResponse,
  getLocalStorage,
  calRealLength
} from "@/assets/js/common";
import { Toast } from "vant";

export default {
  data() {
    return {
      information: {},
      showSexActionsheet: false,
      sexActions: [
        {
          name: "保密"
        },
        {
          name: "男"
        },
        {
          name: "女"
        }
      ],
      showBirPopup: false,
      currentDate: new Date()
    };
  },
  created() {
    this.token = getLocalStorage("token", "string");
    this._getInformation();
  },
  components: {
    Scroll,
    HeaderMain,
    VueCoreImageUpload
  },
  methods: {
    // 生日 picker 组件点击确认按钮事件
    birPickerConfirm(time) {
      this.information.birthday = dateFilter(time, "YY-MM-DD");
      this.showBirPopup = false;
    },
    // 性别 弹出层 选中后事件
    sexSelect(item) {
      this.information.gender = item.name;
      this.showSexActionsheet = false;
    },
    // input框改变选择图片时候触发
    imagechanged(base64) {
      this.information.avatar = base64
    },
    // 上传过程中
    imageuploading() {
      console.log('loading');
    },
    // 上传错误
    errorhandle (err) {
      console.log(err);
      if (err.indexOf('TYPE') >= 0) {
        return Toast('上传图片的类型仅支持png、jpg、jpeg')
      }
      if (err.indexOf('TOO LARGER') >= 0) {
        return Toast('上传图片大小不能超过 3MB')
      }

    },
    // 获取个人信息
    _getInformation() {
      GET_MY_INFORMATION(this.token).then(res => {
        handleResponse(res, () => {
          this.information = res.data;
        });
      });
    },
    // 修改个人信息
    _modifyInformation() {
      POST_MY_INFORMATION(
        this.information.user_id,
        this.information.avatar,
        this.information.nickname,
        this.information.gender,
        this.information.birthday,
        this.information.bio
      ).then(res => {
        handleResponse(res, () => {
          // 修改成功 重新请求一次新的数据
          this._getInformation();
          Toast.success('修改成功');
        });
      });
    },
    // 修改按钮点击事件
    handleModifyClick() {
      if (!this.information.nickname) {
        return Toast("请输入昵称");
      }

      let pattern = new RegExp(
        "[`~^*()|{}\\[\\].<>/~#￥……*（）——|{}【】 ‘；：”“']"
      );
      if (pattern.test(this.information.nickname)) {
        return Toast("存在特殊字符");
      }

      let reallength = calRealLength(this.information.nickname);
      if (reallength < 4 || reallength > 12) {
        return Toast("昵称长度必须在4-12个字符之间");
      }

      this._modifyInformation();
    }
  }
};
</script>
<style lang="less" scoped>
.card-box {
  width: 100%;
  height: 100%;
  .card {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    .avatar {
      height: 80px;
      display: flex;
      padding: 0 15px;
      justify-content: space-between;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
        }
        img {
          width: 60px;
          height: 60px;
          border-radius: 100%;
          margin-left: 20px;
        }
      }
    }
    .sumit-btn {
      display: block;
      width: 80%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      margin: 30px auto 0;
      background-color: #2a2e38;
    }
  }
}
</style>
<style>
.van-cell-group{
  background-color: transparent;
}
.van-cell{
  background-color: transparent;
}
.van-field .van-cell__title {
  color: rgba(255,255,255,.8);
}
.van-field__control{
  color: rgba(255,255,255,.8);
}
</style>



