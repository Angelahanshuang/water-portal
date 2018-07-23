<template>
  <div class="app-container">
    <el-form ref="form" :model="catlogForm" label-width="120px">
      <el-form-item label="分类名称">
        <el-input v-model="catlogForm.name"></el-input>
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input-number v-model="catlogForm.orderBy" :min="1" :max="99"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addCatlog } from '@/api/catlog'
  export default {
    data() {
      return {
        catlogForm: {
          name: '',
          orderBy: 99
        },
        loading: false
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        addCatlog(this.catlogForm).then(() => {
          this.loading = false
          this.$router.push({ path: '/catlog/list' })
        }).catch(() => {
          this.loading = false
        })
      },
      onCancel() {
        this.$router.push({ path: '/catlog/list' })
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
