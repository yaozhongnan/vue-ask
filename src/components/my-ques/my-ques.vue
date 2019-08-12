<template>
    <div class="my-ques">
        <app-header title="我的问题" />
        <div class="content">
            <div class="content-wrap">
                <scroll>
                    <div class="border"></div>
                    <ul class="list">
                        <li v-for="item in quesList" :key="item.question_id">
                            <!-- 标题部分 -->
                            <div class="title">
                                <div class="icon">
                                <span v-show="item.extra_state === 2">顶</span>
                                <span v-show="item.extra_state === 1">精</span>
                                </div>
                                <router-link :to="`/ask/details?id=${item.question_id}`">{{ item.title }}</router-link>
                            </div>
                            <div class="data">
                                <span>{{ item.create_time }}</span>
                                <div class="handle">
                                    <span @click="handleApplyBest(item.question_id, item.extra_state)">申请精华</span>
                                    <span @click="handleApplyTop(item.question_id, item.extra_state)">申请置顶</span>
                                </div>
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
    </div>
</template>
<script>
import AppHeader from "@/base/header/header";
import Scroll from "@/base/scroll/scroll";
import { GET_MY_QUESTION, POST_MY_APPLYBEST, POST_MY_APPLYTOP } from '@/api'
import { handleResponse } from '@/assets/js/common'
import { Dialog, Toast } from 'vant';

export default {
  data () {
    return {
      currentPage: 1,
      page: 1,
      totalPage: 1,
      quesList: []
    }
  },
  components: {
    AppHeader,
    Scroll
  },
  created () {
    this._reqMyQues()
  },
  methods: {
    _reqMyQues () {
      GET_MY_QUESTION(this.page).then(res => {
        handleResponse(res, () => {
          if (res.data.list && res.data.list.length) {
            this.quesList = res.data.list
            this.totalPage = res.data.totalPage
          }
        })
      })
    },
    _reqApplyBest () {
      POST_MY_APPLYBEST(this.question_id).then(res => {
        handleResponse(res, () => {
          this.list = []
          this._reqMyQues()
          Dialog.alert({
            message: '申请精华成功'
          })
        })
      })
    },
    _reqApplyTop () {
      POST_MY_APPLYTOP(this.question_id).then(res => {
        handleResponse(res, () => {
          this.list = []
          this._reqMyQues()
          Dialog.alert({
            message: '申请置顶成功'
          })
        })
      })
    },
    // 申请精华问题 点击事件
    handleApplyBest (id, state) {
      if (state === 1) {
        return Toast('已是预期状态')
      }
      this.question_id = id
      this._reqApplyBest()
    },
    // 申请置顶问题 点击事件
    handleApplyTop (id, state) {
      if (state === 2) {
        return Toast('已是预期状态')
      }
      this.question_id = id
      this._reqApplyTop()
    },
    pageChange (page) {
      this.page = page
      this.list = []
      this._reqMyQues()
    }
  }
};
</script>
<style lang="less" scope>
.my-ques {
  .van-pagination__item {
    background-color: transparent;
  }
  .van-pagination__page-desc{
    color: #fff;
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
        margin-bottom: 1.4rem;
        height: 20px;
        > a{
          color: #E2B96F;
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
      .data {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .handle{
          span{
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
