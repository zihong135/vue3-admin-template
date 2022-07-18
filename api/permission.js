import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
           {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "House",
          url: "home/index.vue",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "Menu",
          url: "mall/index.vue",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "User",
          url: "user/index.vue",
        },
        {
          label: "其他",
          icon: "Location",
          children: [
            {
              path: "/page1",
              name: "PageOne",
              label: "页面1",
              icon: "Setting",
              url: "other/onepage.vue",
            },
            {
              path: "/page2",
              name: "PageTwo",
              label: "页面2",
              icon: "Setting",
              url: "other/twopage.vue",
            },
          ],
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'user' && password === 'user') {
      return {
        code: 20000,
        data: {
          menu: [
           {
          path: "/",
          name: "home",
          label: "首页",
          icon: "House",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "Menu",
          url: "MallManage/MallManage",
        }, 
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}