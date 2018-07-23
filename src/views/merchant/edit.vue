<template>
  <div class="app-container">
    <el-form ref="form" :model="catlogForm" label-width="120px">
      <el-form-item label="分类ID">
        <el-input v-model="catlogForm.productTypeId" disabled></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="catlogForm.status" clearable placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="catlogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input-number v-model="catlogForm.orderBy" :min="1" :max="99"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Notification } from 'element-ui'
  import { editCatlog } from '@/api/catlog'
  export default {
    data() {
      return {
        options: [
          { value: '01', label: '有效' },
          { value: '02', label: '无效' }
        ],
        catlogForm: {
          productTypeId: '',
          name: '',
          status: '01'
        },
        loading: false
      }
    },
    created() {
      this.catlogForm.productTypeId = this.$route.params.id
      this.catlogForm.name = this.$route.params.name
      this.catlogForm.status = this.$route.params.status
      this.catlogForm.orderBy = this.$route.params.orderby
    },
    methods: {
      onSubmit() {
        this.loading = true
        editCatlog(this.catlogForm).then(() => {
          this.loading = false
          Notification.success('操作成功')
          this.$router.push({ path: '/catlog/list', query: { pNum: this.$route.query.pNum }})
        }).catch(() => {
          this.loading = false
        })
      },
      onBack() {
        this.$router.push({ path: '/catlog/list', query: { pNum: this.$route.query.pNum }})
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
