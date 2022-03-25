<template>
  <div class="so2-container">
      <div id="roasting-so2"></div>
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
      unit: '',
      cordonData: []
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
          const data = res.data.data['焙烧CEMS-二氧化硫Zs']
          const xData = data.time
          const middleData = []
          xData.forEach(item => {
            middleData.push(item.slice(14, 16))
          })
          this.xData = middleData
          this.yData = data.data
          const cordonData = []
          for (let i = 0; i < data.data.length; i++) {
            cordonData.push('35')
          }
          this.cordonData = cordonData
          this.unit = data.unit
          this.initEcharts()
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    initEcharts () {
      const myChart = this.$echarts.init(document.getElementById('roasting-so2'))
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
          top: '5%',
          itemWidth: 20,
          itemHeight: 10,
          selected: {
            // 选中'系列1'
            '焙烧CEMS-二氧化硫Zs': true,
            // 不选中'系列2'
            警戒线: false
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '焙烧CEMS-二氧化硫Zs',
            type: 'line',
            data: this.yData,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            zlevel: 3,
            // markPoint: {
            //   data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            // },
            markLine: {
              symbol: 'none',
              data: [
                { type: 'average', name: 'Avg' }
              ]
            }
          },
          {
            name: '警戒线',
            type: 'line',
            data: this.cordonData,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            zlevel: 3,
            itemStyle: {
              color: '#ff8029'
              // borderColor: "#a3c8d8",
            },
            lineStyle: {
              normal: {
                width: 2,
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
.so2-container {
  width: 100%;
  height: 100%;
}
#roasting-so2 {
  width: 100%;
  height: 400px;
}
</style>
