import Mock from 'mockjs'
import home from './home.js'
import user from './user.js'
import permission from "./permission.js"
Mock.mock('/home/getData',"get",home.getStatisticalData)
Mock.mock('/user/add',"post",user.createUser)
Mock.mock('/user/edit',"post",user.updateUser)
Mock.mock(/\/user\/getuserlist/,'get',user.getUserList)
Mock.mock(/\/user\/del/,'get',user.deleteUser)
Mock.mock(/\/user\/login/,"post",permission.getMenu)