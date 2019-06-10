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
          <h4 class="user"></h4>
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
          :router="true"
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 1-->
          <el-submenu :index="''+i.order" v-for="(i,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{i.authName}}</span>
            </template>
            <el-menu-item-group v-for="(i1,index) in i.children" :key="index">
              <el-menu-item :index="i1.path">
                <i class="el-icon-location"></i>
                <span>{{i1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus:[]
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      //如果没有token直接跳转到login页面
      this.$router.push({ name: "login" });
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    //获取导航数据
    async getMenus(){
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(`http://47.97.214.102:8888/api/private/v1/menus`)
      this.menus=res.data.data
    },
    quit() {
      localStorage.clear();
      this.$router.push({ name: "login" });
      this.$message.success("退出成功");
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
