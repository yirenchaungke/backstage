<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <h3 class="log">一人创客</h3>
        </el-col>
        <el-col :span="15">
          <h1 class="msg">一人创客电商后台管理</h1>
        </el-col>
        <el-col :span="5">
          <h4 class="user">我去</h4>
        </el-col>
        <el-col :span="1">
          <span class="quit" @click="quit()">退出</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 左侧 -->
      <el-aside class="aside" width="202px">
        <el-menu
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 1-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 权限管理 2-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-location"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-location"></i>
                <span>权限列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 商品管理 3-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-location"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-location"></i>
                <span>分类参数</span>
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-location"></i>
                <span>商品分类</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 订单管理 4-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-4">
                <i class="el-icon-location"></i>
                <span>订单列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 数据统计 5-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-5">
                <i class="el-icon-location"></i>
                <span>数据报表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    const token = localStorage.getItem("token")
    if(!token){
      //如果没有token直接跳转到login页面
      this.$router.push({name:"login"})
    }
  },
  methods: {
    quit(){
      localStorage.clear();
      this.$router.push({name:"login"})
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}
.header {
  background-color: #51565c;
}
.aside {
  background-color: #838485;
}
.main {
  background-color: #e9eef3;
}
.log,
.msg,
.user,
.quit {
  text-align: center;
  line-height: 60px;
  color: #e9eef3;
}
</style>
