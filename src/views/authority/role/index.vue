<template>
 <div class="role_container">
   <div class="card-search">
      <el-form size="small" :inline="true" label-width="60px" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名">
          <el-input size="small" v-model="formInline.name" placeholder="请输入角色名称" clearable></el-input>
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
            label="角色名称"
            >
        </el-table-column>
        <el-table-column
            prop="apis"
            label="角色接口"
            >
            <template slot-scope="{ row }">
                <el-button class="btnText" size="medium" type="text" icon="el-icon-search" @click="lookUpApi(row)">查看角色api</el-button>
            </template>
        </el-table-column>
        <el-table-column
            prop="code"
            label="权限类型"
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
                <!-- <el-button class="btnText" size="medium" type="text" icon="el-icon-delete" @click="handleDelete(row)">删除</el-button> -->
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
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色接口" prop="apis">
            <!-- <el-input v-model="ruleForm.apis"></el-input> -->
            <el-button class="btnText" type="text" icon="el-icon-s-tools" @click="openDrawer()">设置api</el-button>
          </el-form-item>
          <el-form-item label="权限类型" prop="code">
            <el-input :disabled="dialogTitle === '修改用户' ? true : false" v-model="ruleForm.code"></el-input>
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
   <el-drawer
    :visible.sync="drawer"
    :with-header="false"
    :modal-append-to-body="false"
    :wrapperClosable="false"
    :direction="direction"
    class="drawerClass">
    <div class="titles">分配api</div>
    <el-divider></el-divider>
    <div class="btnclasss">
      <el-button v-if="seeOrOperation" type="primary" icon="el-icon-plus" size="medium" @click="setCheckedNodesSave()">保存</el-button>
      <el-button v-else type="primary" size="medium" @click="shutDrawer()">关闭</el-button>
    </div>
    <div class="treeClass">
      <!-- default-expand-all 默认展开所有  accordion手风琴模式 -->
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        accordion
        :highlight-current="true"
        :props="defaultProps">
      </el-tree>
    </div>
  </el-drawer>
 </div>
</template>

