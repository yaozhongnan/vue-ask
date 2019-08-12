// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import '@/assets/css/base.css'
import '@/assets/css/iconfont.css'
import { Pagination, Dialog, Collapse, CollapseItem, DatetimePicker, Actionsheet, Picker, Field, Loading, PullRefresh, List, Swipe, SwipeItem, Tab, Tabs, Popup, Cell, CellGroup } from 'vant';
import { dateFilter } from '@/assets/js/filters'

Vue.use(Dialog).use(Pagination).use(Collapse).use(CollapseItem).use(DatetimePicker).use(Actionsheet).use(Picker).use(Field).use(Loading).use(PullRefresh).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Popup).use(Cell).use(CellGroup).use(List);

Vue.config.productionTip = false

Vue.filter('dataFilter', dateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
