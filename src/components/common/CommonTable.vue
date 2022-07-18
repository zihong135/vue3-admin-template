<template>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template v-slot="scope">
          <span class="margin-left:10px">
            {{ scope.row[item.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template v-slot="scope">
          <el-button size="small" @click="handleedit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" @click="handledel(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      v-model:currentPage="pageconfig.page"
      :page-size="7"
      layout="prev, pager, next"
      :total="pageconfig.total"
      @current-change="handlepage"
    />
  </div>
</template>
<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    pageconfig: Object,
  },
  methods: {
    handleedit(row) {
      this.$emit("edit", row);
    },
    handledel(row) {
      this.$emit("del", row);
    },
    handlepage(page) {
      console.log(page);
      this.$emit("change", page);
    },
  },
};
</script>
<style lang="less" scoped>
.table {
  height: 490px;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    right: 0;
  }
}
</style>
