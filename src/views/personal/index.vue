<template>
  <div class="card-table">
    <div style="float: right; z-index: 10">
      <el-button type="primary" icon="el-icon-edit" circle @click="Toedit()" />
    </div>
    <div style="margin-top: 40px; padding: 10px">
      <el-form
        ref="user"
        :model="user"
        label-width="200px"
        class="demo-ruleForm"
        label-position="left"
      >
        <el-form-item label="头像" style="font-weight: bold">
          <!-- <img
            :src="user.AvatarUrl"
            class="avatar"
            width="120px"
            height="120px"
            style="float: left"
          /> -->
           <el-upload
            class="avatar-uploader"
            :action="interfaceUrl"
            :show-file-list="false"
            name="file"
            :http-request="imgUpload">
                <img v-if="user.AvatarUrl !== ''" :src="user.AvatarUrl" height="100px" class="avatar">
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                <el-avatar v-else :size="100" :src="imgSrc"></el-avatar>
            </el-upload>
        </el-form-item>
        <el-form-item label="手机号" style="font-weight: bold">
          <span style="float: left; font-weight: normal">{{ user.phone }}</span>
        </el-form-item>
        <el-form-item label="账号" style="font-weight: bold">
          <span style="float: left; font-weight: normal">{{user.account}}</span>
        </el-form-item>
        <el-form-item label="密码" style="font-weight: bold">
          <el-button type="primary" style="float: left" @click="handleData()"
            >修改密码</el-button
          >
        </el-form-item>
        <el-form-item label="姓名" style="font-weight: bold">
          <span style="float: left; font-weight: normal">{{ user.name }}</span>
        </el-form-item>
        <el-form-item label="性别" style="font-weight: bold">
          <span style="float: left; font-weight: normal">{{ user.sex }}</span>
        </el-form-item>
        <el-form-item label="角色" style="font-weight: bold">
          <span style="float: left; font-weight: normal">{{ user.role }}</span>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="ruleDialog"
      :modal-append-to-body="false"
      width="40%"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input
            type="oldPsw"
            v-model="ruleForm.oldPass"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input
            type="newPsw"
            v-model="ruleForm.newPass"
            :show-password="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
   <el-dialog class="dai" title="修改个人信息" :visible.sync="EditDialog" :modal-append-to-body="false">
      <el-form
        :model="user"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-dynamic">
          <el-form-item label="头像" prop="AvatarUrl">
            <el-upload
            class="avatar-uploader"
            :action="interfaceUrl"
            :show-file-list="true"
            name="file"
            :http-request="imgUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <img v-if="user.AvatarUrl" :src="user.AvatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item class="sexclass" label="性别" prop="sex">
            <el-radio v-model="user.sex" label="男">男</el-radio>
            <el-radio v-model="user.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input type="textarea" v-model="user.account"></el-input>
          </el-form-item>
          <el-form-item class="dialog-footer dfooter">
            <el-button type="primary" @click="submitEditForm()">提交</el-button>
            <el-button @click="cancelForm()">取消</el-button>
          </el-form-item>
      </el-form>
   </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatepsw } from '@/api/auth/personApi.js'
import { updatedAvater, updateUser } from '@/api/auth/userApi.js'
import imgUrl from '@/assets/Img/people.png'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    var validateoldPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('原密码不能为空'))
      } else {
        if (this.ruleForm.checkoldPsw !== '') {
          this.$refs.ruleForm.validateField('checkoldPsw')
        }
        callback()
      }
    }
    var validatenewPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else {
        if (this.ruleForm.checknewPsw !== '') {
          this.$refs.ruleForm.validateField('checknewPsw')
        }
        callback()
      }
    }
    return {
      user: null,
      imgSrc: imgUrl,
      ruleDialog: false,
      EditDialog: false,
      interfaceUrl: 'http://106.52.170.16:9000/',
      ruleForm: {
        account: '',
        oldPass: '',
        newPass: ''
      },
      rules: {
        // 表单验证
        oldPass: [
          { required: true, validator: validateoldPsw, trigger: 'blur' }
        ],
        newPass: [
          { required: true, validator: validatenewPsw, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  watch: {},
  created () {
    this.user = this.userInfo
  },
  mounted () {
    // this.renderAccount()
  },
  methods: {
    // 获取用户信息
    // renderAccount () {
    //   this.user = {
    //     AvatarUrl: this.getUserInfo.AvatarUrl,
    //     roleCode: this.getUserInfo.roleCode,
    //     phone: this.getUserInfo.phone,
    //     account: this.getUserInfo.account,
    //     name: this.getUserInfo.name,
    //     sex: this.getUserInfo.sex,
    //     role: this.getUserInfo.role,
    //     _id: this.getUserInfo._id
    //   }
    //   // console.log('this.user', this.user) // 等登录
    // },
    // 修改密码
    handleData () {
      this.ruleDialog = true
      this.ruleForm = {}
      this.ruleForm.account = this.user.account
    },
    // 重置表单
    resetForm () {
      this.ruleForm = {}
    },
    // 修改用户信息
    // Toedit () {
    //   this.EditDialog = true
    // },
    // 修改密码
    submitForm () {
      this.$confirm('此操作将修改密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          updatepsw(this.ruleForm).then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.$message.success({ message: '修改成功', center: true })
              this.ruleDialog = false
            } else {
              this.$message.error({ message: res.data.message, center: true })
              this.ruleDialog = false
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    cancelForm () {
      this.user = {}
      this.EditDialog = false
    },
    imgUpload (file) {
      console.log('aaaaa', file)
      const formData = new FormData()
      formData.append('file', file.file)
      updatedAvater('avatar', formData).then(res => {
        // console.log('上传成功', res)
        if (res.data.code === 200) {
          this.user.AvatarUrl = res.data.data // 显示
          this.$store.commit('SET_USERINFO', this.user)
          updateUser(this.user).then(res => {
            // console.log('res', res)
          })
        } else {
          this.$message('头像上传失败')
        }
      })
    },
    submitEditForm () {
      console.log('修改的ruleForm', this.user)
      updateUser(this.user).then(res => {
        if (res.data.code === 200) {
          // console.log('修改成功', res)
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          var infos = JSON.parse(sessionStorage.getItem('userInfo'))
          infos.AvatarUrl = this.user.AvatarUrl
          infos.account = this.user.account
          infos.name = this.user.name
          infos.sex = this.user.sex
          infos.phone = this.user.phone
          this.$store.commit('SET_USERINFO', infos)
        }
      })
      this.EditDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
.dai {
  .dfooter {
    margin-left: 60%;
  }
}
.avatar-uploader {
    border: 1px dashed #d9d9d9b0;
    // border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 178px;
    height: 178px;
}
.avatar-uploader:hover {
    border-color: $primary;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
