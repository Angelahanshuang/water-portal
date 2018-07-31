<template>
  <div class="app-container">
    <el-form :model="installUserForm" :rules="formRules" ref="installUserForm" label-width="120px">
      <el-form-item label="用户名称">
        <el-input v-model="installUserForm.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="installUserForm.userType" clearable placeholder="用户类型" disabled>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="userEmail" label="对账邮箱">
        <el-input v-model="installUserForm.userEmail" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="installUserForm.contractName" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input  v-model="installUserForm.contractTel" disabled></el-input>
      </el-form-item>
      <el-form-item label="设备数量">
        <el-input v-model="installUserForm.devNum" disabled></el-input>
      </el-form-item>
      <el-form-item label="设备编号">
        <el-tag style="margin:2px" v-for="item in installUserForm.devIds" :key="item">{{ item }} </el-tag>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { editInstalluser, detailInstalluser } from '@/api/installuser'
  export default {
    data() {
      return {
        options: [
          { value: '01', label: '企业' },
          { value: '02', label: '商业' },
          { value: '03', label: '家庭' },
          { value: '04', label: '合租' }
        ],
        installUserForm: {
          userName: '',
          userType: '',
          userEmail: '',
          contractName: '',
          contractTel: '',
          devNum: 0,
          devIds: []
        },
        formRules: {
          userEmail: [
            { required: true, message: '对账邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        },
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.loading = true
        detailInstalluser({ id: this.$route.params.id }).then(response => {
          this.installUserForm = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSubmit() {
        this.$refs.installUserForm.validate(valid => {
          if (valid) {
            this.loading = true
            editInstalluser({ id: this.$route.params.id, userEmail: this.installUserForm.userEmail }).then(() => {
              this.loading = false
              this.$router.push({ path: '/installuser/list' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      onCancel() {
        this.$router.push({ path: '/installuser/list' })
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
