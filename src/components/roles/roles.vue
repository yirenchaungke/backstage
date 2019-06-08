<template>
  <el-card class="roles">
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 添加角色 -->
    <el-button type="primary" plain class="r_btn">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="roleslist" min-height="400" border style="width: 100%">
      <el-table-column label="展开" width="60" type="expand">
        <template slot-scope="scope">
          <h4 v-if="scope.row.children.length==0">未分配权限</h4>
          <el-row v-for="(item1, index) in scope.row.children" :key="index">
            <el-col :span="4">
              <el-tag @close="delRifht(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, index) in item1.children" :key="index">
                <el-col :span="4">
                  <el-tag
                    @close="delRifht(scope.row,item2.id)"
                    closable
                    type="info"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="delRifht(scope.row,item3.id)"
                    closable
                    v-for="(item3, index) in item2.children"
                    :key="index"
                    type="danger"
                    class="ssy"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="序列" width="60" type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="100"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>

      <el-table-column label="操作" width="138">
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
          <!-- 修改权限 -->
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            @click="showSetRightDia(scope.row)"
          ></el-button>
          <!-- 修改权限对话框 -->
          <el-dialog title="修改权限" :visible.sync="dialogFormVisible">
            <!-- 树形结构 -->
            <!-- getCheckedKeys() -->
            <!-- getHalfCheckedKeys() -->
            <el-tree
              ref="tree"
              :data="treelist"
              show-checkbox
              node-key="id"
              default-expand-all
              :default-checked-keys="arrcheckedkeys"
              :props="defaultProps"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="setRoleRight()">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roleslist: [],
      dialogFormVisible: false,
      treelist: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      arrcheckedkeys: [],
      currRoleId: -1
    };
  },
  created() {
    this.getroleslist();
  },
  methods: {
    //确认修改权限
    async setRoleRight() {
      let arr1 = this.$refs.tree.getCheckedKeys();
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      let arr = [...arr1, ...arr2];
      const res = await this.$http.post(
        `http://47.97.214.102:8888/api/private/v1/roles/${
          this.currRoleId
        }/rights`,
        { rids: arr.join(",") }
      );
      this.getroleslist();
      this.dialogFormVisible = false;
    },
    //修改权限
    async showSetRightDia(val) {
      this.dialogFormVisible = true;
      this.currRoleId = val.id;
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/rights/tree`
      );

      this.treelist = res.data.data;
      var arrtemp1 = [];
      val.children.forEach(element1 => {
        arrtemp1.push(element1.id);
        element1.children.forEach(element2 => {
          arrtemp1.push(element2.id);
          element1.children.forEach(element3 => {
            arrtemp1.push(element3.id);
          });
        });
      });
      this.arrcheckedkeys = arrtemp1;
    },
    //取消权限
    async delRifht(roled, rightd) {
      const res = await this.$http.delete(
        `http://47.97.214.102:8888/api/private/v1/roles/${
          roled.id
        }/rights/${rightd}`
      );
      roled.children = res.data.data;
      this.$message.success(res.data.meta.msg);
    },
    async getroleslist() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/roles`
      );
      this.roleslist = res.data.data;
    }
  }
};
</script>

<style scoped>
.roles {
  height: 100%;
}
.r_btn {
  margin-top: 10px;
  color: rgb(66, 64, 64);
}
.ssy {
  margin-left: 10px;
}
</style>
