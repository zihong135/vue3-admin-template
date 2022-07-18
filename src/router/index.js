import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect:"/home",
    component: Main,
    children:[
    //   {
    //   path:'/',
    //   name:'home',
    //   component:()=>import ("../views/home/index.vue")
    // },
  //    {
  //         path: "/mall",
  //         name: "mall",
  //         component:()=>import ("../views/mall/index.vue")
  //       },
  //   {
  //   path: '/user',
  //   name: 'user',
  //   component: () => import( "../views/user/index.vue")
  // },
  //           {
  //             path: "/page1",
  //             name: "PageOne",
  //            component:()=>import ("../views/other/onepage.vue"),
  //           },
  //           {
  //             path: "/page2",
  //             name: "PageTwo",
  //             component:()=>import ("../views/other/twopage.vue"),
  //           },
  ],
  },
    {
              path: "/login",
              name: "login",
              component:()=>import ("../views/login/login.vue"),
            },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
