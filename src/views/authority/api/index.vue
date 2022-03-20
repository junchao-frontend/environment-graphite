<template>
 <div class="api_container">
   <div class="card-search">
      <el-form size="small" :inline="true" label-width="60px" :model="formInline" class="demo-form-inline">
        <el-form-item label="api名称">
          <el-input size="small" v-model="formInline.name" placeholder="请输入api名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="方法">
          <!-- <el-input size="small" v-model="formInline.method" placeholder="请输入方法名称" clearable></el-input> -->
            <el-select v-model="formInline.method" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
            prop="name"
            label="api名称"
            >
        </el-table-column>
        <el-table-column
            prop="url"
            label="URL"
            >
        </el-table-column>
        <el-table-column
            prop="method"
            label="方法"
            >
        </el-table-column>
        <el-table-column
            prop="desc"
            label="描述"
            >
        </el-table-column>
        <el-table-column
            fixed="right"
            prop="prop"
            label="操作" >
            <template slot-scope="{ row }">
                <el-button class="btnText" size="medium" type="text" icon="el-icon-edit" @click="handleEditAndCreate('edit', row)">编辑</el-button>
                <el-button class="btnText" size="medium" type="text" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button>
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
          <el-form-item label="api名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="URL" prop="url">
            <el-input v-model="ruleForm.url"></el-input>
          </el-form-item>
          <el-form-item label="方法" prop="method">
            <!-- <el-input v-model="ruleForm.method"></el-input> -->
            <el-select v-model="ruleForm.method" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
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
import { showApiTable, deleteApi, newApi, updateApi } from '@/api/auth/apiApi.js'
export default {
  name: 'api',
  components: {},
  data () {
    return {
      perPage: 10,
      page: 1,
      total_real: null,
      formInline: {
        name: '',
        method: ''
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请填写api名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请填写URL', trigger: 'blur' }
        ],
        // method: [
        //   { required: true, message: '请填写方法', trigger: 'blur' }
        // ],
        desc: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      },
      ruleForm: {
        name: '',
        url: '',
        method: '',
        desc: ''
      },
      options: [{
        value: 'GET',
        label: 'GET'
      }, {
        value: 'POST',
        label: 'POST'
      }, {
        value: 'PUT',
        label: 'PUT'
      }, {
        value: 'DELETE',
        label: 'DELETE'
      }],
      dialogTitle: '',
      dialogTableVisible: false,
      operation: true
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getRealData()
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
        name: this.formInline.name,
        method: this.formInline.method,
        pageSize: this.perPage,
        currPage: this.page
      }
      showApiTable(para).then(res => {
        // console.log('ssss', para, res)
        if (res.data.code === 200) {
          this.loading = false
          console.log('ressddd', res.data)
          this.tableData = res.data.data.pageData || []
          this.total_real = res.data.data.total
        }
      })
    },
    handleEditAndCreate (handle, row) {
      // console.log('rowssss', row)
      if (handle === 'add') {
        this.operation = true // 用于判断提交时是创建还是编辑
        this.ruleForm = {
          name: '',
          url: '',
          method: '',
          desc: ''
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
      deleteApi(row._id).then(res => {
        if (res.data.code === 200) {
          // console.log('删除成功', res)
          this.getRealData()
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
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
            newApi(this.ruleForm).then(res => {
              // console.log('创建成功', res)
              this.getRealData()
              this.$message({
                showClose: true,
                message: '创建成功',
                type: 'success'
              })
            })
          } else {
            console.log('修改的ruleForm', this.ruleForm)
            updateApi(this.ruleForm).then(res => {
              if (res.data.code === 200) {
                // console.log('修改成功', res)
                this.getRealData()
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
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
        name: '',
        url: '',
        method: '',
        desc: ''
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
.api_container {
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
      margin: -10px 0 30px 0;
    }
    .dfooter {
      margin-left: 60%;
    }
  }
}
/deep/ .demo-dynamic .el-form-item__label {
    padding: 0 25px 0 0;
}
/deep/ .el-dialog .el-dialog__body {
    padding: 20px 30px;
}
</style>
