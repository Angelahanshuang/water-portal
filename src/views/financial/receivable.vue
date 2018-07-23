<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="用户名称" v-model="searchForm.deskNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.month" type="month" placeholder="时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.status" clearable placeholder="销账状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch('searchForm')">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="billList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      
     <!-- 详情 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-row>
              <el-col :span="18">
                <el-form-item label="支付流水号">
                   <span>{{ props.row.id}}</span>
                 </el-form-item>
                 <el-form-item label="流水金额">
                   <span>{{ props.row.amount }}</span>
                 </el-form-item>
                 <el-form-item label="手续费">
                   <span>{{ props.row.fee }}</span>
                 </el-form-item>
                 <el-form-item label="订单编号">
                   <span>{{ props.row.orderId }}</span>
                 </el-form-item>
                 <el-form-item label="门店ID">
                   <span>{{ props.row.storeId }}</span>
                 </el-form-item>
                 <el-form-item label="创建时间">
                   <span>{{ props.row.createDateTime | formatDate}}</span>
                 </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="id" label="用户名称"  width="280">
      </el-table-column>
      <el-table-column prop="amount" label="应收金额"  width="150">
      </el-table-column>
      <el-table-column prop="fee" label="销账状态"  width="150">
      </el-table-column>
      <el-table-column prop="createDateTime" :formatter="dateFormat" label="销账时间" >
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="150">
        <template slot-scope="scope" >
         <el-button size="small" type="primary" icon="el-icon-edit" 
         @click="onEdit(scope.row)">销账</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="text-align:right;">
    </el-pagination>
  </div>
</template>

<script>
  import { listBill } from '@/api/bill'
  import { formatDate } from '@/utils/date'
  export default {
    data() {
      return {
        options: null,
        listLoading: true,
        searchForm: {
          storeId: '',
          orderId: '',
          times: []
        },
        pageNum: 1,
        total: 0,
        pageSize: 10,
        billList: null
      }
    },
    filters: {
      formatDate(date) {
        return formatDate(date)
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
        return formatDate(date)
      },
      fetchData() {
        var queryOpions = {
          orderId: this.searchForm.orderId,
          storeId: this.searchForm.storeId,
          beginTime: this.searchForm.times === null ? '' : this.searchForm.times[0],
          endTime: this.searchForm.times === null ? '' : this.searchForm.times[1]
        }
        listBill({ pageNum: this.pageNum, pageSize: this.pageSize, json: queryOpions }).then(response => {
          this.total = response.data.total
          this.billList = response.data.data
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