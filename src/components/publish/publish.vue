<template>
  <div class="publish">
    <header-main title='发表问题'></header-main>
    <br>
    <van-cell-group
      :border='false'>
      <van-field
        label="分类"
        :border='false'
        clearable
        v-model="category.name"
        readonly
        placeholder="请选择"
        @click="show = true"
      />
      <div class="border"></div>
      <van-field
        label="标题"
        clearable
        v-model="title"
        :border='false'
        placeholder="请输入问题的标题"
      />
      <div class="border"></div>
      <van-field
        label="描述"
        type="textarea"
        :border='false'
        clearable
        v-model="desc"
        placeholder="请输入问题的描述"
        rows="4"
        autosize
      />
    </van-cell-group>
    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select='handleSelect'
    />
    <div class="border"></div>
    <a href="javascript;;" class="submit-btn" @click.prevent='handleSubmitClick'>确认发表</a>
  </div>
</template>
<script>
import HeaderMain from "@/base/header/header";
import { Toast } from "vant";
import { handleResponse } from "@/assets/js/common";
import { GET_ASK_CATEGORY, POST_ASK_PUBLISH } from "@/api";

export default {
  data() {
    return {
      category: {
        name: "",
        id: 0
      },
      title: "",
      desc: "",
      show: false,
      actions: []
    };
  },
  components: {
    HeaderMain
  },
  created() {
    this._reqCategoryList();
  },
  methods: {
    handleSubmitClick() {
      if (!this.category.name) return Toast("请选择问题分类");
      if (!this.title) return Toast("请输入问题标题");
      if (this.title.length < 4 || this.title.length > 30) {
        return Toast("问题标题长度在4-30个字符之间");
      }
      if (!this.desc) return Toast("请输入问题描述");

      POST_ASK_PUBLISH(this.category.id, this.title, this.desc).then(res => {
        handleResponse(res, () => {
          this.$router.push(`/ask/details?id=${res.data.question_id}`)
        });
      });
    },
    handleSelect(item) {
      this.category = item;
      this.show = false;
    },
    _reqCategoryList() {
      GET_ASK_CATEGORY().then(res => {
        handleResponse(res, () => {
          res.data.forEach(item => {
            let val = {
              name: item.cate_name,
              id: item.cate_id
            };
            this.actions.push(val);
          });
        });
      });
    }
  }
};
</script>
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


