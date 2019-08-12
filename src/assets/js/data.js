// 我的 页面相关数据
export const myCellData = [
  {
    title: "个人名片",
    content: "修改",
    to: '/my/card',
    icon: {
      class: "icon-mingpian2",
      color: "#4AC49D"
    }
  },
  {
    title: "登录密码",
    content: "修改",
    to: '/forget',
    icon: {
      class: "icon-suo1",
      color: "#E2B96F"
    }
  },
  {
    title: "我的问题",
    to: '/my/ques',
    icon: {
      class: "icon-wenti",
      color: "#4AC49D"
    }
  },
  {
    title: "我的回答",
    to: '/my/answer',
    icon: {
      class: "icon-wenjuandaan",
      color: "#E2B96F"
    }
  },
  {
    title: "我的评论",
    to: '/my/reply',
    icon: {
      class: "icon-pinglun",
      color: "#186EFE"
    }
  }
]

// 问答首页 - 横向导航数据
export const askNavData = [
  {
    name: '全部',
  },
  {
    name: '精华问题',
    extra_state: 1
  },
  {
    name: '置顶问题',
    extra_state: 2
  },
  {
    name: '已解决问题',
    state: 1
  },
  {
    name: '待解决问题',
    state: 0
  },
]
