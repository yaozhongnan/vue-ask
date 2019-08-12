<template>
  <div class="root-wrap">
    <div class="home">
      <scroll>
        <!-- 轮播图组件 -->
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="item in homeData.slideList" :key="item.slide_id">
            <img :title="item.title" :src="item.src" alt="轮播图">
          </van-swipe-item>
        </van-swipe>
        <!-- 公告部分 -->
        <div class="anno-box pd bg">
          <div>
            <i class="iconfont icon-laba"></i>
            <router-link v-if="homeData.anno" class="title" :to="`/anno/detail/${homeData.anno.anno_id}`">{{ homeData.anno.title }}</router-link>
          </div>
          <router-link class="more" to="/anno">更多</router-link>
        </div>
        <div class="border"></div>
        <!-- 数据概况部分 -->
        <div class="data-box bg">
          <div class="item">
            <span>注册总人数</span>
            <span>{{ homeData.userNum }}<sup>人</sup></span>
          </div>
          <div class="item">
            <span>问答条数</span>
            <span>{{ homeData.quesNum }}<sup>条</sup></span>
          </div>
          <div class="item">
            <span>累计解决问题</span>
            <span>{{ homeData.solveNum }}<sup>个</sup></span>
          </div>
        </div>
        <div class="border mgb"></div>
        <!-- 最新问题部分 -->
        <div class="new-box">
          <div class="head" style="color:#E2B96F;">最新问题</div>
          <div class="border"></div>
          <ul class="list">
            <li v-for="item in homeData.quesList" :key="item.question_id" @click="handleQuesClick(item.question_id)">
              <img :src="item.from.avatar" width="40" height="40" alt="头像">
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description | descFilter }}</p>
              </div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <!-- footer -->
    <app-footer></app-footer>
  </div>

</template>
<script>
import AppHeader from "@/base/header/header";
import AppFooter from "@/base/footer/footer";
import Scroll from "@/base/scroll/scroll";
import { GET_HOMEDATA } from '@/api'
import { handleResponse } from '@/assets/js/common'

export default {
  data() {
    return {
      homeData: {
        anno: {},
        slideList: [],
        quesList: []
      }
    };
  },
  components: {
    AppFooter,
    Scroll
  },
  created () {
    this._reqHomeData()
  },
  filters: {
    descFilter (val) {
      if (val) {
        return val
      } else {
        return '这个家伙没有留下问题描述....'
      }
    }
  },
  methods: {
    handleQuesClick (id) {
      this.$router.push(`/ask/details?id=${id}`)
    },
    _reqHomeData() {
      GET_HOMEDATA().then(res => {
        handleResponse(res, () => {
          this.homeData = res.data
        })
      })
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  position: fixed;
  top: 0;
  bottom: 50px;
  width: 100%;
  .anno-box {
    height: 2.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      overflow: hidden;
      align-items: center;
      i {
        font-size: 18px;
        color: #e2b96f;
      }
    }
    a {
      white-space: nowrap;
    }
    .title {
      text-overflow: ellipsis;
      overflow: hidden;
      padding-left: 0.4rem;
    }
  }
  .data-box {
    display: flex;
    padding: 1rem 0;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.3333333%;
      span:first-child {
        font-size: 0.8rem;
        margin-bottom: 0.6rem;
      }
      span:nth-child(2) {
        color: #00c188;
        margin-bottom: 0.4rem;
      }
      span:last-child {
        font-size: 18px;
        padding: 2px 4px;
        background-color: #1c3233;
        color: #00c188;
      }
      sup {
        font-size: 0.2rem;
      }
    }
    .item:last-child {
      span:nth-child(3) {
        color: #ff8d64;
      }
      span:nth-child(2) {
        color: #ff8d64;
      }
    }
  }
  .new-box {
    .list {
      li {
        padding: 1rem;
        display: flex;
        img {
          flex-shrink: 0;
          margin-right: 0.6rem;
        }
        > div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          overflow: hidden;
          h3 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            opacity: .8;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.van-swipe {
  height: 14rem;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
// 指示器
.van-swipe__indicators {
  .van-swipe__indicator {
    background-color: #fff;
  }
  .van-swipe__indicator--active {
    background-color: #e2b96f;
  }
}
</style>


