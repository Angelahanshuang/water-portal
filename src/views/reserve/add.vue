<template>
  <div class="app-container">
    <el-form ref="form" :model="deskForm" label-width="120px">
      <el-form-item label="桌号">
        <el-input v-model="deskForm.deskNo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addDesk } from '@/api/desk'
  export default {
    data() {
      return {
        deskForm: {
          deskNo: ''
        },
        loading: false
      }
    },
    methods: {
      onSubmit() {
        this.loading = true
        addDesk(this.deskForm).then(() => {
          this.loading = false
          this.$router.push({ path: '/desk/list' })
        }).catch(() => {
          this.loading = false
        })
      },
      onCancel() {
        this.$router.push({ path: '/desk/list' })
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
