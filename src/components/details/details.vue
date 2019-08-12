<template>
  <div class="details">
    <van-dialog
      class="answer-dialog"
      v-model="showAnswerDialog"
      show-cancel-button
      closeOnClickOverlay
      @cancel='handleAnswerAndReplyCancel'
      @confirm="handleAnswerAndReplyConfirm">
      <van-field
        label="内容"
        type="textarea"
        rows="1"
        v-model="content"
        placeholder="请输入"
      />
    </van-dialog>
    <van-popup class="popup" v-model="showPopup" position="right" :overlay="false">
      <header-main path='path' @back='handlePopupBack' :title="popupTitle"></header-main>
      <br>
      <van-cell-group :border='false'>
        <van-field
          v-if="type === 'question'"
          label="标题"
          clearable
          type="textarea"
          v-model="popTitle"
          rows="2"
          autosize
          :border='false'
        />
        <div v-if="type === 'question'" class="border"></div>
        <van-field
          :label="popupLable"
          clearable
          type="textarea"
          v-model="popContent"
          rows="3"
          :border='false'
          autosize
        />
        <div class="border"></div>
      </van-cell-group>
      <a href="javascript:;" @click="handleSubmitModify" class="submit-btn">提交修改</a>
    </van-popup>
    <header-main title='问题详情'></header-main>
    <div class="scroll-box">
      <scroll>
        <br>
        <!-- 问题部分 -->
        <div class="ques-data">
          <h2>{{ details.title }}</h2>
          <div class="border"></div>
          <div class="data">
            <span>{{ details.from.nickname }} 提问于 {{ details.create_time }}</span>
            <span>{{ details.cate.cate_name }}</span>
          </div>
          <div class="border"></div>
          <p>问题补充：{{ details.description }}</p>
          <a v-if="details.nowUserId === details.user_id" href="javascript:;" @click.prevent="handleModifyQues('question', details.title, details.description)" class="submit-btn">修改问题</a>
          <a v-else href="javascript:;" @click.prevent='handleAnswerClick' class="submit-btn">我来回答</a>
        </div>
        <!-- 最佳答案部分 -->
        <div v-if="bestAnswer.state" class="best-answer">
          <div class="title">最佳答案</div>
          <div class="contents">{{ bestAnswer.content }}</div>
          <div class="infor">
            <img :src="bestAnswer.from[0].avatar" alt="">
            <div>
              <span>回答者：{{ bestAnswer.from[0].nickname }}</span>
              <span>回答时间：{{ bestAnswer.answer_time }}</span>
            </div>
          </div>
        </div>
        <div class="border"></div>
        <!-- 其它答案部分 -->
        <div class="other-answer" v-for="(item, index) in normalAnser" :key="index">
          <div class="title">
            <span>其它回答</span>
            <div>
              <span v-if="details.nowUserId === item.user_id" @click="handleModifyAnswer('answer', item.answer_id, item.content, index)">修改</span>
              <span v-if="details.nowUserId === details.user_id && !bestAnswer.state" @click="handleAdoptClick(index, item)">采纳</span>
              <span @click="handleReplyClick(item.answer_id)">回复</span>
            </div>
          </div>
          <div class="contents">{{ item.content }}</div>
          <div class="infor">
            <img :src="item.from[0].avatar" alt="">
            <span>{{ item.from[0].nickname }}</span>
            <span>|</span>
            <span>{{ item.answer_time }}</span>
          </div>
          <div v-if="item.replys.length" class="reply">
            <p v-for="(reply, index) in item.replys" :key="index">{{ index + 1 }}# {{ reply.user_id }} 回复说：{{ reply.reply_content }}</p>
          </div>
        </div>
        <br>
        <br>
        <br>
      </scroll>
    </div>
  </div>
