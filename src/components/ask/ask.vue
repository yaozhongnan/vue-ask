<template>
  <div class="root-wrap">
    <!-- header -->
    <TabHeader title="问答">
      <slot>
        <ask-menu></ask-menu>
      </slot>
    </TabHeader>
    <div class="ask">
      <div class="ask-btn">
        <a href="javascript:;" @click.prevent="handlePublishClick">发表新问题</a>
      </div>
      <!-- 头部导航区域 -->
      <div class="nav" ref="navWrap">
        <ul ref="navContent">
          <li v-for="(item, index) in askNavData" :key="index"><a :class="{active: index === currIndex}" @click.prevent="handleNavClick(item, index)" href="javascript:;">{{ item.name }}</a></li>
        </ul>
      </div>
      <div class="border"></div>
      <br>
      <!-- 上拉加载区域 -->
      <div class="loadmore-box" ref='loadMore'>
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
                    <a @click.prevent="handleQuesClick(item.question_id)" href="javascript:;">{{ item.title }}</a>
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
      <!-- 上拉加载区域  结束-->
    </div>
    <!-- footer -->
    <app-footer :current=1></app-footer>
  </div>
</template>
<script>
import AppFooter from "@/base/footer/footer";
import TabHeader from "@/base/tabHeader/tabHeader";
import AskMenu from '@/base/ask-menu/ask-menu'
import { askNavData } from '@/assets/js/data'
import { GET_ASK_QUESTION } from "@/api";
import { Dialog } from "vant";
import { handleResponse, getLocalStorage } from "@/assets/js/common";
import BScroll from 'better-scroll'
import config from '@/assets/js/config'

export default {
  data() {
    return {
      showPopup: false,
      categoryList: [],
      questionList: [],
      askNavData,
      currIndex: 0,
      page: 1,
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  created() {
    this.token = getLocalStorage("token", "string");
    this._reqQuestion()
  },
  mounted() {
    this._setWidth();
    this._initSlide()
    this._initLoadMore()
  },
  components: {
    AppFooter,
    TabHeader,
    AskMenu
  },
  computed: {
    // 计算 1rem 对应的 font-size 值
    rem () {
      let winWidth = document.documentElement.clientWidth
      if (winWidth < 414) {
        return 14
      } else if (winWidth < 768){
        return 16
      } else if (winWidth < 1024) {
        return 26
      } else {
        return 26
      }
    }
  },
  methods: {
    // 点击问题标题
    handleQuesClick (id) {
      this.$router.push(`/ask/details?id=${id}`)
    },
    // 处理发表问题
    handlePublishClick() {
      if (this.token) {
        this.$router.push("/ask/publish");
      } else {
        Dialog.confirm({
          title: "温馨提示",
          message: "登录后才能发表问题哦，老铁。",
          confirmButtonText: "去登陆"
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            console.log("已关闭");
          });
      }
    },
    // 处理点击导航
    handleNavClick (item, index) {
      this.currIndex = index
      this.page = 1
      this._reqQuestion()
    },
    // 根据状态请求问题
    _reqQuestion () {
      GET_ASK_QUESTION(this.page, this.currIndex).then(res => {
        handleResponse(res, () => {
          if (!res.data.length) {
            this.questionList = []
            return
          }
          // 判断是否还有数据
          if (res.data.length < config.limit) {
            this.finished = true
          }
          this.questionList = res.data
        })
      })
    },
    _setWidth() {
      let ul = this.$refs.navContent;
      this.children = ul.children;
      let width = 0;
      for (let i = 0; i < this.children.length; i++) {
        let w = this.children[i].clientWidth;
        width += w;
      }
      ul.style.width = width + "px";
    },
    _initSlide() {
      this.slide = new BScroll(this.$refs.navWrap, {
        scrollX: true,
        scrollY: false,
        click: true
      });
    },
    _onLoad() {      //上拉加载
      this.page ++
      this.loading = true
      GET_ASK_QUESTION(this.page, this.currIndex).then(res => {
        handleResponse(res, () => {
          this.questionList = this.questionList.concat(res.data)
          this.$toast('加载成功');
          this.loading = false;
          if (res.data.length < config.limit) {
            this.finished = true
          }
        })
      })
    },
    _onRefresh() {       //下拉刷新
      this.isLoading = true;
      this.page = 1
      GET_ASK_QUESTION(this.page, this.currIndex).then(res => {
        handleResponse(res, () => {
          if (!res.data.length) {
            this.questionList = []
            return
          }
          if (res.data.length >= config.limit) {
            this.finished = false
          } else {
            this.finished = true
          }
          this.questionList = res.data
          this.$toast('刷新成功');
          this.isLoading = false;
        })
      })
    },
    _initLoadMore () {
      let winHeight = document.documentElement.clientHeight
      // 设置滚动区域容器的高度
      this.$refs.loadMore.style.height = (winHeight - 43 - 50 - 4.4*this.rem - 50 - 12) + 'px'
    }
  }
};
</script>
<style lang="less" scoped>
.ask {
  .loadmore-box{
    overflow: auto;
  }
  .box {
    overflow: auto;
  }
  position: fixed;
  top: 41px;
  bottom: 50px;
  width: 100%;
  .nav {
    ul {
      display: flex;
      line-height: 50px;
      li {
        padding-right: 1.2rem;
        a {
          white-space: nowrap;
          &.active {
            color: #e7bb70;
            text-decoration: underline;
          }
        }
      }
      li:first-child {
        padding-left: 1rem;
      }
    }
  }
  .ask-btn {
    height: 4.4rem;
    display: flex;
    align-items: center;
    a {
      display: block;
      width: 90%;
      height: 2.8rem;
      margin: 0 auto;
      background-color: #2a2e38;
      text-align: center;
      line-height: 2.8rem;
    }
  }
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
</style>
<style>
.van-dialog__header{
  color: #666;
}
</style>
