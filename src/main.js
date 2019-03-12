import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import utils from './utils/index'
// import iView from 'iview';               // 组件按需引用
// import 'iview/dist/styles/iview.css';    // 样式全局引用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts' //Echarts

Vue.use(ElementUI)

Vue.prototype.$echarts = echarts //修改原型链方便调用，全局引入

Vue.prototype.$utils = utils
Vue.prototype.$ajax = axios


new Vue({
  el: '#app',
  router,
  store,//this.$store
  template: '<App/>',
  components: { App }
})


 //阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;


// 自定义键位别名 @keyup.media-play-pause="method"
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  mediaPlayPause: 179,
  "media-play-pause": 179,
  up: [38, 87]
}

// 全局注册过滤器 Vue.filter('my-filter')  for init
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

/**
 ** 再vuex中，深度拷贝一律使用JSON.parse(JSON.stringify(test));
 */
