<template>
  <el-card class="goodsadd">
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="添加商品"></my-bread>
    <!-- 提示 -->
    <el-alert title="添加商品" type="success" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="1"
      finish-status="success"
      simple
      style="margin-top: 20px;margin-bottom:20px;"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!--  -->
    <el-form label-position="top" label-width="80px" :model="form">
      <el-tabs v-model="active" tab-position="left" @tab-click="tabChange()">
        <el-tab-pane name="1" label="基本信息">
          <!-- 基本信息 -->
          <el-form-item label="商品名称:">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格:">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量:">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量:">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            <el-cascader
              expand-trigger="hover"
              v-model="values"
              :options="options"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <div v-if="arrAy.length==0">产品没有参数请继续</div>
          <!-- 商品参数 -->
          <el-form-item :label="i.attr_name" v-for="(i,index) in arrAy" :key="index">
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="i2" v-for="(i2,index) in i.attr_vals" :key="index" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <div v-if="arrAy.length==0">产品没有属性可选请继续</div>
          <!-- 商品属性 -->
          <el-form-item :label="is.attr_name" v-for="(is,index) in arrStaticparams" :key="index">
            <el-input v-model="is.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <!-- 商品图片 -->
          <el-form-item>
            <el-upload
              action="http://47.97.214.102:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSsuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <!-- 商品内容 -->
          <el-form-iten>
            <!-- 富文本编辑器 -->
            <div v-html="form.goods_introduce"></div>
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-iten>
        </el-tab-pane>
        <el-button type="primary" @click="addGoods()">确认添加</el-button>
      </el-tabs>
    </el-form>
    <!--  -->
  </el-card>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      active: "1",
      form: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        goods_id: "",
        id: "",
        pics: [],
        goods_cat: "",
        attrs: []
      },
      // 层级下拉框的数据源
      values: [],
      options: [],
      defaultProp: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      checked1: [],
      // 动态数组
      arrAy: [],
      checkList: [],
      arrStaticparams: [],
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  methods: {
    //图片上传
    handlePreview(file) {},
    handleRemove(file) {
      let Index = this.form.pics.findIndex(item => {
        return item.pic === file.response.data.tmp_path;
      });
      this.form.pics.splice(Index, 1);
    },
    handleSsuccess(file) {
      this.form.pics.push({ pic: file.data.tmp_path });
      // this.tmp_path
    },
    //点击不通tab触发
    async tabChange() {
      //点击第二个并且三级分类有值
      if (this.active == "2") {
        if (this.values.length != 3) {
          //提示必须选择三级分类
          this.$message.warning("请选择商品的三级分类");
          return;
        } else {
          const res = await this.$http.get(
            `http://47.97.214.102:8888/api/private/v1/categories/${
              this.values[2]
            }/attributes?sel=many`
          );

          this.arrAy = res.data.data;
          this.arrAy.forEach(element => {
            element.attr_vals = element.attr_vals.split(",");
          });
        }
      }
      /////
      if (this.active == "3") {
        if (this.values.length != 3) {
          //提示必须选择三级分类
          this.$message.warning("请选择商品的三级分类");
          return;
        } else {
          const res = await this.$http.get(
            `http://47.97.214.102:8888/api/private/v1/categories/${
              this.values[2]
            }/attributes?sel=only`
          );

          this.arrStaticparams = res.data.data;
        }
      }
    },
    //确认上添加商品
    async addGoods() {
      //请求前处理参数赋值
      this.form.goods_cat = this.values.join(",");
      let arr1 = this.arrAy.map(item => {
        return { atttr_id: item.attr_id, attr_value: item.attrvals };
      });
      let arr2 = this.arrStaticparams.map(item => {
        return { atttr_id: item.attr_id, attr_value: item.attrvals };
      });
      this.form.attrs = [...arr1, ...arr2];
      const res = await this.$http.post(
        `http://47.97.214.102:8888/api/private/v1/goods`,
        this.form
      );
      const {
        meta: { msg, status }
      } = res.data;
      if (status == 201) {
        //添加成功提示成功
        this.$message.success(msg);
      } else {
        //失败提示失败的提示
        this.$message.warning(msg);
      }
    },
    handleChange() {},
    async getGoodCate() {
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/categories?type=3`
      );
      this.options = res.data.data;
    }
  },
  created() {
    this.getGoodCate();
  }
};
</script>

<style scoped>
.goodsadd {
  height: 100%;
}

.quill-editor,
.ql-container {
  height: 300px;
}
.quill-editor {
  margin-bottom: 100px;
}
</style>
