<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="用户名称" v-model="searchForm.userName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" clearable placeholder="用户类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="installuserList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="userName" label="用户名称" width="150">
      </el-table-column>
      <el-table-column prop="userType" label="用户类型"  width="150">
        <template slot-scope="scope" >
          {{scope.row.userType | userTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="userEmail" label="对账邮箱">
      </el-table-column>
      <el-table-column prop="contractName" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="contractTel" label="电话" width="150">
      </el-table-column>
      <el-table-column prop="devNum" label="设备数量" width="150">
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="150">
        <template slot-scope="scope" >
         <el-button size="small" type="primary"  
         @click="onEdit(scope.row)">编辑</el-button>
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
  </div>
</template>

<script>
  import { listInstalluser } from '@/api/installuser'
  export default {
    data() {
      return {
        options: [
          { value: '01', label: '企业' },
          { value: '02', label: '商业' },
          { value: '03', label: '家庭' },
          { value: '04', label: '合租' }
        ],
        listLoading: true,
        searchForm: {
          userName: '',
          userType: ''
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        installuserList: null
      }
    },
    filters: {
      userTypeFilter(status) {
        if (status === '01') {
          return '企业'
        } else if (status === '02') {
          return '商业'
        } else if (status === '03') {
          return '家庭'
        } else if (status === '04') {
          return '合租'
        }
        return '企业'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        listInstalluser({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
          this.total = response.data.total
          this.pageNum = Number(response.data.pageNum)
          this.installuserList = response.data.data
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
        this.$router.push({ path: '/installuser/edit/' + row.id, query: { pNum: this.pageNum }})
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