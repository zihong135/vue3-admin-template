import axios  from "./axios";
export const getMenu = (param) =>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
}
export const getData = () =>{
    return axios.request({
        url:'/home/getData'
    })
}
export const addUserData =(param) =>{
    return axios.request({
        url:'/user/add',
        method:"post",
        data:param
    })
}
export const updateUserData =(param) =>{
    return axios.request({
        url:'/user/edit',
        method:"post",
        data:param,
    })
}
export const getUserList =(params)=>{
    return axios.request({
        url:"/user/getuserlist",
        method:"get",
       params
    })
}
export const delUserList =(params) =>{
    return axios.request({
        url:"/user/del",
        method:'get',
        params
    })
}
export const login =(params) =>{
    return axios.request({
        url:"/user/login",
        method:"post",
        data:params
    })
}