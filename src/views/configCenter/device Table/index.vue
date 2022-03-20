<template>
  <div class="typeContainer">
    <div class="card-search top_search">
      <el-form :inline="true" :model="formInline" key="1" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="设备类型">
          <!-- v-model="formInline.types"绑的是value -->
          <el-select v-model="formInline.types" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDeviceData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card-table bottom_table">
        <div class="btn">
          <el-button type="primary" icon="el-icon-plus" size="medium" @click="handleEditAndCreate('add')">新增</el-button>
        </div>
        <div class="table_content">
            <!-- align="center" 每列居中 -->
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="getRowClass"
            :row-style="{ fontSize: '14px', height: '10px' }"
            :cell-style="{ padding: '14px', height: '30px' }">
                <el-table-column
                    prop="name"
                    label="设备名称"
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    >
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    >
                </el-table-column>
                <!-- deviceTypeId -->
                <el-table-column
                    prop="deviceTypeId"
                    label="设备类型ID"
                    >
                </el-table-column>
                <el-table-column
                    prop="desc"
                    label="描述"
                    >
                </el-table-column>
                <el-table-column
                    prop="code"
                    label="编码"
                    >
                </el-table-column>
                <el-table-column
                    prop="img"
                    label="设备图片"
                    >
                    <template slot-scope="{ row }">
                        <img :src="row.img" height="80px" alt="加载中...">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="100px"
                    >
                </el-table-column>
                <el-table-column
                    prop="isCustom"
                    label="自定义"
                    >
                </el-table-column>
                <el-table-column
                    prop="sensors"
                    label="传感器"
                    >
                    <template slot-scope="scope">
                        <el-button class="btnText" size="medium" type="text" icon="el-icon-receiving" @click="sensorsNews(scope.$index, scope.row)">传感器详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <div style="display: flex">
                        <el-button class="btnText" size="medium" type="text" icon="el-icon-edit" @click="handleEditAndCreate('edit', scope.$index, scope.row)">编辑</el-button>
                        <el-button class="btnText" size="medium" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                      </div>
                    </template>
                </el-table-column>
          </el-table>
        </div>
        <div
          v-if="tableData.length !== 0"
          class="pagina"
          style="display: flex; flex-direction: row-reverse; margin-top: 10px"
        >
          <el-pagination
            :current-page="page"
            :page-size="per_page"
            :total="total_count"
            :page-sizes="[10, 20, 50, 100]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
    </div>
    <!-- 传感器的dialog -->
    <el-dialog :title="sensorsDialogTitle" :visible.sync="sensorsDialogTableVisible" :modal-append-to-body="false">
      <el-divider></el-divider>
      <el-table
      :data="sensorsData"
      class="diatable"
      style="width: 100%;overflow-y: overlay;height: 500px"
      :header-cell-style="getRowClass"
      :row-style="{ fontSize: '14px', height: '10px' }"
      :cell-style="{ padding: '14px', height: '30px' }">
        <el-table-column property="name" label="传感器名称"></el-table-column>
        <el-table-column property="code" label="传感器编码"></el-table-column>
        <el-table-column width="55" type="expand">
          <template slot-scope="props">
              <el-table :data="props.row.detectionValue" style="width: 100%;padding: 5px 20px 10px 20px;border: none">
                  <el-table-column property="key" label="指标名称"></el-table-column>
                  <el-table-column property="alarmRule" label="alarmRule">
                    <el-table-column property="alarmRuleMax" label="最大值">
                    </el-table-column>
                    <el-table-column property="alarmRuleMin" label="最小值">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column property="validRule" label="validRule">
                    <el-table-column property="validRuleMax" label="最大值">
                    </el-table-column>
                    <el-table-column property="validRuleMin" label="最小值">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column property="unit" label="单位"></el-table-column>
              </el-table>
          </template>
        </el-table-column>
        <!-- <el-table-column property="detectionValue" label="检测值"> -->

          <!-- <el-collapse accordion class="collapse_class">
            <el-collapse-item>
              <template slot="title">
                检测指标<i class="header-icon el-icon-info"></i>
              </template> -->
              <!-- <el-table :data="childData"> -->
              <!-- </el-table> -->
            <!-- </el-collapse-item>
          </el-collapse> -->
        <!-- </el-table-column> -->
      </el-table>
    </el-dialog>

    <el-dialog class="dail" width="74%" :title="addEditTitle" :visible.sync="addEditDialogTableVisible" :modal-append-to-body="false">
      <el-divider></el-divider>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-dynamic">
        <el-form-item label="设备图片" prop="img">
            <el-upload
            class="avatar-uploader"
            :show-file-list="true"
            :action="interfaceUrl"
            name="file"
            :http-request="imgUpload">
                <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="deviceTypeId">
            <el-select
                v-model="ruleForm.deviceTypeId"
                clearable>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="ruleForm.status" label="正常">正常</el-radio>
          <el-radio v-model="ruleForm.status" label="离线">离线</el-radio>
        </el-form-item>
        <!-- <el-form-item label="位置" prop="loc">
          <el-input v-model="ruleForm.loc"></el-input>
        </el-form-item> -->
        <el-form-item label="自定义" prop="isCustom">
          <el-switch
            v-model="ruleForm.isCustom"
            active-color="#4D70FF">
          </el-switch>
        </el-form-item>

        <div v-if="ruleForm.isCustom" style="margin: 20px 0 -20px 32px; line-height:20px;">传感器</div>
        <div v-if="ruleForm.isCustom" class="outsideDiv" style="height:250px;margin-bottom: 20px;">
          <el-form-item
              v-for="(item, index) in ruleForm.sensors"
              :key="index"
              :prop="item.code">
              <div class="protocolDiv" style="height: 90%">
                <div style="font-size: 18px">sensors{{index+1}}:</div>
                <el-input style="width: 48.5%" size="small" v-model="item.code">
                  <template slot="prepend">code</template>
                </el-input>
                <el-input style="width: 48.5%" size="small" v-model="item.name">
                  <template slot="prepend">name</template>
                </el-input>
                <div class="groupDetectionValue">
                  <div class="textDetectionValue">检测指标</div>
                  <div class="insideValue">
                    <el-form-item
                     style="margin-bottom: 10px"
                     v-for="(child, index) in item.detectionValue"
                     :key="index"
                     :prop="child.key"
                    >
                      <div style="display: flex">
                        <el-input size="small" v-model="child.key">
                          <template slot="prepend">key{{index+1}}</template>
                        </el-input>
                        <el-input size="small" v-model="child.unit">
                          <template slot="prepend">unit</template>
                        </el-input>
                        <el-input size="small" v-model="child.alarmRule.max">
                          <template slot="prepend">alarmRuleMax</template>
                        </el-input>
                        <el-input size="small" v-model="child.alarmRule.min">
                          <template slot="prepend">alarmRuleMin</template>
                        </el-input>
                        <el-input size="small" v-model="child.validRule.max">
                          <template slot="prepend">validRuleMax</template>
                        </el-input>
                        <el-input size="small" v-model="child.validRule.min">
                          <template slot="prepend">validRuleMin</template>
                        </el-input>
                        <svg-icon
                          iconClass="delete"
                          class="icons"
                          style="color: inhert; width: 255px; height: 26px;padding: 2px 0; cursor: pointer"
                          @click="removeSensor('Detections', item, child)"
                        />
                      </div>
                    </el-form-item>
                    <svg-icon
                      iconClass="add"
                      class="iconadd"
                      style="color: inhert; width: 40px; height: 26px;padding: 2px 0;margin: 0 45%; cursor: pointer"
                      @click="addSensor('Detections', item)"
                    />
                  </div>
                </div>
                <el-button size="mini" round icon="el-icon-plus" type="primary" @click="addSensor('sensors')">Add</el-button>
                <el-button size="mini" round icon="el-icon-delete" type="danger" :disabled="disabledSensor" @click.prevent="removeSensor('sensors', item)">Delete</el-button>
              </div>
          </el-form-item>
        </div>
        <el-form-item class="btnflex">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="cancelForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { showDevice, deleteDevice, updateDevice, newDevice } from '@/api/deviceEquitment/deviceItem.js'
