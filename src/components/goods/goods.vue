<template>
  <el-card class="users_card">
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
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
    <el-table :data="usersData" height="450" border style="width: 100%">
      <el-table-column label="序列" width="60" type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_number" label="库存" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="重量" width="120"></el-table-column>
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
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40,50]"
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
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
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
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="i.roleName" :value="i.id" v-for="(i,index) in roles" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
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
      pagesize: 10,
      //总条数
      total: 1,
      //添加用户按钮
      dialogFormVisibleAdd: false,
      //编辑用户按钮
      dialogFormVisibleEdit: false,
      //分配角色
      dialogFormVisibleRol: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: ""
      },
      //分配角色
      currRoleId:1,
      roles:[],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //修改角色发送请求
    async setRole(){
      const res = await this.$http.put(`http://47.97.214.102:8888/api/private/v1/goods/${this.form.id}/role`,{rid:this.currRoleId})
      console.log(res)
      if(res.data.meta.status===200){
        this.form={}
        this.$message.success(res.data.meta.msg);
       this.dialogFormVisibleRol = false
      }
    },
    //分配角色
    async showSetUserRoleDIa(val){
      this.form = val
      this.dialogFormVisibleRol = true
      //所有角色id
      const ress = await this.$http.get(`http://47.97.214.102:8888/api/private/v1/roles`)
      console.log(ress.data.data)
      this.roles=ress.data.data
      //获取当前角色是用户角色id
      const res = await this.$http.get(`http://47.97.214.102:8888/api/private/v1/goods/${val.id}`)
      console.log(res.data.data.rid)
    this.currRoleId=res.data.data.rid
    },
    //修改用户状态
    async changeMgState(val) {
      const res = await this.$http.put(
        `http://47.97.214.102:8888/api/private/v1/goods/${val.id}/state/${
          val.mg_state
        }`
      );
    },
    //修改用户信息
    async editUser() {
      const res = await this.$http.put(
        `http://47.97.214.102:8888/api/private/v1/goods/${this.form.id}`,
        this.form
      );
      this.form = {};
      this.dialogFormVisibleEdit = false;
      this.getUserList();
    },
    //显示修改用户对话框
    async showEditUserDia(val) {
      this.form = val;
      this.dialogFormVisibleEdit = true;
    },
    //删除功能
    open(val) {
      this.$confirm("永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(
            `http://47.97.214.102:8888/api/private/v1/goods/${val}`
          );
          this.getUserList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //确认添加用户
    async userAdd() {
      const res = await this.$http.post(
        `http://47.97.214.102:8888/api/private/v1/goods`,
        this.form
      );
      const {
        meta: { status, msg }
      } = res.data;
      if (status === 201) {
        this.form = {};
        this.dialogFormVisibleAdd = false;
        this.getUserList();
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    //添加用户
    addUser() {
      this.dialogFormVisibleAdd = true;
      this.from={}
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
        `http://47.97.214.102:8888/api/private/v1/goods?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      const {
        data: { goods, total },
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        //给表格赋值
        this.usersData = goods;
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

