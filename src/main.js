// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import { MessageBox } from 'element-ui';

var axios = require('axios')
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm
// 设置反向代理，前端请求默认发送到 http://localhost:8888/api
axios.defaults.baseURL = 'https://cont8server-3wfthhbena-uc.a.run.app/'
Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(ElementUI)

//钩子函数，访问路由前调用
// router.beforeEach((to, from, next) => {
//   //路由需要认证
//   if (to.meta.requireAuth) {
//     //判断store里是否有token
//     if (store.state.token) {
//       next()
//     } else {
//       next({
//         path: 'login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// }
// )

router.beforeEach((to, from, next) => {
  //此处获取登陆的用户信息，可以按照自己的方法获取，此处暂时用localStorage里面获取
  const userInfo = localStorage.userInfo
  //判断是否存在用户信息、或者该页面是否需要登陆
  if (userInfo || !to.meta.login) {
    //如果能获取到用户信息，说明用户已经登陆了，或者该页面不需要登陆也能进入就直接放行进入该页面
    next()
  } else {
    //否则的跳转到登陆页面，并且带上当前页面的地址，用于登陆后重新跳回来
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath//当前页面的地址
      }
    })
  }
})



new Vue({
  el: '#app',
  router,
  // 注意这里
  store,
  components: { App },
  template: '<App/>'
})
