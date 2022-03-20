<template>
 <div class="login" style="text-align:center;">
   <div class="login-box">
      <div class="login-box-title">
        <img src="@/assets/Img/logo.png" alt="">
        <div class="login-box-title-text">瑞通炭素</div>
      </div>
      <el-form :rules="rules" ref="form" :model="form">
          <el-form-item prop="account">
            <el-input v-model="form.account"><template slot="prepend"><i class="el-icon-user loginIcon"></i></template></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input show-password v-model="form.password"><template slot="prepend"><i class="el-icon-lock loginIcon"></i></template></el-input>
          </el-form-item>
      </el-form>
      <div class="login-box-footer">
        <el-button @keydown="keydown()" @click.prevent="submitForm()" type="primary" style="width: 100%;padding:12px 60px;font-size:16px;">登录</el-button>
      </div>
   </div>
    <!-- <el-button @click="login" type="primary" style="margin:20px;">login</el-button> -->
 </div>
</template>

<script>
import { userLogin } from '../../api/login'
import Cookies from 'js-cookie'
import '@/mock/right.js'
export default {
  name: 'login',
  components: {},
  data () {
    var validateUsename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
    }
    return {
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { validator: validateUsename, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  created () {
    var _this = this
    document.addEventListener('keydown', _this.watchEnter)
  },
  mounted () {
    // console.log(this.$http)
  },
  destroyed () {
    // 移除监听回车按键
    var _this = this
    document.removeEventListener('keydown', _this.watchEnter)
  },
  methods: {
    keydown () {
      return false
    },
    submitForm () {
      // console.log('login', this.form)
      const payload = {
        account: this.form.account,
        password: this.form.password
      }
      userLogin(payload).then(res => {
        console.log('登录', res.data)
        if (res.data.code === 200) {
          sessionStorage.setItem('tableTabs', JSON.stringify([]))
          this.$store.commit('SET_USERINFO', res.data.data)
          this.$router.push({ name: 'main' })
          this.$notify({
            title: '提示',
            message: '欢迎,' + res.data.data.name + '!',
            type: 'success'
          })
          Cookies.set('token', res.data.data.token)
          // Cookies.remove('token')
        } else {
          this.$notify({
            title: '提示',
            message: res.data.message,
            type: 'warning'
          })
        }
      })
      // const that = this
      // that.$http.get('http://20211129Mock.com/mode1/login').then(res => {
      //   sessionStorage.setItem('tableTabs', JSON.stringify([]))
      //   this.$store.commit('SET_USERINFO', res.data.data)
      //   this.$router.push({ name: 'main' })
      // })
    },
    login () {
    },
    watchEnter (e) {
      var keyNum = window.event ? e.keyCode : e.which // 获取被按下的键值
      if (keyNum === 13) {
        this.submitForm()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/Img/backg.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-top: 200px;
}
.login-box{
  width:420px;
  // box-shadow: 2px 3px 7px #0003;
  backdrop-filter: blur(20px);
  padding: 40px;
  margin: 0 auto;
  .login-box-title{
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 30px auto;
    img {
      vertical-align: text-top;
      width: 42px;
      height: 42px;
    }
    &-text{
      font-size: 32px;
    }
  }
  &-footer{
    margin-bottom: 12px;
  }
}
.loginIcon{
  font-size: 16px;
}
</style>
