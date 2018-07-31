<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" :rules="formRules" ref="searchForm" size="small">
      <el-form-item prop="calMonth">
        <el-date-picker required v-model="searchForm.calMonth" value-format="yyyyMM" :picker-options="pickerOptions" type="month" placeholder="选择月"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.channelId" clearable placeholder="渠道">
          <el-option v-for="item in channel_list" :key="item.id" :label="item.channelName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" clearable placeholder="用户类型">
          <el-option v-for="item in usertype_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input  placeholder="用户名称" clearable v-model="searchForm.userName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="onExport()">导出</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="incomeList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">

      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="userName" label="用户名称" >
      </el-table-column>
      <el-table-column prop="userType" label="用户类型"  width="150">
        <template slot-scope="scope" >
          {{scope.row.userType | userTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="incomeAmount" label="收入"  width="150">
      </el-table-column>
      <el-table-column prop="channelName" label="渠道"  width="150">
      </el-table-column>
      <el-table-column prop="backRate" label="佣金比例"  width="150">
        <template slot-scope="scope" >
          {{scope.row.backRate | persentFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="realAmount" label="实际收入"  width="150">
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
  </div>
</template>

<script>
  import { listChannel } from '@/api/channel'
  import { listIncome } from '@/api/report'
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            var date = new Date()
            date.setDate(1)
            date.setDate(-1)
            return time.getTime() > date.getTime()
          }
        },
        channel_list: [],
        usertype_options: [
          { value: '01', label: '企业用户' },
          { value: '02', label: '商业用户' },
          { value: '03', label: '家庭用户' },
          { value: '04', label: '合租用户' }
        ],
        listLoading: false,
        searchForm: {
          calMonth: '',
          channelId: '',
          userType: '',
          userName: ''
        },
        formRules: {
          calMonth: [{ required: true, message: '月份不能为空', trigger: 'blur' }]
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        incomeList: null
      }
    },
    filters: {
      userTypeFilter(status) {
        if (status === '01') {
          return '企业用户'
        } else if (status === '02') {
          return '商业用户'
        } else if (status === '03') {
          return '家庭用户'
        } else if (status === '04') {
          return '合租用户'
        }
        return '企业用户'
      },
      persentFilter(num) {
        return num * 100 + '%'
      }
    },
    created() {
      this.fecthChannelData()
    },
    methods: {
      fecthChannelData() {
        listChannel({ pageNum: 0, pageSize: 1000 }).then(response => {
          this.channel_list = response.data.data
        }).catch(() => {
        })
      },
      fetchData() {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            listIncome({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
              this.total = response.data.total
              this.pageNum = Number(response.data.pageNum)
              this.incomeList = response.data.data
              this.listLoading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
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
      onExport() {
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            var filter = JSON.stringify(this.searchForm)
            var url = process.env.BASE_API + '/api/finance/exportPlatformIncome?json=' + filter
            var ifrim = document.createElement('iframe')
            ifrim.style.display = 'none'
            ifrim.src = url
            ifrim.onload = function() {
              document.body.removeChild(ifrim)
            }
            document.body.appendChild(ifrim)
          } else {
            return false
          }
        })
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