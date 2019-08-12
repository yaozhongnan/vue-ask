<template>
  <div class="category">
    <!-- header -->
    <app-header :title="title" path='path' @back='handleGoBack'>
      <!-- <i slot="right" style="color:#E2B96F;font-size: 22px;padding-right:8px;" class="iconfont icon-caidan"></i> -->
      <ask-menu slot="right" />
    </app-header>
    <!-- tab -->
    <div class="tabs">
      <span :class="{ active: state === 0 }" @click="state = 0">待解决问题</span>
      <span :class="{ active: state === 1 }" @click="state = 1">已解决问题</span>
      <div class="line" ref="line"></div>
    </div>
    <div class="list">
      <van-pull-refresh v-model="isLoading" @refresh="_onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check='false'
        @load="_onLoad"
        :offset="10">
          <!-- 数据 -->
          <div class="list-box">
            <ul>
              <li v-for="item in questionList" :key="item.question_id">
                <!-- 标题部分 -->
                <div class="title">
                  <div class="icon">
                    <span v-show="item.extra_state === 2">顶</span>
                    <span v-show="item.extra_state === 1">精</span>
                  </div>
                  <router-link :to="`/ask/details?id=${item.question_id}`">{{ item.title }}</router-link>
                </div>
                <!-- 数据部分 -->
                <div class="data">
                  <div class="left">
                    <img :src="item.from.avatar" alt="头像">
                    <span>{{ item.from.nickname }}</span>
                    <span>|</span>
                    <span>{{ item.create_time }}</span>
                  </div>
                  <div class="right">
                    <i class="iconfont icon-chakan"></i>
                    <span>{{ item.watch_num }}</span>
                    <i class="reply iconfont icon-chakantiezihuifu"></i>
                    <span>{{ item.answer_num }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import AppHeader from "@/base/header/header";
import AskMenu from "@/base/ask-menu/ask-menu";
import { GET_ASK_QEUSBYCATE } from "@/api";
import { handleResponse } from "@/assets/js/common";
import { Toast } from 'vant';

export default {
  data() {
    return {
      title: "",
      state: 0,
      isLoading: false,
      loading: false,
      finished: false,
      questionList: [],
      page: 1,
      totalPage: 1,
      cate_id: 0
    };
  },
  components: {
    AppHeader,
    AskMenu
  },
  created() {
    this.cate_id = this.$route.params.id;
    this._reqQuesList();
  },
  mounted() {
    // 初始化 line
    this._initLine();
  },
  watch: {
    state(val) {
      this._initLine();
      this.page = 1
      this.questionList = []
      this._reqQuesList()
    },
    $route () {
      this.cate_id = this.$route.params.id
      this.page = 1
      this.questionList = []
      this._reqQuesList()
    }
  },
  methods: {
    handleGoBack () {
      this.$router.push('/ask')
    },
    // 请求数据
    _reqQuesList() {
      if (this.page > this.totalPage) {
        this.finished = true
        this.loading = false
        return Toast('没有更多数据了')
      }
      GET_ASK_QEUSBYCATE(this.cate_id, this.state, this.page).then(res => {
        handleResponse(res, () => {
          // 设置 title
          this.title = res.data.cate_name;
          if (res.data.list && res.data.list.length) {
            // 如果 page 大于 1 则进行数组拼接
            if (this.page > 1) {
              this.questionList = this.questionList.concat(res.data.list)
            } else {
              this.questionList = res.data.list;
            }
            // 设置总页数
            this.totalPage = res.data.totalPage;
            
            // 取消加载中样式
            if (this.isLoading) {
              this.isLoading = false
              Toast('刷新成功')
            }
            if (this.loading) {
              this.loading = false
            }
          } else {
            Toast('没有数据')
          }
        });
      });
    },
    // 更新 line 的位置
    _initLine() {
      let line = this.$refs.line;
      let width = document.documentElement.clientWidth;
      if (this.state === 0) {
        line.style.left = width / 4 - 15 + "px";
      }
      if (this.state === 1) {
        line.style.left = (width / 4) * 3 - 15 + "px";
      }
    },
    // 下拉刷新
    _onRefresh() {
      this.isLoading = true
      this.page = 1
      this._reqQuesList()
    },
    // 上啦加载
    _onLoad() {
      this.page ++ 
      this.loading = true
      this._reqQuesList()
    }
  }
};
</script>
<style lang="less">
.category {
  .tabs {
    position: relative;
    height: 44px;
    display: flex;
    span {
      width: 50%;
      height: 100%;
      text-align: center;
      line-height: 44px;
      &.active {
        color: rgb(226, 185, 111);
      }
    }
    .line {
      position: absolute;
      top: 34px;
      left: 0;
      width: 30px;
      height: 3px;
      transition: left 0.3s ease-in-out;
      background-color: rgb(226, 185, 111);
    }
  }
  .ask-menu {
    padding-right: 8px;
  }
  .list {
    position: fixed;
    top: 85px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
    overflow: auto;
    .list-box {
      ul {
        li {
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          .title {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            height: 20px;
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
            align-items: center;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            .left {
              display: flex;
              align-items: center;
              img {
                width: 22px;
                height: 22px;
                border-radius: 100%;
              }
              span {
                margin-left: 6px;
              }
            }
            .right {
              display: flex;
              align-items: center;
              span,
              i {
                margin-left: 6px;
              }
              .reply {
                position: relative;
                top: -1px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

