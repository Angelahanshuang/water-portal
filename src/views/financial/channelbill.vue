<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :rules="rules" ref="searchForm" :model="searchForm" size="mini">
      <el-form-item>
        <el-input  placeholder="渠道名称" v-model="searchForm.deskNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.month" type="month" placeholder="时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.status" clearable placeholder="状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch('searchForm')">查询</el-button>
      </el-form-item>
    </el-form>

    <!--表格-->
    <el-table :data="arrays" element-loading-text="拼命加载中" empty-text="请根据条件进行查询" style="width: 100%;">
      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="sumAmount" label="渠道" >
      </el-table-column>
      <el-table-column  prop="sumFee" label="收入" >
      </el-table-column>
      <el-table-column  prop="sumFee" label="佣金比例" >
      </el-table-column>
      <el-table-column  prop="sumFee" label="结算金额" >
      </el-table-column>
      <el-table-column  prop="sumFee" label="结算状态" >
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import { summaryBill } from '@/api/bill'
  export default {
    data() {
      return {
        searchForm: {
          times: []
        },
        arrays: [],
        rules: {
          times: [
            { required: true, message: '日期范围必填', trigger: 'change' }
          ]
        }
      }
    },
    created() {
    },
    methods: {
      fetchData() {
        var queryOpions = {
          startTime: this.searchForm.times === null ? '' : this.searchForm.times[0],
          endTime: this.searchForm.times === null ? '' : this.searchForm.times[1]
        }
        summaryBill(queryOpions).then(response => {
          this.arrays = []
          this.arrays.push(response.data)
        }).catch(() => {
        })
      },
      merchantChange(val) {
        if (val) {
          this.searchForm.storeId = ''
        }
      },
      onSearch(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fetchData()
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