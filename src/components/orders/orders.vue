<template>
  <el-card class="oders">
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!-- 表格 -->
    <el-table :data="odersData" style="width: 100%" height="450" border class="biao">
      <el-table-column fixed prop="date" label="序号" width="60" type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="220"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="(scope.row.pay_status==0)">未付款</el-tag>
          <el-tag type="success" v-if="(scope.row.pay_status==1)">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>
      <el-table-column prop="create_time" label="下单时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="orderitems(scope.row.order_id)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-view"
            circle
            size="mini"
            @click="orderitem(scope.row.order_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
    ></el-pagination>
    <!-- 商品详情 -->
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单编号" label-width="100px">
          <el-input v-model="form.order_number" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单价格" label-width="100px">
          <el-input v-model="form.order_price" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否发货" label-width="100px">
          <el-input v-model="form.is_send" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司/个人" label-width="100px">
          <el-input v-model="form.order_fapiao_title" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="下单时间" label-width="100px">
          <el-input v-model="form.create_time" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单id" label-width="100px">
          <el-input v-model="form.order_id" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 修改商品 -->
    <el-dialog title="修改订单" :visible.sync="dialogFormVisiblex">
      <el-form :model="form">
        <el-form-item label="订单编号" label-width="100px">
          <el-input v-model="form.order_number" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单价格" label-width="100px">
          <el-input v-model="form.order_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司/个人" label-width="100px">
          <el-input v-model="form.order_fapiao_title" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisiblex = false">取消</el-button>
        <el-button type="primary" @click="dialogqure()">确认</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: 1,
      dialogFormVisible: false,
      dialogFormVisiblex: false,
      odersData: [],
      totals:1,
      //搜索内容可以为空
        query: "",
        //当前页码
        pagenum: 1,
        //每页条数
        pagesize: 5,
      form: {
        //用户id可以为空
        user_id: "",
        //支付状态可以为空
        pay_status: "",
        //是否发货可以为空
        is_send: "",
        //个人还是公司可以为空
        order_fapiao_title: "",
        //公司名称可以为空
        order_fapiao_company: "",
        //发票内容可以为空
        order_fapiao_content: "",
        //发货地址可以为空
        consignee_addr: "",
        order_number: "",
        order_price: "",
        create_time: "",
        order_id: ""
      }
    };
  },
  created() {
    this.oderList();
  },
  methods: {
    handleSizeChange(val) {
        this.pagesize=val
         this.oderList();
      },
      handleCurrentChange(val) {
        this.pagenum=val
        this.oderList();
      },
    //确认修改
    async dialogqure() {
      this.dialogFormVisiblex = false;
      const res = await this.$http.put(
        `http://47.97.214.102:8888/api/private/v1/orders/${this.form.order_id}`,
        this.form
      );
      this.oderList();
    },
    //显示修改订单
    async orderitems(val) {
      this.dialogFormVisiblex = true;
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/orders/${val}`
      );
      this.form = res.data.data;
    },
    //显示订单详情对话框
    async orderitem(val) {
      this.dialogFormVisible = true;
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/orders/${val}`
      );
      this.form = res.data.data;
    },
    async oderList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.odersData = res.data.data.goods;
      this.totals=res.data.data.total
    }
  }
};
</script>

<style scoped>
.oders {
  height: 100%;
}
.biao{margin-top: 20px;}
</style>