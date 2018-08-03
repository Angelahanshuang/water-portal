<template>
  <div class="app-container">
    <!-- 查询条件区 -->
    <el-form :inline="true" :model="searchForm" :rules="formRules" ref="searchForm" size="small">
      <el-form-item prop="calMonth">
        <el-date-picker v-model="searchForm.calMonth" value-format="yyyyMM" :picker-options="pickerOptions" type="month" placeholder="选择月"> </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.status" clearable placeholder="销账状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input  placeholder="渠道名称" clearable v-model="searchForm.channelName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
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
                <el-form-item label="银行名称">
                   <span>{{ props.row.bankName}}</span>
                 </el-form-item>
                 <el-form-item label="流水单号">
                   <span>{{ props.row.bankStatement }}</span>
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
      <el-table-column prop="channelName" label="渠道名称">
      </el-table-column>
      <el-table-column prop="amount" label="收入金额"  width="150">
      </el-table-column>
      <el-table-column prop="backRate" label="佣金比例"  width="150">
        <template slot-scope="scope" >
        {{scope.row.backRate | persentFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="结算金额"  width="150">
      </el-table-column>
      <el-table-column prop="status" label="结算状态"  width="150">
        <template slot-scope="scope" >
        {{scope.row.status | statusFilter}}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" :formatter="dateFormat" label="结算时间" width="150">
      </el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="150">
        <template slot-scope="scope" >
         <el-button v-if="scope.row.status === '01'" size="small" type="primary"
         @click="onEdit(scope.row)">完成结算</el-button>
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
    <el-dialog
      title="填写结算信息"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form  :model="editForm" :rules="eformRules" ref="editForm" label-width="80px" size="small">
        <el-form-item prop="bankName" label="银行名称">
          <el-input  placeholder="银行名称" v-model="editForm.bankName"></el-input>
        </el-form-item>
        <el-form-item prop="bankStatement" label="流水单号">
          <el-input  placeholder="流水单号" v-model="editForm.bankStatement"></el-input>
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
  import { listStatement, operStatement } from '@/api/financial'
  import { formatDate } from '@/utils/date'
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
        dialogVisible: false,
        options: [
          { value: '01', label: '未结算' },
          { value: '02', label: '已结算' }
        ],
        listLoading: false,
        searchForm: {
          calMonth: '',
          channelName: '',
          status: ''
        },
        formRules: {
          calMonth: [{ required: true, message: '月份不能为空', trigger: 'blur' }]
        },
        editForm: {
          id: '',
          bankName: '',
          bankStatement: '',
          remark: ''
        },
        eformRules: {
          bankName: [{ required: true, message: '银行名称不能为空', trigger: 'blur' }],
          bankStatement: [{ required: true, message: '流水单号不能为空', trigger: 'blur' }]
        },
        pageNum: Number(this.$route.query.pNum || 1),
        total: 0,
        pageSize: 10,
        billList: null
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
        return status === '01' ? '未结算' : '已结算'
      },
      persentFilter(num) {
        return (num * 100).toFixed(2) + '%'
      }
    },
    created() {
      // this.fetchData()
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
        this.$refs.searchForm.validate(valid => {
          if (valid) {
            listStatement({ pageNum: this.pageNum, pageSize: this.pageSize, json: this.searchForm }).then(response => {
              this.total = response.data.total
              this.pageNum = Number(response.data.pageNum)
              this.billList = response.data.data
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
      onEdit(row) {
        this.editForm.id = row.id
        this.dialogVisible = true
      },
      onConform() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            operStatement({ id: this.editForm.id, bankName: this.editForm.bankName, bankStatement: this.editForm.bankStatement, remark: this.editForm.remark }).then(response => {
              this.fetchData()
            }).catch(() => {
            })
            this.dialogVisible = false
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