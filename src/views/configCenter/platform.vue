<template>
  <div class="plat_container">
    <div class="card-table pla_Class">
      <el-form ref="formPlat" :model="formPlat" label-width="80px">
        <el-form-item label="Logo">
          <el-avatar :size="90" :src="formPlat.logo"></el-avatar>
        </el-form-item>
        <el-form-item label="公司名称">
          {{formPlat.companyName}}
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getPlatform } from '@/api/auth/personApi.js'
export default {
  name: 'platform',
  data () {
    return {
      formPlat: {
        logo: '',
        companyName: '',
        _id: ''
      }
    }
  },
  created () {},
  mounted () {
    this.getPlatMessage()
  },
  methods: {
    getPlatMessage () {
      getPlatform().then(res => {
        if (res.data.code === 200) {
          // console.log('平台参数', res.data.data)
          this.formPlat = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin boxs ($height, $width) {
  height: $height;
  width: $width;
}
.plat_container {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  .pla_Class {
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    /deep/ .el-form-item__content {
       margin-left: 150px !important;
       font-size: 1.5rem;
    }
    /deep/ .el-form-item__label {
       font-size: 1rem;
    }
  }
}

</style>
