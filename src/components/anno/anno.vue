<template>
  <div class="anno">
    <app-header title="网站公告" />
    <div class="anno-list">
      <scroll>
        <ul>
          <li v-for="item in annoList" :key="item.anno_id">
            <div class="time"><span>{{ item.create_time }}</span></div>
            <div class="info">
              <p>【公告】{{ item.title }}</p>
              <div>
                <router-link :to='`/anno/detail/${item.anno_id}`'>查看详情</router-link>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
import AppHeader from "@/base/header/header";
import Scroll from "@/base/scroll/scroll";
import { GET_ANNO_LIST } from "@/api";
import { handleResponse } from "@/assets/js/common";

export default {
  data() {
    return {
      annoList: []
    };
  },
  components: {
    AppHeader,
    Scroll
  },
  created() {
    this._reqAnnoList();
  },
  methods: {
    _reqAnnoList() {
      GET_ANNO_LIST().then(res => {
        handleResponse(res, () => {
          if (res.data && res.data.length) {
            this.annoList = res.data;
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.anno {
  .anno-list {
    position: fixed;
    top: 41px;
    left: 0;
    right: 0;
    bottom: 0;
    ul {
      padding: 10px 20px;
      li {
        border-bottom: 1px solid rgba(76, 170, 255, 0.3);
        padding: 10px 0;
        .time {
          text-align: center;
          span {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
          }
        }
        .info {
          padding: 6px 10px;
          p:first-child {
            line-height: 24px;
            margin-bottom: 4px;
          }
          > div {
            text-align: right;
            a {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