<script>
import { showRoleTable, newRole, updateRole } from '@/api/auth/roleApi.js'
import { showApiTable } from '@/api/auth/apiApi.js'
export default {
  name: 'role',
  components: {},
  data () {
    return {
      treeData: [{
        id: 1,
        label: 'GET',
        children: []
      }, {
        id: 2,
        label: 'POST',
        children: []
      }, {
        id: 3,
        label: 'PUT',
        children: []
      }, {
        id: 4,
        label: 'DELETE',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      childTreeId: 5, // 不能写4 要不少一个
      trees: null,
      allmap: null,
      currentApiArr: [],
      seeOrOperation: false, // 默认保存按钮不展示
      boolean: true, // 默认打开抽屉里面是禁用
      perPage: 10,
      page: 1,
      total_real: null,
      formInline: {
        name: ''
      },
      tableData: [],
      rules: {
        name: [
          { required: true, message: '请填写api名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写code', trigger: 'blur' }
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
        _id: '',
        apis: [],
        code: '',
        desc: ''
      },
      dialogTitle: '',
      dialogTableVisible: false,
      operation: true,
      drawer: false,
      direction: 'rtl'
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getRealData()
    this.getAllApiMap()
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
        pageSize: this.perPage,
        currPage: this.page
      }
      showRoleTable(para).then(res => {
        // console.log('ssss', para, res)
        if (res.data.code === 200) {
          this.loading = false
          console.log('ressddd', res.data)
          this.tableData = res.data.data.pageData || []
          this.total_real = res.data.data.total
        }
      })
    },
    getAllApiMap () {
      showApiTable().then(res => {
        // console.log('pageData', res.data.data.pageData)
        this.trees = new Map()
        this.treeData.forEach(el => {
          this.trees.set(el.label, el.children)
        })
        // console.log('treestrees', this.trees)
        this.setChildren(res.data.data.pageData, 'GET')
        this.setChildren(res.data.data.pageData, 'POST')
        this.setChildren(res.data.data.pageData, 'PUT')
        this.setChildren(res.data.data.pageData, 'DELETE')

        const allApiData = res.data.data.pageData
        this.allmap = new Map()
        allApiData.map(item => {
          this.allmap.set(item.name, item._id)
        })
        console.log('mapam api页面全部接口信息', this.allmap)
      })
    },
    handleEditAndCreate (handle, row) {
      // console.log('rowssss', row)
      this.boolean = false
      this.recursionDisabled(this.treeData) // 全部解除禁用
      if (handle === 'add') {
        this.operation = true // 用于判断提交时是创建还是编辑
        this.ruleForm = {
          name: '',
          _id: '',
          apis: [],
          code: '',
          desc: ''
        }
        this.dialogTableVisible = true
        this.dialogTitle = '增加用户'
      } else {
        this.operation = false // 不展示密码框
        this.ruleForm = JSON.parse(JSON.stringify(row))
        console.log('修改时传的this.ruleForm', this.ruleForm)
        this.dialogTableVisible = true
        this.dialogTitle = '修改用户'
      }
    },
    openDrawer () {
      this.drawer = true
      this.seeOrOperation = true
      const nameAllEdit = []
      this.ruleForm.apis.forEach(i => {
        this.allmap.forEach((value, key, mapObj) => {
          if (value === i) {
            nameAllEdit.push(key)
          }
        })
      })
      // console.log('nameAllEdit', nameAllEdit)
      const ars = []
      nameAllEdit.forEach(name => {
        ars.push(this.findChildreNode(name))
      })
      console.log('ararararsss', ars)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(ars)
      })
    },
    shutDrawer () {
      this.drawer = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.operation) {
            if (this.ruleForm.apis === []) {
              this.$message({
                showClose: true,
                message: '尚未设置api',
                type: 'warning'
              })
            } else {
              console.log('创建的ruleForm', this.ruleForm)
              newRole(this.ruleForm).then(res => {
                console.log('创建成功', res)
                this.getRealData()
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                })
                this.dialogTableVisible = false
              })
            }
          } else {
            if (this.ruleForm.apis === [] || this.ruleForm.apis === undefined) {
              this.ruleForm.apis = []
            }
            console.log('修改的ruleForm', this.ruleForm)
            updateRole(this.ruleForm).then(res => {
              console.log('res更新之后的', res)
              if (res.data.code === 200) {
                console.log('修改成功', res.data)
                this.getRealData()
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                })
                this.dialogTableVisible = false
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'warning'
                })
              }
            })
          }
        } else {
          this.$message('error submit!!')
          return false
        }
      })
    },
    // 展示的时候drawer是禁用的
    recursionDisabled (arr) {
      arr.forEach(item => {
        if (item.children === [] || item.children === undefined) {
          item.disabled = this.boolean
        } else {
          this.recursionDisabled(item.children)
        }
      })
    },
    setChildren (arr, req) {
      var val = []
      val = arr.filter(i => i.method === req)
      val.forEach(item => {
        this.trees.get(item.method).push({
          id: this.childTreeId++,
          label: item.name,
          disabled: false
        })
      })
      // console.log(this.childTreeId)
    },
    findChildreNode (name) {
      let hasChecked = {}
      this.treeData.forEach(item => {
        if (item.children !== []) {
          item.children.forEach(i => {
            if (i.label === name) {
              hasChecked = i
            }
          })
        }
      })
      return hasChecked
    },
    lookUpApi (row) {
      console.log('获取该角色接口', row) // 用apis这个数组
      this.drawer = true
      this.seeOrOperation = false
      this.boolean = true
      this.recursionDisabled(this.treeData) // 全禁用
      const nameAll = []
      row.apis.forEach(i => {
        this.allmap.forEach((value, key, mapObj) => {
          if (value === i) {
            nameAll.push(key)
          }
        })
      })
      // console.log('nameAll', nameAll)
      const ar = []
      nameAll.forEach(name => {
        ar.push(this.findChildreNode(name))
      })
      // console.log('arararar', ar)
      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(ar)
      })
    },
    setCheckedNodesSave () {
      console.log('通过 node 获取', this.$refs.tree.getCheckedNodes())
      const checkArr = this.$refs.tree.getCheckedNodes().filter(item => !item.children)
      console.log('checkArr', checkArr)
      const finalCheckId = []
      checkArr.forEach(j => {
        finalCheckId.push(this.allmap.get(j.label))
      })
      console.log('最终选好的api们的id', finalCheckId)
      this.ruleForm.apis = finalCheckId
      this.drawer = false
      this.$message('角色的接口权限设置成功!')
    },
    cancelForm () {
      this.ruleForm = {
        name: '',
        _id: '',
        apis: [],
        code: '',
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
    // handleDelete (row) {
    //   deleteRole(row._id).then(res => {
    //     if (res.data.code === 200) {
    //       // console.log('删除成功', res)
    //       this.getRealData()
    //       this.$message({
    //         showClose: true,
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
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
.role_container {
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
    .btnText {
      padding-left: 0; // 让按钮左边和表头对齐
      color: $primary;
    }
  }
  .drawerClass {
    .titles {
      padding: 10px 0 15px 10px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      font-size: 1.2rem;
    }
    .el-divider--horizontal {
      margin: -5px 0 10px;
    }
    .btnclasss {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .treeClass {
      padding: 10px;
    }
  }
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: $primary;
  border-color: $primary;
}
/deep/ .demo-dynamic .el-form-item__label {
    padding: 0 25px 0 0;
}
/deep/ .el-dialog .el-dialog__body {
    padding: 20px 30px;
}
</style>
