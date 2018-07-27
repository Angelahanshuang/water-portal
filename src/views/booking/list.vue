<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="姓名或手机号" v-model="searchForm.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.times" :default-time="['00:00:00','23:59:59']" type="datetimerange" range-separator="至" start-placeholder="开始日期" value-format="yyyyMMddHHmmss" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.status" clearable placeholder="状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onExport()">导出</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="deskList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      
     <!-- 详情 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-row>
              <el-col :span="18">
                <el-form-item label="姓名">
                   <span>{{ props.row.userName}}</span>
                 </el-form-item>
                 <el-form-item label="电话">
                   <span>{{ props.row.userTel }}</span>
                 </el-form-item>
                 <el-form-item label="地址">
                   <span>{{ props.row.userAddress }}</span>
                 </el-form-item>
                 <el-form-item label="状态">
                   <span>{{ props.row.status | statusFilter }}</span>
                 </el-form-item>
                 <el-form-item label="上门时间">
                   <span>{{ props.row.installTime | formatDate }}</span>
                 </el-form-item>
                 <el-form-item label="备注">
                   <span>{{ props.row.remark }}</span>
                 </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="userName" label="姓名"  width="150">
      </el-table-column>
      <el-table-column prop="userTel" label="电话"  width="150">
      </el-table-column>
      <el-table-column prop="installTime" :formatter="dateFormat" label="上门时间"  width="150">
      </el-table-column>
      <el-table-column prop="userAddress" label="地址" >
      </el-table-column>
      <el-table-column prop="status" label="状态"  width="150">
        <template slot-scope="scope" >
        {{scope.row.status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="150">
        <template slot-scope="scope" >
         <el-button v-if="scope.row.status === '01'" size="small" type="primary" icon="el-icon-edit" 
         @click="onEdit(scope.row)">编辑预约时间</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      :current-page.sync="pageNum"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="text-align:right;">
    </el-pagination>
    <!-- </el-col> -->
    <el-dialog
      title="填写上门安装时间"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form  :model="editForm" label-width="80px" size="small">
        <el-form-item label="时间">
          <el-date-picker
            v-model="editForm.installTime" type="datetime" value-format="yyyyMMddHHmmss" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input  placeholder="备注" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConform">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { lisBooking, operBooking } from '@/api/booking'
  import { formatDate } from '@/utils/date'
  export default {
    data() {
      return {
        dialogVisible: false,
        options: [
          { value: '01', label: '未处理' },
          { value: '02', label: '已处理' }
        ],
        listLoading: true,
        editForm: {
          id: '',
          installTime: '',
          remark: ''
        },
        searchForm: {
          info: '',
          times: [],
          status: ''
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        deskList: null
      }
    },
    filters: {
      formatDate(date) {
        if (date === '') {
          return date
        }
        return formatDate(date)
      },
      statusFilter(status) {
        return status === '01' ? '未处理' : '已处理'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      dateFormat(row, column) {
        var date = row[column.property]
        if (date === undefined) {
          return ''
        }
        if (date === '') {
          return ''
        }
        return formatDate(date)
      },
      fetchData() {
        var queryOpions = {
          info: this.searchForm.info,
          status: this.searchForm.status,
          beginTime: this.searchForm.times === null ? '' : this.searchForm.times[0],
          endTime: this.searchForm.times === null ? '' : this.searchForm.times[1]
        }

        lisBooking({ pageNum: this.pageNum, pageSize: this.pageSize, json: queryOpions }).then(response => {
          this.total = response.data.total
          this.pageNum = Number(response.data.pageNum)
          this.deskList = response.data.data
          this.listLoading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSizeChange(val) {
        this.pageNum = val
        this.fetchData()
      },
      onCurrentChange(val) {
        this.pageNum = val
        this.fetchData()
      },
      onSearch() {
        this.pageNum = 1
        this.fetchData()
      },
      onEdit(row) {
        this.editForm.id = row.id
        this.dialogVisible = true
      },
      onExport() {
        var queryOpions = {
          info: this.searchForm.info,
          status: this.searchForm.status,
          beginTime: this.searchForm.times === null ? '' : this.searchForm.times[0],
          endTime: this.searchForm.times === null ? '' : this.searchForm.times[1]
        }
        var filter = JSON.stringify(queryOpions)
        var url = process.env.BASE_API + '/api/booking/export?json=' + filter
        var ifrim = document.createElement('iframe')
        ifrim.style.display = 'none'
        ifrim.src = url
        ifrim.onload = function() {
          document.body.removeChild(ifrim)
        }
        document.body.appendChild(ifrim)
      },
      onConform() {
        operBooking({ json: this.editForm }).then(response => {
          this.fetchData()
        }).catch(() => {
        })

        this.dialogVisible = false
      }
    }
  }
</script>

<style type="text/css">
.table-expand {
   font-size: 0;
 }
 .table-expand label {
   width: 90px;
   color: #99a9bf;
 }
  .table-expand .el-form-item {
    margin: 0;
      border-bottom: 1px solid #ebeef5;
      width: 100%;
    }
    .table-expand .table-expand-100 {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
      }
  .table-expand .el-form-item__content, .table-expand .el-form-item__label{
    line-height: 30px;
  }
</style>