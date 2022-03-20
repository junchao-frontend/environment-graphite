<template>
 <div class="user_container">
   <div class="card-search">
      <el-form size="small" :inline="true" label-width="60px" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input size="small" v-model="formInline.searchName" placeholder="请输入用户名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="getRealData">查询</el-button>
        </el-form-item>
      </el-form>
   </div>
   <div class="card-table">
    <div class="btn">
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="handleEditAndCreate('add')">新增</el-button>
    </div>
    <el-table
      :header-cell-style="getRowClass"
      :data="tableData"
      style="width: 100%"
      :row-style="{ fontSize: '14px', height: '10px' }"
      :cell-style="{ padding: '14px', height: '30px' }">
        <el-table-column
            prop="AvatarUrl"
            label="头像"
            >
            <template slot-scope="{ row }">
              <img v-if="row.AvatarUrl !== ''" :src="row.AvatarUrl" height="80px" alt="">
              <el-avatar v-else :src="imgSrc"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column
            prop="account"
            label="账号"
            >
        </el-table-column>
        <el-table-column
            prop="name"
            label="用户名"
            >
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            >
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            >
        </el-table-column>
        <el-table-column
            prop="role"
            label="角色"
            >
            <template slot-scope="{ row }">
                <el-tag type="success">{{row.role.name}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            prop="prop"
            label="操作" >
            <template slot-scope="{ row }">
              <div style="display: flex">
                <el-button class="btnText" size="medium" type="text" icon="el-icon-edit" @click="resetWords(row)">重置密码</el-button>
                <el-button class="btnText" size="medium" type="text" icon="el-icon-edit" @click="handleEditAndCreate('edit', row)">编辑</el-button>
                <el-button class="btnText" size="medium" type="text" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button>
              </div>
            </template>
        </el-table-column>
    </el-table>
    <div
      v-if="tableData.length !== 0"
      class="block"
      style="display: flex; flex-direction: row-reverse; margin-top: 10px">
      <el-pagination
        background
        @size-change="perPage"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_real">
      </el-pagination>
    </div>
   </div>
   <el-dialog class="dai" :title="dialogTitle" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-divider></el-divider>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-dynamic">
          <el-form-item label="头像" prop="AvatarUrl">
            <!-- <el-input v-model="ruleForm.AvatarUrl"></el-input> -->
            <!-- :auto-upload="false"手动上传
            :limit="1" -->
            <el-upload
            class="avatar-uploader"
            :action="interfaceUrl"
            :show-file-list="true"
            name="file"
            :http-request="imgUpload"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
                <img v-if="ruleForm.AvatarUrl" :src="ruleForm.AvatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item class="sexclass" label="性别" prop="sex">
            <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
            <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input type="textarea" v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item v-if="this.operation" label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <!-- multiple filterable allow-create -->
            <el-select
                v-model="ruleForm.role._id"
                clearable>
                  <el-option
                    v-for="item in options"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="dialog-footer dfooter">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="cancelForm()">取消</el-button>
          </el-form-item>
      </el-form>
   </el-dialog>
 </div>
</template>

<script>
//
import { showUserTable, deleteUser, updatedAvater, newUser, updateUser, resetPassword } from '@/api/auth/userApi.js'
import { mapGetters } from 'vuex'
import { showRoleTable } from '@/api/auth/roleApi.js'
import imgUrl from '@/assets/Img/people.png'
export default {
  name: 'user',
  components: {},
  data () {
    return {
      imgSrc: imgUrl,
      perPage: 10,
      page: 1,
      total_real: null,
      formInline: {
        searchName: ''
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请填写用户名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ]
      },
      ruleForm: {
        role: {
          apis: [],
          code: '',
          desc: '',
          name: '',
          _id: ''
        }
      },
      dialogTitle: '',
      dialogTableVisible: false,
      operation: true,
      options: [],
      interfaceUrl: 'http://106.52.170.16:9000/' // 上传服务器的图片地址 图床的
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  created () {},
  mounted () {
    this.getRealData()
    showRoleTable().then(res => {
      this.options = res.data.data.pageData
    })
  },
  methods: {
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #f7fbff;color:black;padding: 15px'
      } else {
        return ''
      }
    },
    getRealData () {
      const para = {
        name: this.formInline.searchName,
        pageSize: this.perPage,
        currPage: this.page
      }
      showUserTable(para).then(res => {
        if (res.data.code === 200) {
          this.loading = false
          console.log('ressddd', res.data)
          this.tableData = res.data.data.pageData || []
          this.total_real = res.data.data.total
        }
      })
    },
    resetWords (row) {
      console.log('sdsdsds', row)
      var rowCopys = JSON.parse(JSON.stringify(row))
      this.$confirm('此操作将重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rowCopys.roleId = row.role._id
        resetPassword(rowCopys).then(res => {
          console.log('重置密码是手机号', res)
          if (res.data.code === 200) {
            this.$message({
              showClose: true,
              message: '重置成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'warning'
            })
          }
        })
      })
    },
    handleEditAndCreate (handle, row) {
      console.log('rowssss', row)
      if (handle === 'add') {
        this.interfaceUrl = ''
        this.operation = true // 用于判断提交时是创建还是编辑
        this.ruleForm = {
          role: {
            apis: [],
            code: '',
            desc: '',
            name: '',
            _id: ''
          }
        }
        this.dialogTableVisible = true
        this.dialogTitle = '增加用户'
      } else {
        this.operation = false // 不展示密码框
        this.ruleForm = JSON.parse(JSON.stringify(row))
        // console.log('修改时传的this.ruleForm', this.ruleForm)
        this.dialogTableVisible = true
        this.dialogTitle = '修改用户'
      }
    },
    handleDelete (row) {
      console.log(row)
      deleteUser(row._id).then(res => {
        if (res.data.code === 200) {
          console.log('删除成功', res)
          this.getRealData()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.operation) {
            // console.log('创建的ruleForm', this.ruleForm)
            this.ruleForm.roleId = this.ruleForm.role._id
            newUser(this.ruleForm).then(res => {
              console.log('创建成功', res)
              this.getRealData()
              this.$message({
                showClose: true,
                message: '创建成功',
                type: 'success'
              })
            })
          } else {
            this.ruleForm.roleId = this.ruleForm.role._id
            console.log('修改的ruleForm', this.ruleForm)
            updateUser(this.ruleForm).then(res => {
              if (res.data.code === 200) {
                // console.log('修改成功', res)
                this.getRealData()
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                // if (this.ruleForm.role === '超级管理员') {
                //   if (this.getUserInfo.account === this.ruleForm.account) {
                //     var infos = JSON.parse(sessionStorage.getItem('userInfo'))
                //     infos.AvatarUrl = this.ruleForm.AvatarUrl
                //     infos.account = this.ruleForm.account
                //     infos.name = this.ruleForm.name
                //     infos.sex = this.ruleForm.sex
                //     infos.phone = this.ruleForm.phone
                //     this.$store.commit('SET_USERINFO', infos)
                //   }
                // }
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'warning'
                })
              }
            })
          }
          this.dialogTableVisible = false
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    },
    cancelForm () {
      this.ruleForm = {
        role: {
          apis: [],
          code: '',
          desc: '',
          name: '',
          _id: ''
        }
      }
      this.dialogTableVisible = false
    },
    handleSizeChange (val) {
      this.perPage = val
      this.getRealData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getRealData()
    },
    // 自主上传
    imgUpload (file) {
      console.log('aaaaa', file)
      const formData = new FormData()
      formData.append('file', file.file)
      // console.log('formData', formData)
      updatedAvater('avatar', formData).then(res => {
        // console.log('上传成功', res)
        if (res.data.code === 200) {
          this.ruleForm.AvatarUrl = res.data.data // 显示
          sessionStorage.setItem('avatarUrl', JSON.stringify(res.data.data))
        } else {
          this.$message('头像上传失败')
        }
      })
    },
    // 上传之前
    beforeAvatarUpload (file) {
      // console.log('上传之前', file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传成功的回调
    handleAvatarSuccess (res, file) {
      // 上传成功 回显图片
      this.ruleForm.AvatarUrl = URL.createObjectURL(file.raw)
      // console.log('上传成功之后', this.ruleForm.AvatarUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.block{
  margin-top: 20px;
  text-align: right;
}
.block /deep/ .el-pager .active{
  background-color: $primary !important;
}
.user_container {
  .card-table {
    .btn {
      margin-bottom: 15px;
      width: 200px;
    }
    .btnText {
      padding-left: 0; // 让按钮左边和表头对齐
      color: $primary;
    }
  }
  .dai {
    /deep/ .el-divider--horizontal {
      margin: -10px 0 10px 0;
    }
    .dfooter {
      margin-left: 60%;
    }
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
/deep/ .demo-dynamic .el-form-item__label {
    padding: 0 25px 0 0;
}
/deep/ .el-dialog .el-dialog__body {
    padding: 20px 30px;
}
/deep/ .is-checked .el-radio__inner {
    background: $primary;
    border-color: $primary;
}
/deep/ .is-checked .el-radio__label {
    color: $primary;
}
/deep/ .el-radio__inner::after {
  //这是单选框里面的小圆点
    width: 6px;
    height: 6px;
}
</style>
