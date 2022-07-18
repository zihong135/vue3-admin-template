<template>
  <header>
    <div class="l-content">
      <el-button size="small" plain @click="changeIsCollapse"
        ><el-icon><Menu /></el-icon
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          ><a style="cursor: pointer">{{ item.label }}</a></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="small">
        <img :src="Imgurl" alt="头像" class="user" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" @click="layout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import { mapState } from "vuex";
import { Menu, User } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      Imgurl: require("../../assets/images/user.png"),
    };
  },
  methods: {
    changeIsCollapse() {
      this.$store.commit(`collapseMenus`);
    },
    layout() {
      this.$store.commit("removetoken");
      this.$store.commit("cleanMenu");
      this.$router.push({ name: "login" });
    },
  },
  components: {
    Menu,
    User,
  },
  computed: {
    //mapState 工具函数会将 store 中的 state 映射到局部计算属性中
    ...mapState({
      // 传入字符串 'tags' 等同于 `state => state.tag.tabList`
      tags: (state) => state.tag.tabList,
    }),
  },
};
</script>
<style lang="less" scoped>
.el-breadcrumb__inner a {
  color: #999;
}
a:hover {
  color: blue;
}
header {
  display: flex;
  //横轴元素两边对齐
  justify-content: space-between;
  //纵轴居中
  align-items: center;
  height: 100%;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 15px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
