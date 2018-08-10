<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="设备编号" v-model="searchForm.devId" clearable></el-input>
      </el-form-item>
      <el-form-item >
        <el-input style="width:280px"  placeholder="微信ID" v-model="searchForm.openId" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker required v-model="searchForm.date" value-format="yyyyMMdd"  type="date" placeholder="日期"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onExport()">导出</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="useList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="devId" label="设备编号" width="150">
      </el-table-column>
      <el-table-column prop="openId" label="微信ID" >
      </el-table-column>
      <el-table-column prop="useFlow" label="使用流量(ml)"  width="150">
      </el-table-column>
      <el-table-column prop="useAmount" label="使用金额(元)" width="150">
      </el-table-column>
      <el-table-column prop="useTime" label="使用时间" width="150">
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
  import { useList } from '@/api/report'
  export default {
    data() {
      return {
        listLoading: true,
        searchForm: {
          devId: '',
          openId: '',
          date: ''
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        useList: null
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        useList({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
          this.total = response.data.total
          this.pageNum = Number(response.data.pageNum)
          this.useList = response.data.data
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
      onExport() {
        var filter = JSON.stringify(this.searchForm)
        var url = process.env.BASE_API + '/api/user/exportUseList?json=' + filter
        var ifrim = document.createElement('iframe')
        ifrim.style.display = 'none'
        ifrim.src = url
        ifrim.onload = function() {
          document.body.removeChild(ifrim)
        }
        document.body.appendChild(ifrim)
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