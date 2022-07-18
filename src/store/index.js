// vue3中创建store实例对象的方法createStore()按需引入
import { createStore } from 'vuex'
import tag from './tag.js'
import user from "./user.js"
//暴露vuex
export default createStore({
    modules:{
        tag,user
    }
})
