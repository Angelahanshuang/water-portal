<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" size="small">
      <el-form-item>
        <el-input  placeholder="渠道名称" clearable v-model="searchForm.productName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--表格-->
    <el-table :data="productList" v-loading="listLoading" element-loading-text="拼命加载中" style="width: 100%;">
      
     <!-- 详情 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-row>
              <el-col :span="18">
                <el-form-item label="渠道名称">
                   <span>{{ props.row.id}}</span>
                 </el-form-item>
                 <el-form-item label="对账邮箱">
                   <span>{{ props.row.productName }}</span>
                 </el-form-item>
                 <el-form-item label="佣金比例">
                   <span>{{ props.row.productDesc }}</span>
                 </el-form-item>
                 <el-form-item label="设备数量">
                   <span>{{ props.row.productSalesAmount }}</span>
                 </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <!--列表-->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="productName" label="渠道名称" >
      </el-table-column>
      <el-table-column prop="productSalesAmount" label="对账邮箱"  width="150">
      </el-table-column>
      <el-table-column prop="enoughStatus" label="佣金比例"  width="150">
        <template slot-scope="scope" >
          {{scope.row.enoughStatus | enoughStatusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="productTypeName" label="设备数量"  width="150">
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="150">
        <template slot-scope="scope" >
         <el-button size="small" type="primary" icon="el-icon-edit"  
         @click="onEdit(scope.row.id)">编辑</el-button>
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
  import { listProduct } from '@/api/product'
  import { listCatlog } from '@/api/catlog'
  export default {
    data() {
      return {
        st_options: [
          { value: '01', label: '上架' },
          { value: '02', label: '下架' }
        ],
        es_options: [
          { value: '01', label: '充足' },
          { value: '02', label: '售罄' }
        ],
        options: null,
        listLoading: true,
        searchForm: {
          productType: '',
          prodcutStatus: '',
          enoughStatus: '',
          productName: ''
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        productList: null
      }
    },
    filters: {
      statusFilter(status) {
        return status === '01' ? '上架' : '下架'
      },
      enoughStatusFilter(status) {
        return status === '01' ? '充足' : '售罄'
      }
    },
    created() {
      this.fetchCatlogData()
      this.fetchData()
    },
    methods: {
      fetchCatlogData() {
        listCatlog({ pageNum: 1, pageSize: 100 }).then(response => {
          this.options = response.data.data
        }).catch(() => {
        })
      },
      fetchData() {
        listProduct({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
          this.total = response.data.total
          this.pageNum = Number(response.data.pageNum)
          this.productList = response.data.data
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
        this.$router.push({ path: '/product/add' })
      },
      onEdit(productId) {
        this.$router.push({ path: '/product/edit/' + productId, query: { pNum: this.pageNum }})
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