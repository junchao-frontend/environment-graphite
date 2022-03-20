<template>
  <div>
   <!-- <div class="card-search"> -->
    <!-- <el-form size="small" :inline="true" label-width="80px" :model="form" class="demo-form-inline"> -->
      <!-- <el-form-item  style="" label="设备名称">
        <el-select filterable clearable v-model="form.deviceNameId" placeholder="请选择设备类型">
            <el-option v-for="(item, index) in deviceNames" :key="index" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item  style="float:right;" label=""> -->
        <!-- <el-button icon="el-icon-search" type="primary" @click="getDatas()">查询</el-button> -->
        <!-- <el-button icon="el-icon-plus" type="primary" @click="addOrEdit('add')">新增库存项目</el-button> -->
      <!-- </el-form-item> -->
    <!-- </el-form> -->
   <!-- </div> -->
   <div class="card-table">
      <el-form size="small" :inline="true" label-width="80px" :model="form" class="demo-form-inline">
        <el-form-item  style="float:left;" label="">
          <!-- <el-button icon="el-icon-search" type="primary" @click="getDatas()">查询</el-button> -->
          <el-button icon="el-icon-plus" type="primary" @click="addOrEdit('add')">新增维护内容</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :header-cell-style="getRowClass"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="deviceName"
          label="设备名称"
          width="width">
          <template slot-scope="{row}">{{row.deviceName}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="desc"
          label="维护摘要"
          width="width">
          <template slot-scope="{row}">{{row.desc}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="maintainMan"
          label="维护人"
          width="width">
        </el-table-column>
        <el-table-column
          align="center"
          prop="maintainTime"
          label="维护时间"
          width="width">
        </el-table-column>
        <el-table-column
          align="center"
          prop="place"
          label="位置"
          width="width">
        </el-table-column>
        <!-- <el-table-column
          align="center"
          label="工单查询"
          width="width">
          <template slot-scope="{row}">
            <el-button style="padding:8px;12px" type="primary" plain @click="getInOut(row, 'out')">出库工单</el-button>
            <el-button style="padding:8px;12px" type="primary" plain @click="getInOut(row, 'in')">入库工单</el-button>
          </template>
        </el-table-column> -->
        <el-table-column
          align="center"
          label="操作"
          width="width">
          <template slot-scope="{row}">
            <el-button icon="el-icon-edit" style="padding:9px;12px" type="primary" @click="addOrEdit('edit', row)">编辑</el-button>
            <el-button icon="el-icon-edit" style="padding:9px;12px" type="primary" @click="showInCheckDialog = true,detailRow = row">详情</el-button>
            <el-button icon="el-icon-delete" style="padding:9px;12px" type="primary" @click="deleteMAIN(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagin" v-if="total>pageSize">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
   </div>
    <el-dialog  width="60%" :modal-append-to-body="false" :visible.sync="showInDialog">
      <div slot="title">
        维护信息
      </div>
      <el-form :rules="rulesIn"  ref="formIn" label-position="right" label-width="100px"  size="small" :model="formIn">
        <el-form-item label="设备名称">
          <div class="grops">
            <el-select size="small" v-model="formIn.deviceName" clearable>
              <el-option
                v-for="item in optionDeviceNames"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input class="inp" placeholder="请输入设备名称" v-if="formIn.deviceName === '其他'" v-model="inputDiameterType"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="维护摘要" prop="remark">
            <el-input v-model="formIn.remark"></el-input>
        </el-form-item>
        <el-form-item label="维护人" prop="maintainMan">
          <el-input v-model="formIn.maintainMan" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="place">
          <el-input v-model="formIn.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="维护时间" prop="maintainTime">
            <el-date-picker
              style="width:350px;"
              v-model="formIn.maintainTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="附件" prop="enclosure">
          <!-- <el-input v-model="formIn.enclosure" autocomplete="off"></el-input> -->
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :on-change="handleChange"
            :on-remove="handleRemove"
            multiple
            :file-list="formIn.enclosure"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success">上传</el-button> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="具体内容" prop="desc">
          <el-input :rows="4" type="textarea" v-model="formIn.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('formIn');showInDialog=false">取 消</el-button>
        <el-button type="primary" @click="saveForm('formIn')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  width="50%" :modal-append-to-body="false" :visible.sync="showInCheckDialog">
      <div slot="title">
        详情
      </div>
      <!-- title="无边框列表" -->
      <el-descriptions class="margin-top" :column="1" :size="size">
        <el-descriptions-item label="创建时间">{{this.detailRow.createTime}}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{this.detailRow.deviceName}}</el-descriptions-item>
        <el-descriptions-item label="维护人">{{this.detailRow.maintainMan}}</el-descriptions-item>
        <el-descriptions-item label="摘要">{{this.detailRow.remark}}</el-descriptions-item>
        <el-descriptions-item label="维护时间">{{this.detailRow.maintainTime}}</el-descriptions-item>
        <el-descriptions-item label="位置">{{this.detailRow.place}}</el-descriptions-item>
        <el-descriptions-item label="具体内容">{{this.detailRow.desc}}</el-descriptions-item>
        <el-descriptions-item label="文件下载">
          <template>
            <el-link v-for="item in this.detailRow.enclosure" :key="item.name" type="primary" target="_blank" :href="item.address">{{item.name}}&nbsp;&nbsp;&nbsp;</el-link>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { showDeviceTable } from '@/api/deviceEquitment/deviceType.js'
import { getMaintainData, postMaintainData, updateMaintain, deleteMaintain, updatedAvater } from '@/api/maintainApi.js'
export default {
  data () {
    return {
      form: {
        deviceNameId: ''
      },
      optionDeviceNames: [],
      inputDiameterType: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 100,
      size: '', // 空是默认大小
      rulesIn: {
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        maintainMan: [
          { required: true, message: '请输入维护人', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '请输入位置', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入具体内容', trigger: 'blur' }
        ],
        maintainTime: [
          { required: true, message: '请填写时间', trigger: 'change' }
        ]
      },
      detailRow: {},
      showInDialog: false,
      showInCheckDialog: false,
      operations: '',
      formIn: {},
      interfaceUrl: 'http://106.52.170.16:9000/',
      fileList: []
    }
  },
  created () {
    showDeviceTable().then(res => {
      res.data.data.pageData.forEach(el => {
        this.optionDeviceNames.push({
          label: el.name,
          value: el.name
        })
      })
      this.optionDeviceNames.push({
        label: '其他',
        value: '其他'
      })
    })
    this.getDatas()
  },
  methods: {
    getDatas () {
      const params = {
        pageSize: this.pageSize,
        currPage: this.currPage
      }
      getMaintainData(params).then(res => {
        console.log('resres', res.data)
        this.tableData = res.data.data.pageData
        this.total = res.data.data.total
      })
    },
    addOrEdit (type, row) {
      if (type === 'add') {
        this.formIn = {
          enclosure: []
        }
        this.showInDialog = true
        this.operations = type
      } else {
        console.log('row', row)
        this.formIn = JSON.parse(JSON.stringify(row))
        // this.fileList = this.formIn.enclosure
        this.showInDialog = true
        this.operations = type
      }
    },
    saveForm (formName) {
      // console.log('formDatas', formDatas) // 空的
      this.$nextTick(
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operations === 'add') {
              if (this.formIn.deviceName === '其他') {
                this.formIn.deviceName = this.inputDiameterType
              }
              console.log('增加的ruleForm', this.formIn)
              postMaintainData(this.formIn).then(res => {
                console.log('创建', res.data)
                if (res.data.code === 200) {
                  this.$message({
                    showClose: true,
                    message: '创建成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '创建失败',
                    type: 'warning'
                  })
                }
                this.getDatas()
                this.showInDialog = false
              })
            } else {
              console.log('编辑的formIn', this.formIn)
              if (this.formIn.deviceName === '其他') {
                this.formIn.deviceName = this.inputDiameterType
              }
              updateMaintain(this.formIn).then(res => {
                console.log('编辑成功没', res.data)
                if (res.data.code === 200) {
                  this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '编辑失败',
                    type: 'warning'
                  })
                }
                this.getDatas()
                this.showInDialog = false
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      )
    },
    handleChange (file, fileList) {
      console.log('change了文件', fileList)
      // eslint-disable-next-line prefer-const
      let formDatas = new FormData()
      fileList.forEach(item => {
        item.raw && (formDatas.append('file', item.raw))
      })
      console.log('sadad', formDatas.getAll('file'))
      updatedAvater(formDatas).then(res => {
        let arrs = JSON.parse(JSON.stringify(fileList))
        arrs.forEach((item, index) => {
          if (item.raw) {
            arrs.splice(index, 1)
          }
        })
        arrs = [...arrs, ...res.data.data]
        console.log('arrs', arrs)
        this.formIn.enclosure = arrs
      })
    },
    handleRemove (file, fileList) {
      console.log('删除了文件', file)
      this.formIn.enclosure = fileList
    },
    cancelForm (formName) {
      this.$refs[formName].resetFields()
      this.fileList = []
      this.inputDiameterType = ''
      this.showInDialog = false
    },
    deleteMAIN (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMaintain(row._id).then(res => {
          if (res.data.code === 200) {
            console.log('res.data', res.data)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getDatas()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getMachineData()
    },
    handleCurrentChange (val) {
      this.currPage = val
      this.getMachineData()
    }
  }
}
</script>

<style lang="scss" scoped>
.pagin{
  display: flex;
  justify-content: right;
  padding: 12px 12px 0 0;
}
.pagin /deep/ .el-pager .active{
  background-color: $primary !important;
}
.grops {
  display: flex;
  .inp {
    /deep/ .el-input__inner {
      width: 30%;
      margin-left: 20px;
    }
  }
}
</style>
