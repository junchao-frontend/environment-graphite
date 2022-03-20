<template>
 <div class="CEMS">
   <div class="card-search">
      <el-form size="small" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备">
          <el-select ref="selectdevice" v-model="formInline.deviceName" placeholder="选择设备">
            <el-option v-for="(item, index) in deviceList" :key="index" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间粒度">
          <el-select ref="selectime" v-model="formInline.timeSize" placeholder="选择设备类型">
            <el-option label="实时" value="DataRealTimeHisColl">实时</el-option>
            <el-option label="分钟" value="DataMinuteHisColl">分钟</el-option>
            <el-option label="小时" value="DataHourHisColl">小时</el-option>
            <el-option label="天" value="DataDayHisColl">天</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="formInline.timeSize != '实时' && formInline.timeSize != 'DataRealTimeHisColl'" label="数据">
          <el-select  ref="selectData"  v-model="formInline.data" placeholder="选择数据">
            <el-option label="平均值" value="平均值"></el-option>
            <el-option label="最小值" value="最小值"></el-option>
            <el-option label="最大值" value="最大值"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="formInline.time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh-mm-ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
   </div>
   <div class="card-table">
    <el-table
      :header-cell-style="getRowClass"
      :data="tableData"
      style="width: 100%">
      <div>
        <el-table-column
          fixed
          align="center"
          label="时间"
          width="">
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
      </div>
      <div>
        <el-table-column
          fixed
          align="center"
          label="设备名"
          width="">
          {{control.deviceName}}
        </el-table-column>
      </div>
      <div v-if="control.timeSize =='实时' || control.timeSize =='DataRealTimeHisColl'">
        <el-table-column
          width=""
          align="center"
          v-for="(item,index) in tableData[0].data"
          :key="index"
          :label="item.name">
          <template slot="header" slot-scope="">
            <div class="center">{{item.name}}</div>
            <div class="center">({{item.unit}})</div>
          </template>
          <template slot-scope="scope">
            {{scope.row.data[index].value}}
          </template>
        </el-table-column>
      </div>
      <div v-else>
        <el-table-column
          width=""
          align="center"
          v-for="(item,index) in tableData[0].data[control.data]"
          :key="index">
          <template slot="header" slot-scope="">
            <div class="center">{{item.Name}}</div>
            <div class="center">({{item.Unit}})</div>
          </template>
          <template slot-scope="scope">
            {{scope.row.data[control.data][index].Value}}
          </template>
        </el-table-column>
      </div>
    </el-table>
    <div
      v-if="tableData.length !== 0"
      class="block"
      style="display: flex; flex-direction: row-reverse; margin-top: 10px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-currPage="currPage"
        :currPage-sizes="[10, 20, 30, 40]"
        :currPage-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
   </div>
 </div>
</template>

<script>
import { getUnOrgVOCByType, getUnOrgVOCData } from '@/api/environments/unorgVOC'

export default {
  name: 'test',
  components: {},
  data () {
    return {
      currPage: 1,
      pageSize: 10,
      total: 100,
      control: {
        timeSize: 'DataRealTimeHisColl',
        deviceName: '',
        data: '平均值'
      },
      formInline: {
        time: ['', ''],
        deviceName: '',
        timeSize: 'DataRealTimeHisColl',
        data: '平均值'
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      deviceList: [],
      tableData: [
        {
          data: []
        }
      ]
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getDevice()
  },
  methods: {
    onSubmit () {
      this.control.timeSize = this.$refs.selectime.selectedLabel
      this.getData()
    },
    getControl () {
      this.control.timeSize = this.$refs.selectime.selectedLabel
      this.control.deviceName = this.$refs.selectdevice.selectedLabel
      this.control.data = this.$refs.selectData.selectedLabel
    },
    // 获取所有设备
    getDevice () {
      const params = {
        _id: '61ee4e0bc38b3e3bb214f84b'
      }
      getUnOrgVOCByType(params).then(res => {
        console.log('resresType', res)
        if (res.data.code === 200) {
          this.deviceList = res.data.data
          this.formInline.deviceName = res.data.data[0].code
          this.getData()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取所有数据
    getData () {
      const that = this
      if (that.formInline.time === null) {
        that.formInline.time = ['', '']
      }
      const params = {
        currPage: that.currPage,
        pageSize: that.pageSize,
        collName: that.formInline.timeSize,
        deviceCode: that.formInline.deviceName,
        startTime: that.formInline.time[0],
        endTime: that.formInline.time[1]
      }
      getUnOrgVOCData(params).then(res => {
        console.log('resresData', res)
        if (res.data.code === 200) {
          this.getControl()
          that.tableData = res.data.data.dataSet
          this.total = res.data.data.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 分页
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.currPage = val
      this.getData()
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
/deep/ .el-table .el-table__cell {
  padding: 15px 0;
}
</style>
