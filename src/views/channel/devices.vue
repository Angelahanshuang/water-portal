<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="渠道名称" clearable v-model="searchForm.channelName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="deviceList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      
     <!-- 详情 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-row>
              <el-col :span="18">
                <el-form-item label="设备SN">
                   <span>{{ props.row.devSn}}</span>
                 </el-form-item>
                 <el-form-item label="设备地址">
                   <span>{{ props.row.devAddress }}</span>
                 </el-form-item>
                 <el-form-item label="联系人">
                   <span>{{ props.row.contractName }}</span>
                 </el-form-item>
                 <el-form-item label="联系电话">
                   <span>{{ props.row.contractTel }}</span>
                 </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="id" label="设备编号" >
      </el-table-column>
      <el-table-column prop="userType" label="用户类型"  width="150">
        <template slot-scope="scope" >
          {{scope.row.userType | userTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="operType" label="使用方式"  width="150">
        <template slot-scope="scope" >
          {{scope.row.operType | operTypeFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名称"  width="150">
      </el-table-column>
      <el-table-column prop="contractName" label="联系人"  width="150">
      </el-table-column>
      <el-table-column prop="contractTel" label="联系电话"  width="150">
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
  import { listDevice } from '@/api/channel'
  export default {
    data() {
      return {
        listLoading: true,
        searchForm: {
          channelName: ''
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        deviceList: null
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
      },
      operTypeFilter(status) {
        return status === '01' ? '按时' : '按流量'
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        listDevice({ pageNum: this.pageNum, pageSize: this.pageSize, channelId: this.$route.params.id }).then(response => {
          this.total = response.data.total
          this.pageNum = Number(response.data.pageNum)
          this.deviceList = response.data.data
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