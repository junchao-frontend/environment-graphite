// import { showRealTimeData } from '@/api/dataCenter'

const VueMixin = {
  methods: {
    getRowClass ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'font-weight:200;background-color:#F4F4FF;color:black;'
      } else {
        return ''
      }
    }
  }
}
export const dataCenter = {
  mounted () {
    this.getAllData()
  },
  methods: {

    getAllData () {
      // const params = {
      //   currPage: this.currPage,
      //   pageSize: this.pageSize,
      //   deviceTypeId: this.deviceTypeId
      // }
      // showRealTimeData(params).then(res => {
      //   console.log(res)
      //   if (res.data.code === 200) {
      //     this.tableData = res.data.data.results
      //     this.total = res.data.data.totalCount
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    },

    handleSizeChange (val) {
      this.pageSize = val
      this.getAllData()
    },
    handleCurrentChange (val) {
      this.currPage = val
      this.getAllData()
    }
  }
}

export default VueMixin
