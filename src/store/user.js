import cookie from "js-cookie"
export default {
    state:{
        token:""
    },
     mutations:{
         settoken(state,val){
             //存入在state当中
             state.token = val
             cookie.set("token",val)
         },
         gettoken(state){
             //如果没有在cookie当中就从vuex当中获取
            state.token = cookie.get("token") ||state.token
         },
         removetoken(state){
            state.token = ""
            cookie.remove("token")
         }
     }
}