<template>
  <el-card class="users_card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="selectRow">
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="inputSelect"
          clearable
          @clear="clear()"
        >
          <el-button slot="append" icon="el-icon-search" @click="select()"></el-button>
        </el-input>
        <el-button type="primary" @click="addUser()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="usersData" min-height="400" border style="width: 100%">
      <el-table-column label="序列" width="60" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建时期">
        <template slot-scope="scope">{{scope.row.create_time | fmdate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="60">
        <!-- 用户状态 -->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change='changeMgState(scope.row)'></el-switch>
        </template>
      </el-table-column>
      <el-table-column  label="操作" width="138">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="showEditUserDia(scope.row)"></el-button>
          <!-- 删除 -->
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="open(scope.row.id)"></el-button>
          <!-- 权限 -->
          <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="form.username" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" show-password>
          <el-input v-model="form.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="userAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="账号" label-width="100px">
          <el-input v-model="form.username" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      //表格数据
      usersData: [],
      //当前页面
      pagenum: 1,
      //显示条数
      pagesize: 5,
      //总条数
      total: 1,
      //添加用户按钮
      dialogFormVisibleAdd:false,
      //编辑用户按钮
      dialogFormVisibleEdit: false,
      form:{
          username:'',
          password:'',
          email:'',
          mobile:'',
          id:''


      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
      //修改用户状态
      async changeMgState(val){
          const res = await this.$http.put(`api/users/${val.id}/state/${val.mg_state}`)
          this.getUserList();
      },
      //修改用户信息
      async editUser(){
          const res = await this.$http.put(`api/users`,this.form.id)
          this.form={}
          this.dialogFormVisibleEdit=false
          this.getUserList();
      },
      //显示修改用户对话框
     async showEditUserDia(val){
          this.form=val
         this.dialogFormVisibleEdit=true
      },
      //删除功能
      open(val) {
        this.$confirm('永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
            const res = await this.$http.delete(`api/users/${val}`)
            this.getUserList();
            console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
            
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //确认添加用户
     async userAdd(){
          const res = await this.$http.post(`api/users`,this.form)
          console.log(res)
          const{meta:{status,msg}}=res.data
          if(status===201){
              this.form={}
              this.dialogFormVisibleAdd=false
              this.getUserList();
              this.$message.success(msg);

          }else{
              this.$message.warning(msg);
          }
      },
      //添加用户
      addUser(){
         this.dialogFormVisibleAdd=true
      },
    //搜索框为空重新加载数据
    clear() {
      this.getUserList();
    },

    //搜索功能
    select() {
      this.getUserList();
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    //当前页
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `api/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      const {
        data: { users, total },
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        //给表格赋值
        this.usersData = users;
        //给total赋值
        this.total = total;
      }
    }
  }
};
</script>

<style scoped>
.users_card {
  height: 100%;
}
.inputSelect {
  width: 300px;
}
.selectRow {
  margin-top: 20px;
}
</style>
