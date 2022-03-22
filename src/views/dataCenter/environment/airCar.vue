<template>
 <div class="CEMS">
   <div class="card-search">
      <el-form size="small" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备">
          <el-select ref="selectdevice" v-model="formInline.deviceName" placeholder="选择设备">
            <el-option label="东跨吸料天车" value="东跨吸料天车"></el-option>
            <el-option label="西跨吸料天车" value="西跨吸料天车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间粒度">
          <el-select ref="selectime" v-model="formInline.timeSize" placeholder="选择设备类型">
            <el-option label="分钟" value="Min">分钟</el-option>
            <el-option label="实时" value="Now">实时</el-option>
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
         >
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
      </div>
      <div>
        <el-table-column
          fixed
          align="center"
          label="设备名">
          {{formInline.deviceName}}
        </el-table-column>
      </div>
      <div v-if="control.timeSize =='Now'">
        <el-table-column
          align="center"
          v-for="item in tableData"
          :key="item.key"
          :label="item.key">
          <template slot="header" slot-scope="">
            <div class="center">风机运行信号</div>
          </template>
          <template slot-scope="scope">
            {{scope.row.value}}
          </template>
        </el-table-column>
      </div>
      <div v-else>
        <el-table-column
          align="center"
          v-for="(item,index) in tableData[0].data"
          :key="item.key"
          :label="item.key">
          <template slot="header" slot-scope="">
            <div class="center">{{item.key}}</div>
            <div class="center">{{item.unit ? `(${item.unit})` : ''}}</div>
          </template>
          <template slot-scope="scope">
            {{scope.row.data[index].value}}
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
import { getAirCarData } from '@/api/dataCenter'

export default {
  name: 'test',
  components: {},
  data () {
    return {
      currPage: 1,
      pageSize: 10,
      total: 100,
      control: {
        timeSize: 'Min',
        deviceName: '',
        data: '平均值'
      },
      formInline: {
        time: ['', ''],
        deviceName: '东跨吸料天车',
        timeSize: 'Min',
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
    this.getData()
  },
  methods: {
    onSubmit () {
    //   console.log(this.$refs.selectime.selectedLabel)
      if (this.$refs.selectime.selectedLabel === '实时') {
        this.control.timeSize = 'Now'
      } else {
        this.control.timeSize = 'Min'
      }
      //   this.control.timeSize = this.$refs.selectime.selectedLabel
      this.getData()
    },
    getControl () {
      if (this.$refs.selectime.selectedLabel === '实时') {
        this.control.timeSize = 'Now'
      } else {
        this.control.timeSize = 'Min'
      }
      //   this.control.deviceName = this.$refs.selectdevice.selectedLabel
    //   this.control.data = this.$refs.selectData.selectedLabel
    },
    // 获取所有设备
    getDevice () {
    //   const params = {
    //     _id: '61d9601597ebb3c90fed18a7' // 写死
    //   }
    //   getCEMSDeviceByType(params).then(res => {
    //     console.log('resres', res)
    //     if (res.data.code === 200) {
    //       this.deviceList = res.data.data
    //       this.formInline.deviceName = res.data.data[0].code
    //       this.getData()
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    },
    // 获取所有数据
    getData () {
      const that = this
      if (that.formInline.time === null) {
        that.formInline.time = ['', '']
      }
      var boxid = ''
      if (this.formInline.deviceName === '东跨吸料天车') {
        boxid = 'f73fe0d8688046e088bb073849aa0c3f'
      } else {
        boxid = 'b46a0faf11cc4000a4c290eba5cc949a'
      }
      const params = {
        boxId: boxid,
        dataTime: that.formInline.timeSize,
        pageSize: that.pageSize,
        currPage: that.currPage,
        startTime: that.formInline.time[0],
        endTime: that.formInline.time[1]
      }
      getAirCarData(params).then(res => {
        console.log(res)
        if (res.data.code === 200) {
        //   this.getControl()
          console.log(res)
          that.tableData = res.data.data.dataSet
          this.total = res.data.data.totalCount
          console.log(that.tableData)
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
// .center{text-align: center;}
</style>
