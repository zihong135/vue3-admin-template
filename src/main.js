import { createApp,h,getCurrentInstance } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './assets/less/index.less'
import store from "./store/index.js"
import axios from "../api/axios"
import "../api/mock.js"
createApp({
   // 最后把你首屏渲染的App放上去,注意这里的h需要你去vue里解构出来
  render: () => h(App),
  created(){
    console.log("111")
    store.commit("addMenu",router)
  }
}).use(router)
.use(ElementPlus)
.use(store)
.mount('#app')
const app = createApp(App);
//配置axios
app.config.globalProperties.$http=axios;
router.beforeEach((to,from,next)=>{
   store.commit("gettoken")
    //获取token
    let token = store.state.user.token
    //如果token不存在并且要访问不是登录页
    if(!token && to.name !=="login" ){
      next({name:"login"})
    }else if (token && to.name=== "login"){
      next({name:"home"})
    }else{
      //如果没有匹配到当前路径
      if (to.matched.length == 0) { router.push(to.path)}
      next()
    }
})
