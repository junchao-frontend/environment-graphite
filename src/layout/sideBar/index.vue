<template>
  <div class="container control-menu">
    <!-- :text-color="textColor" :active-text-color="activeTextColor" :background-color="backgroundColor"  -->
    <el-menu background-color="rgb(25, 26, 35)" text-color="#fff" :unique-opened="true" :router="true"  :default-active="currentPage" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="handleSiderBar">
      <div class="menu-title" :class="handleSiderBar? 'menu-title-close': ''">
        <div class="svg-icon">
          <img :src="imgSrc" alt="" style="flex-shrink:0;width:26px;height:26px;">
        </div>
        <div class="menu-logo" :class="handleSiderBar? 'close': ''">瑞通炭素</div>
      </div>
      <menu-component :getMap =roleList></menu-component>
    </el-menu>
  </div>
</template>

<script>
import roleList from '@/utils/roles.js'
import imgUrl from '@/assets/Img/logo2.png'
import { mapGetters } from 'vuex'
// console.log(roleList)
export default {
  components: {
  },
  data () {
    return {
      sideBarmap: new Map(),
      // roleList: roleList,
      imgSrc: imgUrl
    }
  },
  computed: {
    collapse () {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if (width < 1100) {
        return false
      } else {
        return this.handleSiderBar
      }
    },
    roleList () {
      return roleList[this.getUserInfo.roleCode]
    },
    ...mapGetters({
      handleSiderBar: 'getNavBarState',
      currentPage: 'getCurrentPage',
      editableTabs: 'getEditableTabs',
      getUserInfo: 'getUserInfo'
    })
  },
  watch: {
  },
  created () {
    console.log(this.getUserInfo)
  },
  mounted () {

  },
  methods: {
    handleOpen () {},
    handleClose () {}
  }
}
</script>
<style lang="scss">
.control-menu{
  height: 100%;
  color: #fff !important;
}
.el-submenu {
  height: 100%;
  color: #fff;
  .el-submenu__title{
    & [class^="el-icon-"] { color: currentColor !important }
    color: currentColor !important;
    &:hover{
      background-color: inherit !important;
    }
  }
}
.el-menu-item:hover,.el-menu-item:focus{
  background: inherit !important;
  @include font_color('')
}
.el-menu-item{
  color: #fff;
  color: currentColor !important;
  & [class^="el-icon-"] { color: currentColor !important }
  & .iconfont { color: currentColor !important }
  &.is-active{
    @include font_color('font_color-menu-active');
    @include background_color('background_color-active');
    // font-weight: bold;
    border-right: currentColor solid 4px !important;
  }
}

</style>
<style lang="scss" scoped>
@import "@/style/themes/_handle.scss";
@mixin scrollClass () {
  &::-webkit-scrollbar {
    z-index: 2000 !important;
    width: 4px; /*滚动条宽度*/
    height: 4px; /*滚动条高度*/
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px; /*滚动条的背景区域的圆角*/
    background-color: rgb(25, 26, 35); /*滚动条的背景颜色*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px; /*滚动条的圆角*/
    background-color: rgba(192, 190, 190, 0.4); /*滚动条的背景颜色*/
  }
}
.menu-title{
  padding-left: 0px;
  height: 64px;
  width: 220px;
  &-close{
    width: 64px;
    padding: 0;
  }
}
.svg-icon{
  width: 64px;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.menu-logo{
  height: 100%;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  display: inline-flex;
  font-size: 20px;
  margin: -1px 0 0 -7px;
  // color: currentColor;
  color: rgb(74,174,163);
  text-align: center;
}
.el-menu{
  border-right: 0;
  height: 100%;
  min-height: 100vh;
  overflow-y: hidden;
}
.el-menu:hover {
    overflow-y: overlay;
    @include scrollClass()
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
.el-menu--collapse /deep/ span,.el-menu--collapse /deep/ .el-submenu__icon-arrow {
  display: none;
}
.close{
  display: none;
}
</style>
