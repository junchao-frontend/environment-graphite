<template>
 <div class="navContainer">
  <div class="header-top">
    <div class="sideIcon">
        <svg-icon
          iconClass="sidebar"
          style="color: inhert; width: 23px; height: 23px;padding: 15px; cursor: pointer"
          @click="drawerClose"
        />
    </div>
    <div class="topbar">
      <el-popover
        trigger="hover"
        placement="bottom"
        transition="zoom-in-top"
        :visible-arrow="false"
        @show="show"
        @hide="hide">
        <div class="popover-menu">
          <div class="menu-avater">
            <el-avatar shape="square" size="large" :src="squareUrl"></el-avatar>
            <div class="avater-text">
              <div>当前角色:</div>
              <div>{{this.getUserInfo.role}}</div>
            </div>
          </div>
          <div class="menu-wrap">
            <div class="menu-item"></div>
            <div class="menu-item" @click="overRouter">
              个人中心
            </div>
            <div @click="logOut()" class="menu-item">
              退出登录
            </div>
          </div>
        </div>
        <div class="header-avatar" slot="reference">
          <el-avatar size="medium" :src="getUserInfo.AvatarUrl"></el-avatar>
          <span>{{this.getUserInfo.account}}</span>
          <i class="el-icon-arrow-down" :class="icon? 'up-show':''"></i>
        </div>
      </el-popover>
      <!-- <div class="bar-item">
        <i style="font-size: 30px" class="iconfont1 icon-gongyi" @click="turnto('processBoard')"></i>
      </div> -->
      <div class="bar-item">
        <i class="iconfont1 icon-dituzhanshi" @click="turnto('overallViex')"></i>
      </div>
      <div class="bar-item">
        <i class="iconfont1 icon-icon_3d" @click="turnto('3D')"></i>
      </div>
      <div class="bar-item">
        <i class="el-icon-s-opportunity" style="font-size: 25px" @click="turnto('overallViex2')"></i>
      </div>
    </div>
  </div>
  <el-tabs @tab-click="tabClick" v-model="editableTabsValue" type="card" :closable ="closable" @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :name="item.name"
    >
      <span slot="label"><i v-if="item.icon" class="tabIcon" :class="item.icon || ''"></i><div v-else class="tabIconN"></div> {{item.title}}</span>
    </el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
export default {
  components: {},
  data () {
    return {
      icon: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  },
  computed: {
    ...mapGetters({
      getEditableTabsValue: 'getEditableTabsValue',
      editableTabs: 'getEditableTabs',
      getUserInfo: 'getUserInfo'
    }),
    closable () {
      if (this.editableTabs.length === 1) {
        return false
      } else {
        return true
      }
    },
    editableTabsValue: {
      get () {
        return this.getEditableTabsValue
      },
      set (newData) {
        // console.log(newData)
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    ...mapMutations({
      editValue: 'EDIT_EDITABLETABSVALUE',
      SET_EDITABLETABS: 'SET_EDITABLETABS'
    }),
    logOut () {
      this.$router.push({ path: '/login' }).then(() => { window.location.reload() })
      sessionStorage.clear()
      Cookies.remove('token')
    },
    drawerClose () {
      this.$store.commit('changeHandleNavBar')
    },
    show () {
      this.icon = true
    },
    hide () {
      this.icon = false
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    tabClick (tabs) {
      this.$router.push({ path: tabs.name })
    },
    removeTab (targetName) {
      // console.log(this.editableTabs)
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
              this.$router.push({ path: nextTab.name })
            }
          }
        })
      }
      this.editValue(activeName)
      this.SET_EDITABLETABS(tabs.filter(tab => tab.name !== targetName))
    },
    overRouter () {
      if (this.$route.fullPath !== '/personal') {
        this.$router.push('/personal')
      }
    },
    turnto (project) {
      if (this.getUserInfo.token) {
        if (project === '3D') {
          window.open('http://106.52.170.16:8803/#/', '_blank', '')
        } else if (project === 'processBoard') {
          window.open('http://106.52.170.16:8804/#/', '_blank', '')
        } else if (project === 'overallViex') {
          // window.location.href = 'http://106.52.170.16:8802/'
          window.open('http://106.52.170.16:8802/', '_blank', '')
        } else if (project === 'overallViex2') {
          // window.location.href = 'http://106.52.170.16:8802/'
          window.open('http://106.52.170.16:8805/', '_blank', '')
        }
      }
    }
  }
}
</script>
<style lang="scss">
.el-popper[x-placement^=bottom]{
  margin-top: 4px !important;
}
.el-avatar>img {
  display: inline-block;
}
.popover-menu{
  .menu-avater{
    border-bottom: thin solid rgb(235, 235, 235);
    .avater-text{
      padding-left: 12px;
      vertical-align:top;
      display: inline-block;
    }
  }
  .menu-wrap{
    .menu-item{
      cursor: pointer;
        padding: 8px 12px;
      &:hover{
        background-color: rgb(242, 244, 250);
      }
    }
  }
}
</style>
<style lang="scss" scoped>

.navContainer {
  height: 100%;
  background-color: rgb(246, 246, 246);
}
.header-top{
  height: 50px;
  border-bottom:thin solid rgb(224, 225, 233);
    .sideIcon {
      height: 100%;
      width: 54px;
      box-sizing: border-box;
      float: left;
      background-color: transparent;
    }
}
.el-tabs{
  position: relative;
  z-index: 1999;
  /deep/ .el-tabs__nav{
    border: 0;
  }
  /deep/ .el-tabs__header{
    background: #fff;
    margin: 0;
  }
  /deep/ .el-tabs__content{
    width: 0;
    height: 0;
    display: none;
  }
  /deep/ .el-tabs__item{
    border: 0;
    transition: 0.65s;
    border-right: thin solid rgb(233, 240, 245);
  }
  /deep/ .el-tabs__item:hover {
    color: $primary;
    span [class^="el-icon-"] {
      color: $primary;
    }
  }
  /deep/ .el-tabs__item.is-active{
    position: relative;
    background: #e0e8f8;
    color: $primary;
    & .tabIconN{
      background-color: $primary;
    }
    & .tabIcon{
      color: $primary;
      // background-color: $primary;
    }
  }
}
  .tabIconN{
    transition: 0.65s;
    display: inline-flex;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #dfdfdf;
    margin-right: 4px;
  }
  .tabIcon{
    color:rgb(122, 122, 122);
    display: inline-flex;
  }
  .topbar {
  float: right;
  height: 100%;
  width: auto;
  .el-popover{
    float: right !important;
    width: 50px;
    height: 100%;
  }
  .header-avatar{
    font-size: 14px;
    padding: 0 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    float: right;
    height: 100%;
    transition: background-color 0.2s ease-in-out;
    &:hover{
      background-color: lighten(#2463bb,50%);
    }
    .el-avatar{
      margin-right:12px;
    }
    .el-icon-arrow-down{
      margin-left: 4px;
      font-size: 16px;
      transition: transform .2s ease-in-out;
    }
  }
}
.bar-item{
  box-sizing: border-box;
  padding: 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 50px;
  height: 100%;
  transition: background-color 0.2s ease-in-out;
  &:hover{
    background-color: lighten(#2463bb,50%);
    .iconfont1{
      color: rgb(53, 53, 53);
    }
  }
}
.up-show{
  transform: rotate(180deg);
}
.iconfont1{
  transition: .2s;
  color: #797d83;
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
