<template>
    <div class="menuContainer">
      <div  v-for="(item,index) in getMap" :key="index" >
          <el-submenu v-if="item.children != undefined" :index="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <menu-component :getMap =item.children></menu-component>
          </el-submenu>
          <el-menu-item v-else :index="item.path" >
            <i :class="item.icon?item.icon:'el-icon-folder'"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
      </div>
    </div>
</template>
<script>

export default {
  name: 'menuComponent',
  data () {
    return {
    }
  },
  props: ['getMap']
}
</script>
