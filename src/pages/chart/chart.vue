<template>
  <div class="chart-wrap">
    <div id="chart" class="chart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: ''
    }
  },
  methods: {
    getData(val) {
      if (typeof val !== 'object') {
        this.$http.send('api/v1/dataruleEchart/getEchart', { echartId: val }).then(res => {
          if (res.code === 200) {
            let options = res.result
            this.renderChart(options)
          }
        })
        this.timer = setInterval(() => {
          this.$http.send('api/v1/dataruleEchart/getEchart', { echartId: val }).then(res => {
            if (res.code === 200) {
              let options = res.result
              this.renderChart(options)
            }
          })
        }, 30000)
      } else {
        let query = JSON.parse(JSON.stringify(val))
        query.dataDimension = query.dataDimension.join(',')
        this.$http.send('api/v1/dataruleEchart/preview', query, 'json').then(res => {
          if (res.code === 200) {
            let options = res.result
            this.renderChart(options)
          }
        })
      }
    },
    getChartData(query) {},
    renderChart(options) {
      let colorList = ['#cd55ff', '#0fc4ff', '#deff00', '#21f48e', '#e63a5e', '#AAAAED']
      let series = []
      let legendData = []
      for (let i = 0; i < options.legend.length; i++) {
        series.push({
          name: options.legend[i],
          type: 'line',
          symbol: 'circle',
          symbolSize: 5,
          smooth: true,
          data: options.seriesData[i]
        })
        legendData.push({
          name: options.legend[i],
          textStyle: {
            color: colorList[i]
          }
        })
      }

      let lineChart = this.$echarts.init(document.getElementById('chart'))
      lineChart.setOption({
        color: colorList,
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: options.echrtName,
          textStyle: {
            color: '#02D4CA'
          },
          top: '15px',
          left: '2%'
        },
        toolbox: {
          color: '#1B84EE',
          top: '10',
          right: '1%',
          feature: {
            dataZoom: {
              yAxisIndex: false,
              iconStyle: {
                borderColor: '#1B84EE'
              }
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: legendData,
          top: '15',
          right: '5%',
          textStyle: {
            fontSize: 12,
            color: '#adfcff'
          }
        },
        xAxis: [
          {
            left: 0,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#376691',
                width: 1
              }
            },
            // 网格线
            splitLine: {
              show: false
            },
            data: options.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#376691',
                width: 1
              }
            },
            // 网格线
            splitLine: {
              show: true,
              lineStyle: {
                color: '#376691',
                width: 1,
                type: 'dashed'
              }
            }
          }
        ],
        series: series
      })
      window.onresize = () => {
        lineChart.resize()
      }
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getData(this.$route.query.id)
    } else {
      this.getData(this.$route.query)
    }
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.chart-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0d1b29;
  z-index: 900;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
