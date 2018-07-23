<template>
  <div class="app-container">
    <el-form ref="form" :model="deskForm" label-width="120px">
      <el-form-item label="桌ID">
        <el-input v-model="deskForm.deskId" disabled></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="deskForm.status" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
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
  import { editDesk } from '@/api/desk'
  export default {
    data() {
      return {
        options: [
          { value: '01', label: '启用' },
          { value: '02', label: '停用' }
        ],
        nNum: 1,
        deskForm: {
          deskId: '',
          status: '01'
        },
        loading: false
      }
    },
    created() {
      this.deskForm.deskId = this.$route.params.id
      this.deskForm.status = this.$route.params.status
    },
    methods: {
      onSubmit() {
        this.loading = true
        editDesk(this.deskForm).then(() => {
          this.loading = false
          Notification.success('操作成功')
          this.$router.push({ path: '/desk/list', query: { pNum: this.$route.query.pNum }})
        }).catch(() => {
          this.loading = false
        })
      },
      onBack() {
        this.$router.push({ path: '/desk/list', query: { pNum: this.$route.query.pNum }})
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
