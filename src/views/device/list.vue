<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="mini">
      <el-form-item>
        <el-input placeholder="设备编号" clearable v-model="searchForm.devId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="设备SN" clearable v-model="searchForm.devSn"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.devType" clearable placeholder="工作模式">
          <el-option v-for="item in workModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.userType" clearable placeholder="用户类型">
          <el-option v-for="item in userTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.devStatus" clearable placeholder="设备状态">
          <el-option v-for="item in devStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="devList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="id" label="设备编号" width="150">
      </el-table-column>
      <el-table-column prop="devSn" label="设备SN">
      </el-table-column>
      <el-table-column prop="userType" label="用户类型"  width="150">
        <template slot-scope="scope" >
        {{scope.row.userType | userTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="devStatus" label="设备状态"  width="150">
        <template slot-scope="scope" >
        {{scope.row.devStatus | devStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="devType" label="工作模式"  width="150">
        <template slot-scope="scope" >
        {{scope.row.devType | workModeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" :formatter="dateFormat"  label="更新时间"  width="150">
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
  import { listDevs } from '@/api/device'
  import { formatDate } from '@/utils/date'
  export default {
    data() {
      return {
        listLoading: true,
        devStatusOptions: [
          { value: '0', label: '备用' },
          { value: '1', label: '待激活' },
          { value: '2', label: '出厂测试状态' },
          { value: '3', label: '正常制水' },
          { value: '4', label: '欠费' },
          { value: '5', label: '故障' },
          { value: '6', label: '关机' },
          { value: '7', label: '水满' },
          { value: '8', label: '缺水' },
          { value: '9', label: '漏水' },
          { value: '10', label: '滤芯待复位' },
          { value: '11', label: '硬件测试' }
        ],
        userTypeOptions: [
          { value: '01', label: '企业用户' },
          { value: '02', label: '商业用户' },
          { value: '03', label: '家庭用户' },
          { value: '04', label: '合租用户' }
        ],
        workModeOptions: [
          { value: '0', label: '流量模式' },
          { value: '1', label: '时长模式' }
        ],
        searchForm: {
          devId: '',
          devSn: '',
          devType: '',
          userType: '',
          devStatus: ''
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        devList: null
      }
    },
    filters: {
      formatDate(date) {
        if (date === '') {
          return date
        }
        return formatDate(date)
      },
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
      devStatusFilter(status) {
        if (status === '0') {
          return '备用'
        } else if (status === '1') {
          return '待激活'
        } else if (status === '2') {
          return '出厂测试状态'
        } else if (status === '3') {
          return '正常制水'
        } else if (status === '4') {
          return '欠费'
        } else if (status === '5') {
          return '故障'
        } else if (status === '6') {
          return '关机'
        } else if (status === '7') {
          return '水满'
        } else if (status === '8') {
          return '缺水'
        } else if (status === '9') {
          return '漏水'
        } else if (status === '10') {
          return '滤芯待复位'
        } else if (status === '11') {
          return '硬件测试'
        }
        return '正常制水'
      },
      workModeFilter(mode) {
        if (mode === '0') {
          return '流量模式'
        } else if (mode === '1') {
          return '时长模式'
        }
        return '流量模式'
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
        listDevs({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
          this.total = response.data.total
          this.pageNum = Number(response.data.pageNum)
          this.devList = response.data.data
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