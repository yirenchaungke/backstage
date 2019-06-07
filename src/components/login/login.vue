<template>
  <div class="login">
    <!-- 登录框 -->
    <el-form class="l_from" label-position="top" label-width="80px" :model="formData">
      <h2 class="l_h2">一人创客电商后台</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" show-password></el-input>
      </el-form-item>
      <el-button type="primary" class="l_btn" @click="login()">立即登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    //登录请求函数
    async login() {
      const res = await this.$http.post("api/login", this.formData);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$router.push({ name: "home" });
        this.$message.success(msg);
        localStorage.setItem("token", data.token);
        this.formData={}
      } else {
        this.$message.warning(msg);
      }
      //验证成功提示成功
      //成功后跳转home首页
      //失败提示失败的提示
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.l_h2 {
  text-align: center;
  margin-bottom: 10px;
  color: #324152;
}
.l_from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 8px;
}
.login .l_btn {
  width: 100%;
}
</style>
