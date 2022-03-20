<template>
  <section class="layout">
      <div class="aside-maskLayer" :class="handleSiderBar?'aside-unMaskLayer':''" @click="$store.commit('changeHandleNavBar')"></div>
      <aside class="layout-sideBar">
        <sideBar></sideBar>
      </aside>
      <section class="layout-view" :class="handleSiderBar?'close':''">
        <header class="view-header">
            <nav-bar></nav-bar>
        </header>
        <main class="view-main">
            <!-- <el-button class="btnOne">普 通 按 钮</el-button>
            <el-button type="danger" class="btnTwo">警 示 按 钮</el-button> -->
            <router-view></router-view>
        </main>
      </section>
  </section>
</template>

<script>
import sideBar from './sideBar'
import navBar from './navBar'
import { mapGetters } from 'vuex'

export default {
  components: {
    sideBar,
    navBar
  },
  data () {
    return {
      handleMaskLayer: true
    }
  },
  props: {},
  computed: {
    ...mapGetters({
      handleSiderBar: 'getNavBarState',
      themeType: 'getThemeType'
    })
  },
  watch: {

  },
  created () {},
  mounted () {},
  methods: {

  }
}

</script>

<style lang="scss" scoped>
.close{
  padding-left: 64px;
}
</style>
