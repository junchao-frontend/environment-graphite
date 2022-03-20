<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  watch: {

  },
  computed: {

  },
  mounted () {
    window.document.documentElement.setAttribute('data-theme', 'normal')
  }
}
</script>
<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  overflow: hidden;
}

</style>
