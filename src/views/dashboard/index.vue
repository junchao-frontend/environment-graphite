<template>
  <div class="line-container">
    <div class="top">
    <div class="card-table card-padding">
      <roastingSo2 />
    </div>
    <div class="card-table card-padding">
      <roastingSmoke  />
    </div>
    <div class="card-table card-padding">
      <roastingNo  />
    </div>
    <div class="card-table card-padding">
      <roastingO2  />
    </div>
    </div>
    <div class="bottom">
      <div class="card-table card-padding">
        <tunnelSo2 />
    </div>
    <div class="card-table card-padding">
        <tunnelSmoke />
    </div>
    <div class="card-table card-padding">
        <tunnelNo />
    </div>
    <div class="card-table card-padding">
        <tunnelO2 />
    </div>
    </div>
  </div>
</template>

<script>
import roastingSo2 from './components/roasting-so2.vue'
import roastingSmoke from './components/roasting-smoke.vue'
import roastingNo from './components/roasting-no.vue'
import roastingO2 from './components/roasting-o2.vue'
import tunnelSo2 from './components/tunnel-so2.vue'
import tunnelNo from './components/tunnel-no.vue'
import tunnelSmoke from './components/tunnel-smoke.vue'
import tunnelO2 from './components/tunnel-o2.vue'
export default {
  name: 'dashborad',
  components: {
    roastingSo2,
    roastingSmoke,
    roastingNo,
    roastingO2,
    tunnelSo2,
    tunnelNo,
    tunnelSmoke,
    tunnelO2
  },
  data () {
    return {}
  },
  computed: {},
  created () {},
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.line-container {
  width: 100%;
  height: 100%;
}
.card-table{
  flex: 1;
}
.top{
  display: flex;
}
.bottom{
  display: flex;
}
.card-padding{
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
