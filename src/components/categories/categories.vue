<template>
  <el-card class="cat">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" class="btn">添加分类</el-button>
    <!-- 分类表格 -->
    <el-table :data="catData" style="width: 100%" height="500">
      <el-table-column prop="cat_name" label="分类名称"></el-table-column>
      <el-table-column prop="name" label="级别"></el-table-column>
      <el-table-column prop="city" label="是否有效" width="60"></el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="open(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      catData: [
        
      ]
    };
  },
  created() {
    this.catList()
  },
  methods: {
   async catList(){
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get("http://47.97.214.102:8888/api/private/v1/categories")
      console.log(res.data)
      this.catData=res.data.data
    }
  },
};
</script>

<style scoped>
.cat {
  height: 100%;
}
.btn{margin-top: 20px;}
</style>
