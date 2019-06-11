<template>
  <el-card class="params">
    <!-- 面包屑 -->
    <my-bread level1="订单管理" level2="分类参数"></my-bread>
    <!-- 提示 -->
    <el-alert title="只允许为第三级添加分类" type="warning"></el-alert>
    <!-- 级联选择器 -->
    <el-form label-position="left" label-width="80px">
      <el-form-item label="商品分类">
        {{selectedOptions}}
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          v-model="selectedOptions"
          :options="options"
          :props="defaultProp"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- 数据展示 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <!-- 动态参数 -->
        <el-button type="danger">动态参数</el-button>
        <!-- 动态表格 -->
        <el-table :data="arryDyparams" style="width: 100%">
          <el-table-column type="expand" label="展开">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row.attr_vals,tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row.attr_vals)"
                @blur="handleInputConfirm(scope.row.attr_vals)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作" prop="desc">
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
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <!-- 静态参数 -->
        <el-button type="danger">静态参数</el-button>
        <!-- 静态参数 -->
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ],
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      activeName: "1",
      arryDyparams: [],
      //s/////
      dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
    };
  },
  created() {
    this.getGoodscate();
  },
  methods: {
    //数据展示
    handleClick() {},
    async getGoodscate() {
      const res = await this.$http.get(
        `http://47.97.214.102:8888/api/private/v1/categories?type=3`
      );
      this.options = res.data.data;
    },
    //级联选择器绑的数据
    async handleChange() {
      if (this.selectedOptions.length === 3) {
        //获取动态参数
        const res = await this.$http.get(
          `http://47.97.214.102:8888/api/private/v1/categories/${
            this.selectedOptions[2]
          }/attributes?sel=many`
        );
        this.arryDyparams = res.data.data;
          this.arryDyparams.forEach(item =>{
              item.attr_vals = item.arr_vals.length === 0 ? [] : item.arrt_vals.trim().split(",")})
        console.log(this.arryDyparams);
      }
     
      

    },
    //动态添加标签
     handleClose(attr_vals,tag) {
        this.attr_vals.splice(this.attr_vals.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm(attr_vals) {
        let inputValue = this.inputValue;
        if (inputValue) {
          attr_vals.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
  }
};
</script>

<style scoped>
.params {
  height: 100%;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
