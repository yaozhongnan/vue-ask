<template>
  <div class="root-wrap">
    <!-- header -->
    <TabHeader title="搜索"></TabHeader>
    <div class="search">
      <!-- 搜索框 -->
      <div class="search-inp">
        <i class="iconfont icon-icon-1"></i>
        <van-field :border='false' v-model="title" clearable class="inp" placeholder="输入要搜索的问答" />
        <!-- <i class="iconfont icon-guanbi"></i> -->
        <a href="javascript:;" @click.prevent='handleSearch'>搜索</a>
      </div>
      <!-- 热门搜索 -->
      <div class="hot-box">
        <div class="title">热门搜索</div>
        <ul class="list">
          <li @click="handleHotLabelClick(item)" v-for="(item, index) in hotList" :key="index">{{ item }}</li>
        </ul>
      </div>
      <van-popup class="popup" v-model="showPopup" position="right" :overlay="false">
        <header-main path='path' @back='handlePopupBack' title="搜索结果"></header-main>
        <br>
        <div class="title">关键字：{{ title || label }}</div>
        <div class="border"></div>
        <div class="list-box" v-if="questionList.length">
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
        <div v-else style="text-align:center;margin-top:100px;">搜索不到数据</div>
      </van-popup>
    </div>
    <!-- footer -->
    <app-footer :current=2></app-footer>
  </div>
</template>
<script>
import HeaderMain from "@/base/header/header";
import AppFooter from "@/base/footer/footer";
import TabHeader from "@/base/tabHeader/tabHeader";
import Scroll from "@/base/scroll/scroll";
import { Toast } from 'vant';
import { GET_SEARCH } from '@/api'
import { handleResponse } from '@/assets/js/common'

export default {
  data() {
    return {
      title: "",
      showPopup: false,
      questionList: [],
      hotList: ['前端', '后端', '人工智能怎么样', '前框框架', 'vue', 'AI', 'Java', 'PHP是世界上最好的语言'],
      label: ''
    };
  },
  components: {
    HeaderMain,
    AppFooter,
    Scroll,
    TabHeader
  },
  methods: {
    handlePopupBack() {
      this.title = this.label = ''
      this.showPopup = false;
    },
    handleSearch() {
      if (!this.title) {
        return Toast('请输入要搜索的关键词')
      }
      this._reqSearch(this.title)
      this.showPopup = true;
    },
    handleQuesClick (id) {
      this.$router.push(`/ask/details?id=${id}`)
    },
    handleHotLabelClick(title) {
      this._reqSearch(title)
      this.label = title
      this.showPopup = true;
    },
    _reqSearch (title) {
      GET_SEARCH(title).then(res => {
        handleResponse(res, () => {
          this.questionList = res.data
        })
      })
    }
  }
};
</script>
<style lang="less" scoped>
.search {
  .search-inp {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 90%;
    margin: 1rem auto 2rem;
    height: 40px;
    padding: 0 0.5rem;
    background: #333;
    border-radius: 6px;
    .inp {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding-left: 1rem;
      color: rgba(255, 255, 255, 0.6);
    }
    i:first-child {
      font-size: 18px;
    }
  }
  .hot-box {
    margin: 0 1rem 1rem;
    .title {
      line-height: 2.6rem;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #333;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
  .popup {
    width: 100%;
    height: 100%;
    background-color: #20232a;
    .title {
      height: 40px;
      line-height: 40px;
      padding: 0 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
}
</style>
