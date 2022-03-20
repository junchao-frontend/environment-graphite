<template>
  <div class="tunnel-so2">
      <div id="tunnel-so2"></div>
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
          const data = res.data.data['隧道窑/浸渍CEMS-二氧化硫Zs']
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
      const myChart = this.$echarts.init(document.getElementById('tunnel-so2'))
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
            name: '隧道窑/浸渍CEMS-二氧化硫Zs',
            type: 'line',
            data: this.yData
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
.tunnel-so2 {
  width: 100%;
  height: 100%;
}
#tunnel-so2 {
  width: 100%;
  height: 400px;
}
</style>
