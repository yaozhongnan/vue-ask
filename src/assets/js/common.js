import {
  Toast,
  Dialog
} from 'vant'

// 对后台响应的数据做出处理
export const handleResponse = function (res, callback) {

  if (res.code === 0) {
    callback()
  }
  if (res.code === -1) {
    Toast(res.msg)
  }
  if (res.code === -999) {
    // 清除 token
    setLocalStorage('token', '', 'string')

    Dialog.confirm({
      title: '温馨提示',
      message: '您的登录已过期',
      confirmButtonText: '去登陆'
    }).then(() => {
      // 跳转登录页面
      window.location.href = `${window.location.origin}/#/login`
    }).catch(() => {
      // 跳转首页
      window.location.href = `${window.location.origin}/#/`
    });
  }
}

// 计算输入的字符长度
export const calRealLength = function (str) {

  if (!str) return

  let reallength = 0
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      reallength += 1
    } else {
      reallength += 2
    }
  }
  return reallength

}

// 向 localstorage 中存入数据  仅支持存字符串与对象格式
export const setLocalStorage = function (key, val, type) {
  if (!type) return
  if (type === 'string') {
    localStorage.setItem(key, val)
  }
  if (type === 'object') {
    localStorage.setItem(key, JSON.stringify(val))
  }

}

// 向 localstorage 中取数据
export const getLocalStorage = function (key, type) {
  if (!type) return
  if (type === 'string') {
    return localStorage.getItem(key)
  }
  if (type === 'object') {
    return JSON.parse(localStorage.getItem(key))
  }

}