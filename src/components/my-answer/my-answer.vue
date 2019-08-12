<template>
    <div class="my-answer">
        <app-header title="我的回答" />
        <div class="content">
            <div class="content-wrap">
                <scroll>
                    <div class="border"></div>
                    <ul class="list">
                        <li v-for="item in answerList" :key="item.answer_id">
                            <!-- 标题部分 -->
                            <div class="title">
                                <div class="icon">
                                <span v-show="item.ques.extra_state === 2">顶</span>
                                <span v-show="item.ques.extra_state === 1">精</span>
                                </div>
                                <router-link :to="`/ask/details?id=${item.ques.question_id}`">{{ item.ques.title }}</router-link>
                            </div>
                            <div class="desc">
                                <p>我：{{ item.content }}</p>
                            </div>
                            <div class="data">
                              <span>{{ item.answer_time }}</span>
                              <span @click="handleLookComment(item.replys)">查看评论</span>
                            </div>
                        </li>
                    </ul>
                    <van-pagination 
                      v-if="totalPage > 1"
                      v-model="currentPage" 
                      :page-count="totalPage"
                      @change='pageChange'
                      mode="simple" 
                    />
                    <br>
                    <br>
                </scroll>
            </div>
        </div>
        <van-dialog
          v-model="showDialog"
          show-cancel-button
        >
          <h2 class="reply-title">问题评论</h2>
          <ul class="reply-list">
            <li v-for="(item, index) in replysList" :key="item._id">{{ index + 1 }}# {{ item.user_id }}说：{{ item.reply_content }}</li>
          </ul>
        </van-dialog>
    </div>
</template>
<script>
import AppHeader from "@/base/header/header";
import Scroll from "@/base/scroll/scroll";
import {
  GET_MY_QUESTION,
  POST_MY_APPLYBEST,
  POST_MY_APPLYTOP,
  GET_MY_ANSWER
} from "@/api";
import { handleResponse } from "@/assets/js/common";
import { Dialog, Toast } from "vant";

export default {
  data() {
    return {
      currentPage: 1,
      page: 1,
      totalPage: 1,
      answerList: [],
      replysList: [],
      showDialog: false
    };
  },
  components: {
    AppHeader,
    Scroll
  },
  created() {
    this._reqMyAnswer();
  },
  methods: {
    handleLookComment(replys) {
      console.log(replys);
      if (!replys.length) {
        return Dialog.alert({
          title: "温馨提示",
          message: "该回答没有任何评论！"
        });
      }
      this.replysList = replys;
      this.showDialog = true;
    },
    _reqMyAnswer() {
      GET_MY_ANSWER(this.page).then(res => {
        handleResponse(res, () => {
          if (res.data.list && res.data.list.length) {
            this.answerList = res.data.list;
            this.totalPage = res.data.totalPage;
          }
        });
      });
    },
    pageChange(page) {
      this.page = page;
      this.list = [];
      this._reqMyAnswer();
    }
  }
};
</script>
<style lang="less" scope>
.my-answer {
  .van-pagination__item {
    background-color: transparent;
  }
  .van-pagination__page-desc {
    color: #fff;
  }
  .reply-title {
    padding: 15px 0 0;
    color: #666;
    font-size: 16px;
    text-align: center;
  }
  .reply-list {
    color: #666;
    padding: 10px 20px;
    li {
      font-size: 14px;
      color: #999;
    }
    li + li {
      margin-top: 10px;
    }
  }
  .content-wrap {
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    .list {
      padding: 10px 0 40px;
      li {
        padding: 14px 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        height: 20px;
        > a {
          color: #e2b96f;
        }
        .icon {
          margin-right: 0.8rem;
          flex-shrink: 0;
          span {
            font-size: 0.8rem;
            padding: 1px 2px;
          }
          span:first-child {
            color: #ff8d64;
            border: 1px solid #ff8d64;
          }
          span:last-child {
            color: #4ac49d;
            border: 1px solid #4ac49d;
          }
        }
        a {
          display: block;
          white-space: nowrap;
          width: 100%;
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .desc {
        margin-bottom: 1rem;
        p {
          line-height: 24px;
          font-size: 12px;
          /* 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性如下 */
          -webkit-line-clamp: 2;
          /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
          overflow: hidden;
        }
      }
      .data {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>
