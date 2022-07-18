<template>
  <div class="tag">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      size="small"
      :closable="item.name !== 'home'"
      :type="item.type"
      @click="gotopage(item)"
      @close="closepage(item, index)"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: (state) => state.tag.tabList,
    }),
  },
  methods: {
    gotopage(item) {
      this.$router.push({ name: item.name });
    },
    deletemenu(index) {
      this.$store.commit("deleteMenu", index);
    },
    closepage(item, index) {
      //获取已点击路由数量
      let length = this.tags.length - 1;
      if (this.$route.name !== item.name) {
        this.deletemenu(index);
        return;
      }
      //如果关闭最右边的变标签
      else if (length == index) {
        this.deletemenu(index);
        this.$router.push({
          name: this.tags[length - 1].name,
        });
      }
      //中间的被关闭,下一个成为高亮表示
      else {
        this.deletemenu(index);
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tag {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
