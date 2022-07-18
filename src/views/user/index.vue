<template>
  <div class="user">
    <el-dialog
      :title="titletype === 'add' ? '添加用户' : '更新用户'"
      v-model="isshow"
    >
      <common-form
        :formLabel="formLabel"
        :form="formData"
        :inline="true"
        ref="form"
      ></common-form>
      <template #footer>
        <el-button @click="isshow = false">取消</el-button>
        <el-button @click="comfirm">确定</el-button>
      </template>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="adduser">新增</el-button>
      <common-form
        :formLabel="searchLabel"
        :form="searchData"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getlist(searchData.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :pageconfig="config"
      @change="getlist"
      @edit="edituser"
      @del="deluser"
    ></common-table>
  </div>
</template>
<script>
import { ElMessage, ElMessageBox } from "element-plus";
import CommonTable from "../../components/common/CommonTable.vue";
import CommonForm from "../../components/common/CommonForm.vue";
import CommonTag from "../../components/common/CommonTag.vue";
import {
  addUserData,
  updateUserData,
  getUserList,
  delUserList,
} from "../../../api/data.js";
import { pa } from "element-plus/es/locale";
export default {
  name: "user",
  data() {
    return {
      //确定弹框是新增还是修改
      titletype: "add",
      //是否可视化
      isshow: false,
      //表单配置
      formLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birthday",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      //表单数据
      formData: {
        name: "",
        addr: "",
        age: "",
        birthday: "",
        sex: "",
      },
      //搜索框配置
      searchLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchData: {
        keyword: "",
      },
      //表格数据
      tableData: [],
      //表格字段名
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      //页码配置
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    //确认是增加还是修改
    comfirm() {
      //确定按钮修改表格数据
      if (this.titletype === "add") {
        addUserData(this.formData).then((res) => {
          console.log(res);
        });
        this.isshow = false;
        this.getlist();
      } else {
        updateUserData(this.formData).then((res) => {
          console.log(res);
          this.isshow = false;
          this.getlist();
        });
      }
    },
    //新增用户信息
    adduser() {
      this.isshow = true;
      this.titletype = "add";
      //防止修改回显
      this.formData = {
        name: "",
        addr: "",
        age: "",
        birthday: "",
        sex: "",
      };
    },
    //获取表格数据,由于是mock自动生成这里不需要传入page
    getlist(page = 1, name = "") {
      console.log(typeof page != "number");
      if (typeof page != "number") {
        name = page;
        page = 1;
      } else {
        this.config.page = page;
      }
      getUserList({ page: this.config.page, name: name }).then((res) => {
        console.log(res);
        this.tableData = res.data.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          item.birthday = item.birth;
          return item;
        });
        this.config.total = res.data.count;
      });
    },
    //编辑表单
    edituser(row) {
      this.titletype = "edit";
      this.isshow = true;
      this.formData = row;
    },
    //伪删除，数据是没有变化
    deluser(row) {
      ElMessageBox.confirm("此操作将永久删除该数据，是否继续", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        delUserList({ id }).then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        });
        this.getlist();
      });
    },
  },
  created() {
    this.getlist();
  },
  components: {
    CommonForm,
    CommonTag,
    CommonTable,
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