import { updatedAvater } from '@/api/auth/userApi.js'
import { showDeviceTable } from '@/api/deviceEquitment/deviceType.js'
export default {
  name: 'deviceTable',
  components: {},
  data () {
    return {
      formInline: {
        name: '',
        types: ''
      },
      options: [],
      searchType: '',
      tableData: [],
      page: 1,
      per_page: 10,
      total_count: 1,
      dialogTableVisible: false,
      sensorsDialogTableVisible: false,
      dialogTitle: '',
      sensorsDialogTitle: '',
      gridData: [],
      sensorsData: [],
      operation: 'add',
      loading: true,
      addEditTitle: '',
      addEditDialogTableVisible: false,
      rules: {
        typeName: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        protocolName: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      interfaceUrl: '',
      ruleForm: {
        name: '',
        deviceTypeId: '',
        code: '',
        isValid: true, // 不展示 也不能修改
        status: '正常',
        isCustom: false, // 默认是不自动 变true就显示sensors
        desc: '',
        loc: {},
        img: '',
        sensors: [{
          code: '',
          name: '',
          detectionValue: [
            {
              key: '',
              unit: '',
              alarmRule: {
                min: '',
                max: ''
              },
              validRule: {
                min: '',
                max: ''
              }
            }
          ]
        }]
      },
      disabledSensor: true
    }
  },
  computed: {
  },
  created () {
    this.getDeviceData()
  },
  mounted () {
  },
  methods: {
    getDeviceTypeAll () {

    },
    getDeviceData () {
      const params = {
        page: this.page,
        per_page: this.per_page,
        name: this.formInline.name,
        deviceTypeId: this.formInline.types
      }
      showDevice(params).then(res => {
        if (res.data.code === 200) {
          this.loading = false
          console.log('ress设备表', res.data)
          this.tableData = JSON.parse(JSON.stringify(res.data.data.pageData))
          this.tableData.forEach(item => {
            if (item.isCustom === true) {
              item.isCustom = '是'
            } else {
              item.isCustom = '否'
            }
            // this.options.push({ // 不能这么获取options
            //   label: item.deviceTypeName,
            //   value: item.deviceTypeId
            // })
            // this.options = this.unique(this.options)
          })
          showDeviceTable().then(res => {
            if (res.data.code === 200) {
              console.log('+++++', res)
              res.data.data.pageData.forEach(i => {
                this.options.push({
                  label: i.name,
                  value: i._id
                })
              })
            }
          })
          // console.log('修改之后的this.tableData', this.tableData)
          this.total_count = res.data.data.total
        }
      })
    },
    unique (arr) {
      var results = []
      var objj = {}
      for (let i = 0; i < arr.length; i++) {
        // value是设备类型id
        if (!objj[arr[i].value]) {
          results.push(arr[i])
          objj[arr[i].value] = true
        }
      }
      return results
    },
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #f7fbff;color:black;padding: 15px'
      } else {
        return ''
      }
    },
    handleEditAndCreate (handle, index, row) {
      console.log('rowssss', row)
      if (handle === 'add') {
        this.interfaceUrl = ''
        this.ruleForm = {
          name: '',
          deviceTypeId: '',
          code: '',
          isValid: true, // 不展示 也不能修改
          status: '正常',
          isCustom: false, // 默认是不自动 变true就显示sensors
          desc: '',
          loc: {},
          img: '',
          sensors: [{
            code: '',
            name: '',
            detectionValue: [
              {
                key: '',
                unit: '',
                alarmRule: {
                  min: '',
                  max: ''
                },
                validRule: {
                  min: '',
                  max: ''
                }
              }
            ]
          }]
        }
        this.operation = 'add' // 用于判断提交时是创建还是编辑
        this.addEditDialogTableVisible = true
        this.addEditTitle = '增加设备类型'
      } else {
        const fake = JSON.parse(JSON.stringify(row))
        if (fake.isCustom === '是') {
          fake.isCustom = true
        }
        if (fake.isCustom === '否') {
          fake.isCustom = false
        }
        // 如果isCustom本来就是false 应该给个空的表格 待做
        // console.log('改过的row', fake)
        this.ruleForm = fake
        this.operation = 'edit'
        this.addEditDialogTableVisible = true
        this.addEditTitle = '修改设备类型'
      }
    },
    submitForm (formName) {
      this.$nextTick(
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operation === 'add') {
              console.log('增加的ruleForm', this.ruleForm)
              newDevice(this.ruleForm).then(res => {
                if (res.data.code === 200) {
                  console.log('创建设备类型', res.data)
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
                this.getDeviceData()
                this.addEditDialogTableVisible = false
              })
            } else {
              console.log('编辑的ruleForm', this.ruleForm)
              updateDevice(this.ruleForm).then(res => {
                console.log('resres', res.data)
                if (res.data.code === 200) {
                  // console.log('编辑设备类型', res.data)
                  this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '编辑失败(切勿重名)',
                    type: 'warning'
                  })
                }
                this.getDeviceData()
                this.addEditDialogTableVisible = false
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      )
    },
    cancelForm () {
      this.ruleForm = {}
      this.addEditDialogTableVisible = false
    },
    handleDelete (row) {
      console.log('删除row._id', row._id)
      deleteDevice(row._id).then(res => {
        if (res.data.code === 200) {
          // console.log('删除成功', res)
          this.getDeviceData()
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
    sensorsNews (index, row) {
      console.log('888', index, row.sensors)
      this.sensorsDialogTableVisible = true
      this.sensorsDialogTitle = '传感器'
      this.sensorsData = JSON.parse(JSON.stringify(row.sensors))
      this.sensorsData.forEach(el => {
        el.detectionValue.filter((item, index) => {
          item.alarmRuleMax = item.alarmRule.max
          item.alarmRuleMin = item.alarmRule.min
          item.validRuleMax = item.validRule.max
          item.validRuleMin = item.validRule.min
        })
      })
      // this.childData = row.sensors.detectionValue
      // this.bindTableColumnsAlarmRule = row.sensors.alarmRule
    },
    addSensor (thing, item) {
      if (thing !== 'Detections') {
        if (this.ruleForm.sensors.length < 1) {
          this.disabledSensor = true
        } else {
          this.disabledSensor = false
        }
        this.ruleForm.sensors.push({
          code: '',
          name: '',
          detectionValue: [
            {
              key: '',
              unit: '',
              alarmRule: {
                min: '',
                max: ''
              },
              validRule: {
                min: '',
                max: ''
              }
            }
          ]
        })
      } else {
        item.detectionValue.push({
          key: '',
          unit: '',
          alarmRule: {
            min: '',
            max: ''
          },
          validRule: {
            min: '',
            max: ''
          }
        })
      }
    },
    removeSensor (thing, item, child) {
      if (thing !== 'Detections') {
        if (this.ruleForm.sensors.length <= 2) {
          this.disabledSensor = true
        } else {
          this.disabledSensor = false
        }
        var indexs = this.ruleForm.sensors.indexOf(item)
        if (indexs !== -1) {
          this.ruleForm.sensors.splice(indexs, 1)
        }
      } else {
        // console.log('itemitem', item, child)
        var indexss = item.detectionValue.indexOf(child)
        if (indexss !== -1) {
          item.detectionValue.splice(indexss, 1)
        }
      }
    },
    // 自主上传
    imgUpload (file) {
      console.log('aaaaa', file)
      const formData = new FormData()
      formData.append('file', file.file)
      updatedAvater('device', formData).then(res => {
        console.log('上传成功', res)
        if (res.data.code === 200) {
          this.ruleForm.img = res.data.data // 显示
        } else {
          this.$message('头像上传失败')
        }
      })
    },
    handleSizeChange (value) {
      console.log('每页展示' + value + '条')
      // this.apiLoading = true
      this.per_page = value
      this.getDeviceData()
    },
    handleCurrentChange (value) {
      // 改变页数
      console.log('第' + value + '页')
      // this.apiLoading = true
      this.page = value
      this.getDeviceData()
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin box($width, $height, $radi, $colorborder) {
  width: $width;
  height: $height;
  border-radius: $radi;
  border: 1px solid $colorborder;
}
@mixin scrollClass () {
  &::-webkit-scrollbar {
    width: 6px; /*滚动条宽度*/
    height: 8px; /*滚动条高度*/
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px; /*滚动条的背景区域的圆角*/
    background-color: #eeeeee; /*滚动条的背景颜色*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px; /*滚动条的圆角*/
    background-color: rgb(192, 190, 190); /*滚动条的背景颜色*/
  }
}
.typeContainer {
  width: 100%;
  .top_search {
    padding: 24px 24px 24px;
    background-color: #fff;
    border-radius: 2px;
  }
  .bottom_table {
    padding: 24px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    .btn {
      margin-bottom: 15px;
      width: 200px;
    }
    .table_content {
      overflow: auto;
      .el-table {
        width: 100%;
      }
      // width: 100%;
      .btnText {
        padding-left: 0; // 让按钮左边和表头对齐
        color: $primary;
      }
    }
    .pagina {
      /deep/.el-pager .number {
        background-color: $primary;
      }
    }
  }
  .dail {
    .avatar-uploader {
        border: 1px dashed #d9d9d9b0;
        // border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 85px;
        height: 85px;
    }
    .avatar-uploader:hover {
        border-color: $primary;
    }
    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 85px;
        height: 85px;
        line-height: 85px;
        text-align: center;
    }
    .outsideDiv {
      height: 170px;
      overflow-y: overlay;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      .protocolDiv {
        width: 100%;
        height: 145px;
        padding: 2px 10px 2px 10px;
        box-sizing: border-box;
        border: #dcdfe6 1px solid;
        border-radius: 10px;
        overflow-y: overlay;
        &:hover {
          border: #b1b1b4 1px solid;
        }
        .el-input--small {
          margin-right: 10px;
          /deep/ .el-input-group__prepend {
            padding: 3px;
            margin-right: 5px;
          }
        }
        .groupDetectionValue {
          margin-top: 15px;
          height: 100px;
          width: 100%;
          display: flex;
          align-items: flex-start;
          .textDetectionValue {
            font-size: 12px;
            line-height: 30px;
            background-color: #F5F7FA;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            padding: 0 3px;
            margin-top: 2px;
            color: #909399;
          }
          .insideValue {
            @include box (91.5%, 63px, 4px,#DCDFE6);
            margin-left: 10px;
            padding: 5px;
            overflow-y: overlay;
            @include scrollClass();
            .icons:hover {
              fill: $danger;
            }
            .iconadd:hover {
              fill: $primary;
            }
          }
        }
      }
    }

    .btnflex {
      display: flex;
      justify-content: flex-end;
      /deep/ .el-form-item__content {
        margin-right: 10px;
        .el-button {
          margin-left: 40px;
        }
      }
    }
  }
}
.el-table::-webkit-scrollbar {
  width: 6px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}
.el-table::-webkit-scrollbar-track {
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: #eeeeee; /*滚动条的背景颜色*/
}
.el-table::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  background-color: rgb(192, 190, 190); /*滚动条的背景颜色*/
}
.el-form::-webkit-scrollbar {
  width: 6px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}
.el-form::-webkit-scrollbar-track {
  border-radius: 10px; /*滚动条的背景区域的圆角*/
  background-color: #eeeeee; /*滚动条的背景颜色*/
}
.el-form::-webkit-scrollbar-thumb {
  border-radius: 10px; /*滚动条的圆角*/
  background-color: rgb(192, 190, 190); /*滚动条的背景颜色*/
}
/deep/ .demo-dynamic .el-form-item__label {
    padding: 0 25px 0 0;
}
/deep/ .el-dialog .el-dialog__body {
    padding: 10px 30px;
}
/deep/ .el-divider--horizontal {
  margin-top: 0;
}
/deep/ .el-table::before {
  width: 0;
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
