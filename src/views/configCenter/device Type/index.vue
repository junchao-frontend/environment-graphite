<template>
  <div class="typeContainer">
    <div class="card-search top_search">
        <div class="top_left">
          <div class="letter">类型ID</div>
          <el-input size="small" v-model="searchType" placeholder="请输入设备id" clearable></el-input>
          <el-button type="primary" icon="el-icon-search" size="small" @click="getTypeListData">搜索</el-button>
        </div>
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
                    label="设备类型名称"
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
                <el-table-column
                    prop="desc"
                    label="描述"
                    >
                </el-table-column>
                <el-table-column
                    prop="protocol"
                    label="协议"
                    >
                    <template slot-scope="scope">
                        <el-button class="btnText" size="medium" type="text" icon="el-icon-postcard" @click="protocolNews(scope.$index, scope.row)">{{scope.row.protocol.name}}</el-button>
                    </template>
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
                        <el-button class="btnText" size="medium" type="text" icon="el-icon-edit" @click="handleEditAndCreate('edit', scope.$index, scope.row)">编辑</el-button>
                        <!-- <el-button class="btnText" size="medium" type="text" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
    <!-- 协议的dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
      <el-divider></el-divider>
      <el-table
      :data="gridData"
      style="width: 100%;overflow-y: auto;height: 500px"
      :v-loading="loading"
      :header-cell-style="getRowClass"
      :row-style="{ fontSize: '14px', height: '10px' }"
      :cell-style="{ padding: '14px', height: '30px' }">
        <el-table-column property="originalKey" label="协议值"></el-table-column>
        <el-table-column property="analyticKey" label="实际值"></el-table-column>
        <el-table-column property="unit" label="单位"></el-table-column>
      </el-table>
    </el-dialog>
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
        <el-form-item label="类型名称" prop="typeName">
          <el-input v-model="ruleForm.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="协议名称" prop="protocolName">
          <el-input v-model="ruleForm.protocolName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="协议的key" prop="protocol"> -->
        <div style="margin-left: 32px; line-height:20px; margin-bottom: -20px">协议详情</div>
        <div class="outsideDiv">
          <el-form-item
            v-for="(domain, index) in ruleForm.domains"
            :key="index"
            :prop="domain.originalKey"
          >
            <!-- <span slot="label">协议详情</span>
            :label="'协议'+ (index+1)" -->
            <div class="protocolDiv">
              <div style="font-size: 18px">key{{index+1}}:</div>
              <div style="display: flex">
                <el-input size="small" v-model="domain.originalKey">
                  <template slot="prepend">originalKey</template>
                </el-input>
                <el-input size="small" v-model="domain.analyticKey">
                  <template slot="prepend">analyticKey</template>
                </el-input>
                <el-input size="small" v-model="domain.unit">
                  <template slot="prepend">unit</template>
                </el-input>
              </div>
              <el-button size="mini" round icon="el-icon-plus" type="primary" @click="addDomain">Add</el-button>
              <el-button size="mini" round icon="el-icon-delete" type="danger" :disabled="disabled" @click.prevent="removeDomain(domain)">Delete</el-button>
            </div>
          </el-form-item>
        </div>

        <div style="margin: 20px 0 -20px 32px; line-height:20px;">传感器</div>
        <div class="outsideDiv" style="height:250px;margin-bottom: 20px;">
          <el-form-item
              v-for="(item, index) in ruleForm.sensor"
              :key="index"
              :prop="item.code">
              <div class="protocolDiv" style="height: 90%">
                <div style="font-size: 18px">sensor{{index+1}}:</div>
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
import { showDeviceTable, updateDeviceType, newDeviceType } from '@/api/deviceEquitment/deviceType.js'
// showDeviceTable,
export default {
  name: 'deviceType',
  components: {},
  data () {
    return {
      optionChoose: [],
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
          { required: true, message: '请填写类型名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写类型描述', trigger: 'blur' }
        ],
        protocolName: [
          { required: true, message: '请填写协议名称', trigger: 'blur' }
        ]
      },
      ruleForm: {
        createTime: '',
        _id: '',
        typeName: '',
        desc: '',
        protocolName: '',
        domains: [{
          originalKey: '',
          analyticKey: '',
          unit: ''
        }],
        sensor: [
          {
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
          }
        ]
      },
      disabled: true,
      disabledSensor: true
    }
  },
  computed: {
  },
  created () {
    this.getTypeListData()
  },
  mounted () {
  },
  methods: {
    getTypeListData () {
      const para = {
        name: this.searchType,
        pageSize: this.per_page,
        currPage: this.page
      }
      showDeviceTable(para).then(res => {
        if (res.data.code === 200) {
          this.loading = false
          console.log('ress类型', res.data)
          this.tableData = res.data.data.pageData
          this.total_count = res.data.data.total
        }
      })
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
        this.ruleForm = { // 不能赋空 否则domains不显示了
          typeName: '',
          desc: '',
          protocolName: '',
          domains: [{
            originalKey: '',
            analyticKey: '',
            unit: ''
          }],
          sensor: [
            {
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
            }
          ]
        }
        this.operation = 'add' // 用于判断提交时是创建还是编辑
        this.addEditDialogTableVisible = true
        this.addEditTitle = '增加设备类型'
      } else {
        this.ruleForm = JSON.parse(JSON.stringify(row))
        // console.log('最开始的this.ruleForm', this.ruleForm)
        this.ruleForm = this.changeFrom(this.ruleForm)
        console.log('将要修改this.ruleForm', this.ruleForm)
        this.operation = 'edit'
        this.addEditDialogTableVisible = true
        this.addEditTitle = '修改设备类型'
      }
    },
    submitForm (formName) {
      // console.log('ruleForm', formName)
      // 例如验证表单数据不能重复）删除一项动态表单后要立刻自动重新验证一下表单 等待dom队列完成再调用
      this.$nextTick(
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operation === 'add') {
              const finalRuleForm = {
                name: this.ruleForm.typeName,
                desc: this.ruleForm.desc,
                protocol: {
                  name: this.ruleForm.protocolName,
                  key: this.ruleForm.domains
                },
                sensors: this.ruleForm.sensor
              }
              console.log('增加的finalRuleForm', finalRuleForm)
              // console.log('增加的ruleForm', this.ruleForm)
              newDeviceType(finalRuleForm).then(res => {
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
                this.getTypeListData()
                this.addEditDialogTableVisible = false
              })
            } else {
              const finalEditRuleForm = {
                name: this.ruleForm.typeName,
                desc: this.ruleForm.desc,
                protocol: {
                  name: this.ruleForm.protocolName,
                  key: this.ruleForm.domains
                },
                sensors: this.ruleForm.sensor,
                _id: this.ruleForm._id,
                createTime: this.ruleForm.createTime
              }
              console.log('编辑的的finalRuleForm', finalEditRuleForm)
              updateDeviceType(finalEditRuleForm).then(res => {
                console.log('编辑好了', res.data)
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
                this.getTypeListData()
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
      this.ruleForm = { // 否则不显示了
        typeName: '',
        desc: '',
        protocolName: '',
        domains: [{
          originalKey: '',
          analyticKey: '',
          unit: ''
        }],
        sensor: [
          {
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
          }
        ]
      }
      this.addEditDialogTableVisible = false
    },
    removeDomain (item) {
      if (this.ruleForm.domains.length <= 2) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      var index = this.ruleForm.domains.indexOf(item)
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1)
      }
    },
    removeSensor (thing, item, child) {
      if (thing !== 'Detections') {
        if (this.ruleForm.sensor.length <= 2) {
          this.disabledSensor = true
        } else {
          this.disabledSensor = false
        }
        var indexs = this.ruleForm.sensor.indexOf(item)
        if (indexs !== -1) {
          this.ruleForm.sensor.splice(indexs, 1)
        }
      } else {
        // console.log('itemitem', item, child)
        var indexss = item.detectionValue.indexOf(child)
        if (indexss !== -1) {
          item.detectionValue.splice(indexss, 1)
        }
      }
    },
    addDomain () {
      // console.log('this.ruleForm.domains.length', this.ruleForm.domains.length)
      if (this.ruleForm.domains.length < 1) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      this.ruleForm.domains.push({
        originalKey: '',
        analyticKey: '',
        unit: ''
      })
    },
    addSensor (thing, item) {
      if (thing !== 'Detections') {
        if (this.ruleForm.sensor.length < 1) {
          this.disabledSensor = true
        } else {
          this.disabledSensor = false
        }
        this.ruleForm.sensor.push({
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
    handleDelete () {},
    protocolNews (index, row) {
      // console.log('index', index, row.protocol.key)
      this.dialogTableVisible = true
      this.dialogTitle = `${row.protocol.name}详情`
      this.gridData = row.protocol.key
    },
    sensorsNews (index, row) {
      // console.log('888', index, row.sensors)
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
    changeFrom (From) { // 之前数据form格式写错了 编辑的时候先这么改
      if (From.sensors.length === 0) { // (From.sensors === []不行 不走这一步 因为From.sensors打印的时候就是 Array(0)
        From.sensors = [
          {
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
          }
        ]
      }
      if (From.protocol.key === null) {
        From.protocol.key = [{
          originalKey: '',
          analyticKey: '',
          unit: ''
        }]
      }
      const final = {}
      final.typeName = From.name
      final.createTime = From.createTime
      final._id = From._id
      final.desc = From.desc
      final.sensor = From.sensors
      final.protocolName = From.protocol.name
      final.domains = From.protocol.key
      return final
    },
    handleSizeChange (value) {
      console.log('每页展示' + value + '条')
      // this.apiLoading = true
      this.per_page = value
      this.getTypeListData()
    },
    handleCurrentChange (value) {
      // 改变页数
      console.log('第' + value + '页')
      // this.apiLoading = true
      this.page = value
      this.getTypeListData()
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
    .top_left {
      width: 400px;
      display: flex;
      justify-content: space-around;
      font-size: 0.9rem;
      .letter {
        padding: 6px;
      }
      .el-input {
        width: 220px;
      }
    }
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
    .el-dialog {
      .el-dialog__body {
        .el-table {
        }
      }
    }
  }
  .dail {
    // /deep/ .el-form .el-form-item .el-form-item__label {
    //   width: 60px;
    // }
    /deep/ .el-dialog__body {
      overflow-y: overlay;
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
        // &::-webkit-scrollbar {
        //   width: 4px; /*滚动条宽度*/
        //   height: 6px; /*滚动条高度*/
        // }
        // &::-webkit-scrollbar-track {
        //   border-radius: 10px; /*滚动条的背景区域的圆角*/
        //   background-color: #eeeeee; /*滚动条的背景颜色*/
        // }
        // &::-webkit-scrollbar-thumb {
        //   border-radius: 10px; /*滚动条的圆角*/
        //   background-color: rgb(192, 190, 190); /*滚动条的背景颜色*/
        // }
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
.el-table {
  @include scrollClass()
}
.el-form {
  @include scrollClass()
}
/deep/ .el-dialog .el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}
/deep/ .el-divider--horizontal {
  margin-top: 0;
}
/deep/ .el-table::before {
  width: 0;
}
</style>
