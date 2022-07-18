import cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,
        //初始面包屑
        tabList:[{
            path:'/',
            name:'home',
            label:"首页",
            icon:"House"
        }],
        //当前路由
        currentMenu:null,
        //路由菜单
        menu:[]
    },
    mutations:{
        //传入两个参数，一个为state状态，一个是所需要传入的参数
        collapseMenus(state){
            state.isCollapse = !state.isCollapse
        },
        //选择路由菜单
        selectMenu(state,val){
            //如果传入的菜单不是首页
            if(val.name !=='home'){
                //当前页赋值
                state.currentMenu= val;
                //查询是否存入到数组中
                const result = state.tabList.findIndex(item=>item.name ==val.name)
                if(result ===-1){
                    state.tabList.push(val)
                }else{
                    //选中首页
                    state.currentMenu = null
                }
            }
        },
        //面包屑删除
        deleteMenu(state,index){
            state.tabList.splice(index,1)
        },
        //动态传入路由菜单
        setMenu(state,val){
            state.menu = val
            cookie.set("menu",JSON.stringify(val))
        },
        //清空菜单
        cleanMenu(state){
            state.menu = []
            cookie.remove("menu")
        },
        //动态添加路由
        addMenu(state,router){
            //如果没有获取到菜单
            if(!cookie.get("menu")){
                return
            }
            //将菜单数组字符串转为数组
            const menu = JSON.parse(cookie.get("menu"))
            //更新菜单
            state.menu = menu
            let menuArray = []
            menu.forEach(item=>{
                //判断是否有二级路由
                if(item.children){
                    item.children = item.children.map(item=>{
                        //将component属性添加
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                        item.component = () => import(`../views/${item.url}`)
                         menuArray.push(item)
                }
            })
            //添加路由
            menuArray.forEach(item=>{
                router.addRoute('Main',item)   
            })
        }
    }
}
