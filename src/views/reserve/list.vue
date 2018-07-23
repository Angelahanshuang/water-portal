<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="姓名或手机号" v-model="searchForm.deskNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="searchForm.month" type="month" placeholder="选择月">
      </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.status" clearable placeholder="状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="deskList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      
     <!-- 详情 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-row>
              <el-col :span="6">
                <img style="width:210px;height:210px;" :src="props.row.qrUrl"  />
              </el-col>
              <el-col :span="18">
                <el-form-item label="姓名">
                   <span>{{ props.row.id}}</span>
                 </el-form-item>
                 <el-form-item label="电话">
                   <span>{{ props.row.deskNo }}</span>
                 </el-form-item>
                 <el-form-item label="地址">
                   <span>{{ props.row.status | statusFilter }}</span>
                 </el-form-item>
                 <el-form-item label="上门时间">
                   <span>{{ props.row.createTime | formatDate}}</span>
                 </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="deskNo" label="姓名"  width="150">
      </el-table-column>
      <el-table-column prop="status" label="电话"  width="150">
        <template slot-scope="scope" >
        {{scope.row.status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="deskNo" label="地址"  width="150">
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" label="上门时间">
      </el-table-column>
      <el-table-column prop="status" label="状态"  width="150">
        <template slot-scope="scope" >
        {{scope.row.status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="150">
        <template slot-scope="scope" >
         <el-button size="small" type="primary" icon="el-icon-edit" 
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
  </div>
</template>

<script>
  import { listDesk } from '@/api/desk'
  import { formatDate } from '@/utils/date'
  export default {
    data() {
      return {
        options: [
          { value: '01', label: '启用' },
          { value: '02', label: '停用' }
        ],
        listLoading: true,
        searchForm: {
          deskNo: '',
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
        return formatDate(date)
      },
      statusFilter(status) {
        return status === '01' ? '启用' : '停用'
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
        listDesk({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
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
      onAdd() {
        this.$router.push({ path: '/desk/add' })
      },
      onEdit(row) {
        this.$router.push({ path: '/desk/edit/' + row.id + '/' + row.status, query: { pNum: this.pageNum }})
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