import ajax from './ajax'

const BASE_URL = 'http://47.99.74.241:5000'
// const BASE_URL = 'http://localhost:5000'

// get - 首页 - 接口
export const GET_HOMEDATA = () => ajax(BASE_URL + '/home')

// post - 注册接口
export const POST_REGISTER = (nickname, phone, password) => ajax(BASE_URL + '/user/register', {
  nickname,
  phone,
  password
}, 'post')

// post - 登录接口
export const POST_LOGIN = (phone, password) => ajax(BASE_URL + '/user/login', {
  phone,
  password
}, 'post')

// get - 退出登录接口
export const GET_EXIT = (token) => ajax(BASE_URL + '/user/exit', {
  token
})

// post - 修改密码接口
export const POST_MODIFY_PASSWORD = (phone, password) => ajax(BASE_URL + '/user/modifypassword', {
  phone,
  password
}, 'post')

// 我的 相关接口 start -------------------------------------------------------------------------------------------

// 我的 - get - 首页
export const GET_MY_INDEX = (token) => ajax(BASE_URL + '/my/index', {
  token
})

// 我的 - get - 个人资料
export const GET_MY_INFORMATION = (token) => ajax(BASE_URL + '/my/information', {
  token
})

// 我的 - post - 个人资料
export const POST_MY_INFORMATION = (user_id, avatar, nickname, gender, birthday, bio) => ajax(BASE_URL + '/my/information', {
  user_id,
  avatar,
  nickname,
  gender,
  birthday,
  bio
}, 'post')

// 我的 - get - 我的问题
export const GET_MY_QUESTION = (page) => ajax(BASE_URL + '/my/question', {
  page
})

// 我的 - post - 申请精华
export const POST_MY_APPLYBEST = (question_id) => ajax(BASE_URL + '/my/applybest', {
  question_id
}, 'post')

// 我的 - post - 申请置顶
export const POST_MY_APPLYTOP = (question_id) => ajax(BASE_URL + '/my/applytop', {
  question_id
}, 'post')

// 我的 - get - 我的问题
export const GET_MY_ANSWER = (page) => ajax(BASE_URL + '/my/answer', {
  page
})

// 我的 相关接口 end -------------------------------------------------------------------------------------------


// 问答 相关接口 start -------------------------------------------------------------------------------------------

// 问答 - get - 获取问答分类接口
export const GET_ASK_CATEGORY = () => ajax(BASE_URL + '/ask/category')

// 问答 - post - 发表问题接口
export const POST_ASK_PUBLISH = (cate_id, title, description) => ajax(BASE_URL + '/ask/publish', {
  cate_id,
  title,
  description
}, 'post')

// 问答首页根据不同的状态获取问题 - get 
export const GET_ASK_QUESTION = (page, state) => ajax(BASE_URL + '/ask/question', {
  page,
  state
})

//  get - 查看问题详情接口
export const GET_ASK_DETAIL = (question_id) => ajax(BASE_URL + '/ask/detail', {
  question_id
})

//  post - 回答问题接口
export const POST_ASK_ANSWER = (question_id, content) => ajax(BASE_URL + '/ask/answer', {
  question_id,
  content
}, 'post')

//  post - 修改问题接口
export const POST_ASK_MODIFYQUES = (question_id, title, description) => ajax(BASE_URL + '/ask/modify_ques', {
  question_id,
  title,
  description
}, 'post')

//  post - 修改回答接口
export const POST_ASK_MODIFYANSWER = (answer_id, content) => ajax(BASE_URL + '/ask/modify_answer', {
  answer_id, content
}, 'post')

//  get - 采纳回答接口
export const GET_ASK_ADOPT = (answer_id, question_id) => ajax(BASE_URL + '/ask/adopt', {
  answer_id,
  question_id
})

// post - 回复接口
export const POST_ASK_REPLY = (answer_id, reply_content) => ajax(BASE_URL + '/ask/reply', {
  answer_id, 
  reply_content
}, 'post')

// post - 查看数量 +1 接口
export const POST_ASK_WATCHNUM = (question_id) => ajax(BASE_URL + '/ask/watchnum', {
  question_id
}, 'post')

// get - 获取问题分类下的问题 接口
export const GET_ASK_QEUSBYCATE = (cate_id, state, page) => ajax(BASE_URL + '/ask/quesbycate', {
  cate_id,
  state,
  page
})

// 问答 相关接口 end -------------------------------------------------------------------------------------------

// 公告 相关接口 start -------------------------------------------------------------------------------------------

// get - 获取公告列表 接口
export const GET_ANNO_LIST = () => ajax(BASE_URL + '/anno/list')

// get - 获取公告详情 接口
export const GET_ANNO_DETAIL = (anno_id) => ajax(BASE_URL + '/anno/detail', {
  anno_id
})

// post - 增加公告阅读数量 接口
export const POST_ANNO_ADDWATCHNUM = (anno_id) => ajax(BASE_URL + '/anno/addwatchnum', {
  anno_id
}, 'post')

// 公告 相关接口  end -------------------------------------------------------------------------------------------


// 搜索接口
export const GET_SEARCH = (title) => ajax(BASE_URL + '/home/search', {
  title
})