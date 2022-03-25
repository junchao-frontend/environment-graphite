<template>
  <div class="tunnel-no">
      <div id="tunnel-no"></div>
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
          const data = res.data.data['隧道窑/浸渍CEMS-氮氧化物Zs']
          const xData = data.time
          const middleData = []
          xData.forEach(item => {
            middleData.push(item.slice(14, 16))
          })
          this.xData = middleData
          this.yData = data.data
          const cordonData = []
          for (let i = 0; i < data.data.length; i++) {
            cordonData.push('100')
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
      const myChart = this.$echarts.init(document.getElementById('tunnel-no'))
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
            '隧道窑/浸渍CEMS-氮氧化物Zs': true,
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
            name: '隧道窑/浸渍CEMS-氮氧化物Zs',
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
.tunnel-no {
  width: 100%;
  height: 100%;
}
#tunnel-no {
  width: 100%;
  height: 400px;
}
</style>
