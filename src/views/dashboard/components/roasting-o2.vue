<template>
  <div class="o2-container">
      <div id="roasting-o2"></div>
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
          console.log(res)
          const data = res.data.data['焙烧CEMS-氧气含量']
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
      const myChart = this.$echarts.init(document.getElementById('roasting-o2'))
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
        //   axisLabel: {
        //     formatter: '{value} °C'
        //   }
        },
        series: [
        //   {
        //     name: 'Highest',
        //     type: 'line',
        //     data: [10, 11, 13, 11, 12, 12, 9],
        //     markPoint: {
        //       data: [
        //         { type: 'max', name: 'Max' },
        //         { type: 'min', name: 'Min' }
        //       ]
        //     },
        //     markLine: {
        //       data: [{ type: 'average', name: 'Avg' }]
        //     }
        //   },
          {
            name: '焙烧CEMS-氧气含量',
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
.o2-container {
  width: 100%;
  height: 100%;
}
#roasting-o2 {
  width: 100%;
  height: 400px;
}
</style>
