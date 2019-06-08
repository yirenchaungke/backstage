<template>
  <el-card class="rights">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="权限列表"></my-bread>
    <!-- 表格 -->
    <el-table :data="rightlist" border style="width: 100%" height="400px" class="tbale">
      <el-table-column label="序号" width="80" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
          <template slot-scope="scope">
              <!-- scope.row.levelscope.row.level -->
             <span v-if="scope.row.level==0">一级</span>
             <span v-if="scope.row.level==1">二级</span>
             <span v-if="scope.row.level==2">三级</span>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        rightlist:[]
    };
  },
  created() {
    this.getRightlist();
  },
  methods: {
    async getRightlist() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/rights/list`
      );
      this.rightlist=res.data.data
    }
  }
};
</script>

<style scoped>
.rights {
  height: 100%;
}
.tbale{margin-top: 25px;}
</style>
