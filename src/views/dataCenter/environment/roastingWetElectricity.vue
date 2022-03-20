<template>
 <div class="CEMS">
   <div class="card-search">
      <el-form size="small" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备">
          <el-select ref="selectdevice" v-model="deviceName" placeholder="选择设备">
            <!-- <el-option v-for="(item, index) in deviceList" :key="index" :label="item.name" :value="item.code"></el-option> -->
            <el-option label="焙烧湿电" value="roasting"></el-option>
            <el-option label="隧道窑湿电" value="tunnel"></el-option>
            <el-option label="石墨化湿电" value="graphitization"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间粒度">
          <el-select ref="selectime" v-model="formInline.timeSize" placeholder="选择设备类型">
            <el-option label="分钟" value="Min">分钟</el-option>
            <el-option label="十分钟" value="Ten">十分钟</el-option>
            <el-option label="三十分钟" value="Thirty">三十分钟</el-option>
            <el-option label="小时" value="Hour">小时</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="formInline.timeSize != '实时' && formInline.timeSize != 'Min'" label="数据">
          <el-select  ref="selectData"  v-model="control.data" placeholder="选择数据">
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
        <!-- <div class="stateClass">
        状态:
        <div :class="judgeState ? 'greenLight' : 'redLight'"></div>
        <div style="font-size: 0.9rem;margin-top:3px">{{this.deviceStatus}}</div>
      </div> -->
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
          width="100px">
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
          width="120">
          {{deviceLabel}}
        </el-table-column>
      </div>
      <div v-if="control.timeSize =='Min'">
        <el-table-column
          width="120"
          align="center"
          v-for="(item,index) in tableData[0].data"
          :key="index"
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
      <div v-else>
        <el-table-column
          width="120px"
          align="center"
          v-for="(item,index) in tableData[0].data[Datafilter]"
          :key="index"
          :label="item.key">
          <template slot="header" slot-scope="">
            <div class="center">{{item.key}}</div>
            <div class="center">{{item.unit ? `(${item.unit})` : ''}}</div>
          </template>
          <template slot-scope="scope">
            {{scope.row.data[Datafilter][index].value}}
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
import { getWetElectricity } from '@/api/dataCenter'

export default {
  name: 'test',
  components: {},
  data () {
    return {
      currPage: 1,
      pageSize: 10,
      judgeState: false,
      total: 100,
      deviceName: 'roasting', // 焙烧湿电
      deviceLabel: '焙烧湿电',
      Datafilter: '平均值', // 平均值最大值筛选
      boxId: '01e844f884844aa2bb5d1cab87316c17',
      deviceList: [],
      deviceStatus: '',
      tableData: [
        {
          data: []
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      control: {
        timeSize: 'Min',
        deviceName: '',
        data: '平均值'
      },
      // 时间粒度选择框
      formInline: {
        deviceName: '',
        time: ['', ''],
        timeSize: 'Min',
        data: '平均值'
      }
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.getData()
  },
  methods: {
    onSubmit () {
      this.control.timeSize = this.formInline.timeSize
      if (this.$refs.selectData.selectedLabel === '平均值') {
        this.Datafilter = '平均值'
      } else if (this.$refs.selectData.selectedLabel === '最小值') {
        this.Datafilter = '最小值'
      } else {
        this.Datafilter = '最大值'
      }
      this.getData()
    },
    // 判断不同设备 获取不同设备id && 还有时间粒度  平均值
    getControl () {
      this.deviceName = this.$refs.selectdevice.value
      if (this.deviceName === 'roasting') {
        this.boxId = '01e844f884844aa2bb5d1cab87316c17'
      } else if (this.deviceName === 'tunnel') {
        this.boxId = '5cba298477bc456ab1a2bd06e35cb0d8'
      } else if (this.deviceName === 'graphitization') {
        this.boxId = '69fb82a9cba744188cab9da766787f25'
      }
    },
    getData () {
      this.getControl()
      const params = {
        boxId: this.boxId,
        dataTime: this.formInline.timeSize,
        pageSize: this.pageSize,
        currPage: this.currPage,
        startTime: this.formInline.time[0],
        endTime: this.formInline.time[1]
      }
      getWetElectricity(params).then(res => {
        if (res.data.code === 200) {
          if (this.deviceName === 'roasting') {
            this.deviceLabel = '焙烧湿电'
          } else if (this.deviceName === 'tunnel') {
            this.deviceLabel = '隧道窑湿电'
          } else if (this.deviceName === 'graphitization') {
            this.deviceLabel = '石墨化湿电'
          }
          this.tableData = res.data.data.dataSet
          this.deviceStatus = res.data.data.deviceStatus
          if (this.deviceStatus === '离线') {
            this.judgeState = false
          } else {
            this.judgeState = true
          }
          this.total = res.data.data.totalCount
          this.tableData.splice(1, 0)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取所有数据
    // getData () {
    //   const that = this
    //   const params = {
    //     currPage: that.currPage,
    //     pageSize: that.pageSize,
    //     collName: that.formInline.timeSize,
    //     deviceCode: that.formInline.deviceName
    //   }
    //   getCEMSDeviceData(params).then(res => {
    //     // console.log(that.$refs

    //     if (res.data.code === 200) {
    //       this.getControl()
    //       that.tableData = res.data.data.dataSet
    //       this.total = res.data.data.total
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
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
.demo-form-inline{
    display: flex;
}
.stateClass {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 5px 10px 10px 20px;
      width: 200px;
      .greenLight {
        margin: 6px 3px 4px 15px;
        width: 0.7rem;
        height: 0.7rem;
        background-color: rgb(133, 231, 163);
        border-radius: 0.4rem;
        border: 1px solid rgba(41, 241, 101, 0.349);
      }
      .redLight {
        margin: 6px 3px 4px 15px;
        width: 0.7rem;
        height: 0.7rem;
        background-color: rgb(219, 99, 99);
        border-radius: 0.4rem;
        border: 1px solid rgba(241, 148, 41, 0.349);
      }
    }
// .center{text-align: center;}
</style>
