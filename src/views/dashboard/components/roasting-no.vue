<template>
  <div class="no-container">
      <div id="roasting-no"></div>
  </div>
</template>

<script>
import { getMainCems } from '@/api/dataCenter.js'
export default {
  components: {},
  data () {
    return {
      xData: [],
      yData: [],
      unit: ''
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      getMainCems().then(res => {
        if (res.data.code === 200) {
          const data = res.data.data['焙烧CEMS-氮氧化物Zs']
          const xData = data.time
          const middleData = []
          xData.forEach(item => {
            middleData.push(item.slice(14, 16))
          })
          this.xData = middleData
          this.yData = data.data
          this.unit = data.unit
          this.initEcharts()
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    initEcharts () {
      const myChart = this.$echarts.init(document.getElementById('roasting-no'))
      const option = {
        title: {
          // text: 'Temperature Change in the Coming Week'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '25%',
          bottom: '5%'
        },
        legend: {
          top: '5%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value'
          // axisLabel: {
          //   formatter: '123'
          // }
        },
        series: [
          {
            name: '焙烧CEMS-氮氧化物Zs',
            type: 'line',
            data: this.yData,
            markLine: {
              data: [
                {
                  name: 'Y 轴值为 100 的水平线',
                  yAxis: 0.5
                }
              ],
              lineStyle: {
                color: '#ff8029'
              }
            }
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.no-container {
  width: 100%;
  height: 100%;
}
#roasting-no {
  width: 100%;
  height: 400px;
}
</style>
