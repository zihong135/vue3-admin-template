<template>
  <el-form
    :model="form"
    ref="form"
    status-icon
    :rules="rules"
    class="login-containor"
    label-width="100px"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        placeholder="请输入用户名"
        autocomplete="off"
        v-model="form.username"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
      class="password"
    >
      <el-input
        type="input"
        placeholder="请输入密码"
        autocomplete="off"
        v-model="form.password"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="confirmlogin" class="login-summit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { login } from "../../../api/data.js";
import Mock from "mockjs";
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      //校验规则
      rules: {
        username: [
          {
            require: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "长度不小于3",
            trigger: "blur",
          },
        ],
        password: {
          require: true,
          message: "请输入密码",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    confirmlogin() {
      login(this.form).then((res) => {
        if (res.data.code === 20000) {
          console.log(res.data);
          //清除菜单
          this.$store.commit("cleanMenu");
          //设置菜单
          this.$store.commit("setMenu", res.data.data.menu);
          //设置token
          this.$store.commit("settoken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      const token = Mock.Random.guid();
      this.$store.commit("settoken", token);
      this.$router.push({ name: "home" });
    },
  },
};
</script>
<style lang="less" scoped>
.login-containor {
  border-radius: 15px;
  //背景延伸至边框外沿
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #eaeaea;
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505450;
}
.login-summit {
  margin: 10px atuo 0 auto;
}
</style>
