<template>
  <div>
    <div class="html-wrap">
      <h2 style="margin:0;padding:4vh 6vw">404 Not Found</h2>
      <div class="descript-wrap">
        <h1 style="margin:0;font-size:60px;">It's Empty Here</h1>
        <p>Looks like this currPage can't be found. Maybe it was</p>
        <p>moved or renamed</p>
      </div>
      <!-- <input @click="test" class="goback1" type="button" value="BACK TO HOME"> -->
      <button @click="$router.go(-1)" class="goback" >BACK TO HOME</button>
    </div>
  </div>
</template>
<script>
import '@/mock/right.js'

export default {
  name: 'notfound',
  // render: function (h) {
  //   return h('div', {
  //     style: { width: '100%', height: '100%', background: '#fff', color: '#000', 'text-align': 'center' }
  //   }, [
  //     h('h1',
  //       {
  //         attrs: { class: 'test' },
  //         style: { color: '#000', 'text-align': 'center' }
  //       },
  //       '404'),
  //     h('p', '页面丢失')
  //   ])
  // },
  // props: {

  // }
  data () {
    return {
      values: 20
    }
  },
  watch: {

  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1000px){
    .descript-wrap{
      display: none;
    }
    .svgIcon-404{
    width: 100vw !important;
    left: 0!important;
    }
}
@mixin position($zIndex) {
  z-index: #{$zIndex};
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
}
.svgIcon-404{
  @include position(0);
  width: calc(100vw - 30vw) !important;
  left: 30vw !important;
}
.html-wrap{
  @include position(1999);
  .descript-wrap{
    padding:8vh 0 0 6vw;
    h1{
      letter-spacing: 0.03em;
    }
    p{
      color: lighen(currentColor,60%);
    }
  }
}
.goback{
  margin: 24px 6vw;
  background-color: $primary;
  border: 0;
  cursor: pointer;
  box-shadow: $shadow1;
  border-radius: 2em;
  padding: 1em 2em;
  position: relative;
  overflow: hidden;
  transition: all .1s ease-in-out;
  font-weight: bold;
  &:active{
    background-color: lighten($primary,10%);
    box-shadow: none;
  }
}
.custom-shape-divider-bottom-1638072276 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.custom-shape-divider-bottom-1638072276 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 228px;
}

.custom-shape-divider-bottom-1638072276 .shape-fill {
    fill: #6EB0F3;
}
</style>
