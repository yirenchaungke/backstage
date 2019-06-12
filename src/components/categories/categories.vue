<template>
  <el-card class="cat">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 添加按钮 -->
    <el-button type="primary">添加分类</el-button>
    <!-- 分类表格 -->
    <el-table :data="catData" style="width: 100%" height="250">
      <el-table-column prop="name" label="级别" ></el-table-column>
      <el-table-column prop="city" label="是否有效" width="120"></el-table-column>
       <el-table-column prop="name" label="操作" >
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
      catData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
    };
  }
};
</script>

<style scoped>
.cat {
  height: 100%;
}
</style>
