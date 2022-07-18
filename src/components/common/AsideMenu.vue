<template>
  <el-menu
    default-active="/"
    active-text-color="#ffd04b"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理模板" }}</h3>
    <el-menu-item
      v-for="item of nochildren"
      :key="item.name"
      :index="item.path + ''"
      @click="gorouter(item)"
    >
      <component
        :is="item.icon"
        style="width: 20px; margin-right: 5px"
      ></component>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <el-sub-menu
      v-for="item in haschildren"
      :key="item.name"
      :index="item.path + ''"
    >
      <template #title>
        <component
          :is="item.icon"
          style="width: 20px; margin-right: 5px"
        ></component>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="subItem in item.children"
        :key="subItem.name"
        @click="gorouter(subItem)"
      >
        <el-menu-item :index="subItem.path + ''">
          <component
            :is="subItem.icon"
            style="width: 20px; margin-right: 5px"
          ></component
          >{{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
import { User, Menu, Location, Setting, House } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      //模拟收到后端的资源菜单数据
      // menu: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "House",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "Menu",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "User",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其他",
      //     icon: "Location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "PageOne",
      //         label: "页面1",
      //         icon: "Setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "PageTwo",
      //         label: "页面2",
      //         icon: "Setting",
      //         url: "Other/PageTwo",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  components: {
    User,
    Menu,
    Location,
    Setting,
    House,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    gorouter(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit(`selectMenu`, item);
    },
  },
  computed: {
    nochildren() {
      //返回没有子菜单的
      return this.asyncmenu.filter((item) => !item.children);
    },
    haschildren() {
      return this.asyncmenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tag.isCollapse;
    },
    asyncmenu() {
      return this.$store.state.tag.menu;
    },
  },
};
</script>
