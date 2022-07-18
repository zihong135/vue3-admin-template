<template>
  <div ref="echarts"></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  props: {
    //是否是有横纵轴
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    //显示的横纵数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      //柱状图配置
      xAxisoption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      //饼状图配置
      videooption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
    };
  },
  methods: {
    initChart() {
      //赋值
      this.initChartData();
      //判断echart是否渲染
      if (this.echarts) {
        this.echarts.setOption(this.option);
      } else {
        this.echarts = echarts.init(this.$refs.echarts);
        this.echarts.setOption(this.option);
      }
    },
    //放入数据
    initChartData() {
      if (this.isAxisChart) {
        this.xAxisoption.xAxis.data = this.chartData.xData;
        this.xAxisoption.series = this.chartData.series;
      } else {
        this.videooption.series = this.chartData.series;
      }
    },
  },
  watch: {
    chartData: {
      handler() {
        this.initChart();
      },
      //深度监听能够监听到对象变化
      deep: true,
    },
  },
  computed: {
    //对传入的变量进行判断是那种图
    option() {
      return this.isAxisChart ? this.xAxisoption : this.videooption;
    },
  },
};
</script>
