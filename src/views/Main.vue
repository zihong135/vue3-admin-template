<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto" style="min-height: 100vh">
        <Aside-menu> </Aside-menu>
      </el-aside>
      <el-container>
        <el-header><Header /></el-header>
        <common-tag></common-tag>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from "../components/common/AsideMenu.vue";
import Header from "../components/common/Header.vue";
import CommonTag from "../components/common/CommonTag.vue";
export default {
  name: "Main",
  components: {
    AsideMenu,
    Header,
    CommonTag,
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background-color: #333;
}

.el-main {
  padding-top: 0;
}
</style>
