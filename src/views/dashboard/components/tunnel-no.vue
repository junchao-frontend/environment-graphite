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
          const data = res.data.data['隧道窑/浸渍CEMS-氮氧化物Zs']
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
          top: '5%'
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
            data: this.yData
            // markPoint: {
            //   data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            // },
            // markLine: {
            //   data: [
            //     { type: 'average', name: 'Avg' },
            //     [
            //       {
            //         symbol: 'none',
            //         x: '90%',
            //         yAxis: 'max'
            //       },
            //       {
            //         symbol: 'circle',
            //         label: {
            //           position: 'start',
            //           formatter: 'Max'
            //         },
            //         type: 'max',
            //         name: '最高点'
            //       }
            //     ]
            //   ]
            // }
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