</template>
<script>
import HeaderMain from "@/base/header/header";
import Scroll from "@/base/scroll/scroll";
import { Toast, Dialog } from "vant";
import { handleResponse } from "@/assets/js/common";
import {
  GET_ASK_DETAIL,
  POST_ASK_ANSWER,
  POST_ASK_MODIFYQUES,
  POST_ASK_MODIFYANSWER,
  GET_ASK_ADOPT,
  POST_ASK_REPLY,
  POST_ASK_WATCHNUM
} from "@/api";

export default {
  data() {
    return {
      showAnswerDialog: false,
      showPopup: false,
      content: "",
      details: {
        from: {},
        cate: {}
      },
      bestAnswer: {},
      normalAnser: [],
      type: "",
      popTitle: "",
      popContent: ""
    };
  },
  components: {
    HeaderMain,
    Scroll
  },
  created() {
    this.question_id = this.$route.query.id;
    this._reqDetail();
    this._reqWatchNum();
  },
  computed: {
    popupTitle() {
      if (this.type === "answer") {
        return "修改回答";
      }
      if (this.type === "question") {
        return "修改问题";
      }
    },
    popupLable() {
      if (this.type === "answer") {
        return "答案";
      }
      if (this.type === "question") {
        return "描述";
      }
    }
  },
  methods: {
    _checkToken () {
      let token = localStorage.getItem("token");
      if (!token) {
        Dialog.confirm({
          title: "温馨提示",
          message: "登录后才能回答问题哦，老铁。",
          confirmButtonText: "去登陆"
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          console.log("已关闭");
        });
        return false
      }
      return true
    },
    handleAnswerAndReplyCancel () {
      this.content = ''
    },
    handleSubmitModify() {
      if (this.type === "question") {
        if (!this.popupTitle) return Toast("请输入标题");
        this._reqModifyQues();
      }
      if (this.type === "answer") {
        if (!this.popContent) return Toast("请输入答案");
        this._reqModifyAnswer();
      }
    },
    handleAdoptClick(index, item) {
      Dialog.confirm({
        title: "温馨提示",
        message: "确认采纳该答案为最佳答案吗？"
      })
        .then(() => {
          this.answer_id = item.answer_id;
          this.index = index;
          this.item = item;
          this._reqAdopy();
        })
        .catch(() => {
          Toast("已取消");
        });
    },
    handlePopupBack() {
      this.showPopup = false;
    },
    // 修改问题和答案
    handleModifyQues(type, title, description) {
      this.type = type;
      this.popTitle = title;
      this.popContent = description;
      this.showPopup = true;
    },
    // 修改答案
    handleModifyAnswer(type, answer_id, content, index) {
      this.type = type;
      this.answer_id = answer_id;
      this.popContent = content;
      this.itemIndex = index;
      this.showPopup = true;
    },
    // 我来回答 按钮
    handleAnswerClick() {
      let flag = this._checkToken()
      if (!flag) {
        return 
      }
      this.showAnswerDialog = true;
      this.isReply = false
    },
    handleAnswerAndReplyConfirm() {
      if (!this.content) {
        this.showAnswerDialog = true;
        return Toast("请输入内容");
      }
      if (this.isReply) {
        this._reqReply();
      } else {
        this._reqAnswer();
      }
    },
    // 回复问题
    handleReplyClick(id) {
      let flag = this._checkToken()
      if (!flag) {
        return 
      }
      this.answer_id = id;
      this.showAnswerDialog = true;
      this.isReply = true;
    },
    _reqDetail() {
      GET_ASK_DETAIL(this.question_id).then(res => {
        handleResponse(res, () => {
          this.details = res.data;
          // 遍历回答数组
          this.normalAnser = [];
          if (res.data.answer.length) {
            res.data.answer.forEach(item => {
              if (item.state === 1) {
                this.bestAnswer = item;
              }
              if (item.state === 0) {
                this.normalAnser.push(item);
              }
            });
          }
        });
      });
    },
    _reqAnswer() {
      POST_ASK_ANSWER(this.question_id, this.content).then(res => {
        handleResponse(res, () => {
          this._reqDetail();
          Toast.success("回答成功");
          this.content = "";
        });
      });
    },
    _reqModifyQues() {
      POST_ASK_MODIFYQUES(
        this.question_id,
        this.popTitle,
        this.popContent
      ).then(res => {
        handleResponse(res, () => {
          this.details.title = this.popTitle;
          this.details.description = this.popContent;
          this.showPopup = false;
          Toast.success("修改成功");
        });
      });
    },
    _reqModifyAnswer() {
      POST_ASK_MODIFYANSWER(this.answer_id, this.popContent).then(res => {
        handleResponse(res, () => {
          this.normalAnser[this.itemIndex].content = this.popContent;
          this.showPopup = false;
          Toast.success("修改成功");
        });
      });
    },
    _reqAdopy() {
      GET_ASK_ADOPT(this.answer_id, this.question_id).then(res => {
        handleResponse(res, () => {
          this._reqDetail();
          Toast.success("修改成功");
        });
      });
    },
    _reqReply() {
      POST_ASK_REPLY(this.answer_id, this.content).then(res => {
        handleResponse(res, () => {
          this._reqDetail();
          Toast.success("回复成功");
          this.content = "";
        });
      });
    },
    // 查看数量 +1 接口
    _reqWatchNum() {
      POST_ASK_WATCHNUM(this.question_id);
    }
  }
};
</script>
<style lang="less" scoped>
.details {
  .popup {
    width: 100%;
    height: 100%;
    background-color: #20232a;
  }
  .scroll-box {
    position: fixed;
    top: 41px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .ques-data {
    padding: 0 1rem;
    margin-bottom: 4rem;
    h2 {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
      line-height: 24px;
      color: #e7bb70;
    }
    .data {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      margin-bottom: 0.8rem;
    }
    p {
      line-height: 20px;
    }
    .border {
      margin-bottom: 0.8rem;
    }
  }
  .best-answer {
    padding: 0 1rem;
    margin-bottom: 2rem;
    .title {
      width: 7rem;
      height: 2.4rem;
      line-height: 2.4rem;
      margin-bottom: 1rem;
      background-color: #e7bb70;
      color: #fff;
      text-align: center;
    }
    .contents {
      line-height: 20px;
      margin-bottom: 1rem;
    }
    .infor {
      display: flex;
      img {
        width: 50px;
        height: 50px;
        margin-right: 1rem;
      }
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        span:last-child {
          font-size: 12px;
        }
      }
    }
  }
  .other-answer {
    padding: 0 1rem;
    padding-bottom: 1.4rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .title {
      display: flex;
      height: 4rem;
      line-height: 4rem;
      justify-content: space-between;
      > span {
        color: #ff8d64;
      }
      > div {
        span {
          margin-left: 1rem;
          color: #4ac49d;
        }
      }
    }
    .contents {
      line-height: 20px;
      margin-bottom: 1rem;
    }
    .infor {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 100%;
      }
      span {
        margin-left: 1rem;
        font-size: 12px;
      }
    }
    .reply {
      padding-top: 1rem;
      font-size: 12px;
      p {
        line-height: 24px;
      }
    }
  }
}
</style>
<style lang="less">
.details {
  .answer-dialog{
    .van-cell__title{
      color: #666;
    }
    .van-field__control{
      color: #666;
    }
  }
  .van-cell {
    color: #333;
  }
  .van-dialog__header {
    padding: 15px 0;
  }
  .popup .van-cell-group {
    background-color: transparent;
  }
  .popup .van-cell {
    background-color: transparent;
  }
  .popup .van-field .van-cell__title {
    color: rgba(255, 255, 255, 0.8);
  }
  .popup .van-field__control {
    color: rgba(255, 255, 255, 0.8);
  }
  .van-dialog__header {
    color: #666;
  }
}
</style>


