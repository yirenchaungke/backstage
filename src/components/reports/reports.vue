<template>
  <el-card class="biao">
    <!-- 面包屑 -->
    <my-bread level1="数据统计" level2="数据报表"></my-bread>
    <div id="main"></div>
  </el-card>
</template>

<script>
var echarts = require("echarts");
export default {
    mounted() {
        this.userEchart();
    },
   methods: {
   async userEchart() {
    //    const AUTH_TOKEN = localStorage.getItem("token");
    //   this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        const res = await this.$http.get(`http://47.97.214.102:8888/api/private/v1/reports/type/1`)
      //1.初始化
      var myChart = echarts.init(document.getElementById("main"));
      //2.配置
      let option1=res.data.data
       let option2 = {
    title: {
        text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    }
};

      //3.设置
      let option = {...option1,...option2}
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.biao {
  height: 100%;
}
#main {
  height: 400px;
  margin-top: 20px;
}
</style>
