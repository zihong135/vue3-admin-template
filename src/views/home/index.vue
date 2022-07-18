<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userinfo">
              <p class="name">admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>2022-02-01</span></p>
            <p>上次登录地点:<span>广东省</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 455px">
          <el-table :data="tableData">
            <el-table-column
              v-for="(item, index) in tableColumn"
              :key="index"
              :prop="index"
              :label="item"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
        <div class="num">
          <el-card
            v-for="items in countData"
            :key="items.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <el-icon class="icon" :style="{ background: items.color }">
              <component :is="items.icon"></component>
            </el-icon>
            <div class="detail">
              <p class="num">{{ items.value }}</p>
              <p class="txt">{{ items.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px">
          <!-- <div id="echarts" style="height: 280px"></div> -->
          <div>
            <Echart :chartData="chartData.order" style="height: 280px" />
          </div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <!-- <div id="userecharts" style="height: 240px"></div> -->
            <div>
              <Echart :chartData="chartData.user" style="height: 240px" />
            </div>
          </el-card>
          <el-card style="height: 260px">
            <!-- <div id="videocharts" style="height: 240px"></div> -->
            <div>
              <Echart
                :chartData="chartData.video"
                :isAxisChart="false"
                style="height: 240px"
              />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import * as echarts from "echarts";
import Echart from "../../components/Echarts.vue";
import { getMenu, getData } from "../../../api/data.js";
import { Lock, Star, Check } from "@element-plus/icons-vue";
export default {
  name: "home",
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [],
      tableColumn: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "Check",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "Star",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "Lock",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "Check",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "Star",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "Check",
          color: "#5ab1ef",
        },
      ],
      chartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      if (res.data.code === 20000) {
        this.tableData = res.data.data.tableData;
        const { orderData, userData, videoData } = res.data.data;
        const xAxis = orderData.date;
        //es6语法获取数组元素key
        let legend = Object.keys(orderData.data[0]);
        let series = [];
        legend.map((v) => {
          series.push({
            name: v,
            type: "line",
            data: orderData.data.map((item) => item[v]),
          });
        });
        //封装后的调用
        this.chartData.order.xData = xAxis;
        this.chartData.order.series = series;
        //  基于准备好的dom，初始化echarts实例  没有封装
        // let myChart = echarts.init(document.getElementById("echarts"));
        //折线图配置
        // let option = {
        //   legend: {
        //     data: legend,
        //   },
        //   xAxis: {
        //     data: xAxis,
        //   },
        //   yAxis: {
        //     type: "value",
        //   },
        //   series,
        //   color: [
        //     "#2ec7c9",
        //     "#b6a2de",
        //     "#5ab1ef",
        //     "#ffb980",
        //     "#d87a80",
        //     "#8d98b3",
        //   ],
        // };
        // myChart.setOption(option);
        // const userlegend = ["新增人数", "活跃人数"];
        //柱状图配置
        // let useroption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //     data: userlegend,
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: userData.map((item) => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: "新增人数",
        //       type: "bar",
        //       data: userData.map((item) => item.new),
        //     },
        //     {
        //       name: "活跃人数",
        //       type: "bar",
        //       data: userData.map((item) => item.active),
        //     },
        //   ],
        // };
        // let userChart = echarts.init(document.getElementById("userecharts"));
        // userChart.setOption(useroption);
        (this.chartData.user.series = {
          name: "新增人数",
          type: "bar",
          data: userData.map((item) => item.new),
        }),
          {
            name: "活跃人数",
            type: "bar",
            data: userData.map((item) => item.active),
          },
          (this.chartData.user.xData = userData.map((item) => item.date));
        //饼图配置
        this.chartData.video.series = { type: "pie", data: videoData };
        // let videooption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [{ type: "pie", data: videoData }],
        // };
        // let videoChart = echarts.init(document.getElementById("videocharts"));
        // videoChart.setOption(videooption);
      }
    });
  },
  components: {
    Lock,
    Star,
    Check,
    Echart,
  },
};
</script>
