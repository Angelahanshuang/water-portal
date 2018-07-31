<template>
  <div class="app-container">
    <el-form :model="channelForm" :rules="formRules" ref="channelForm" label-width="120px">
      <el-form-item prop="channelName" label="渠道名称">
        <el-input v-model="channelForm.channelName"></el-input>
      </el-form-item>
      <el-form-item  prop="contractName" label="联系人">
        <el-input  v-model="channelForm.contractName"></el-input>
      </el-form-item>
      <el-form-item prop="contractTel" label="电话">
        <el-input v-model="channelForm.contractTel"></el-input>
      </el-form-item>
      <el-form-item prop="backRate" label="佣金比例">
        <el-input-number :precision="0" :min="0" :max="100" v-model="channelForm.backRate"></el-input-number> %
      </el-form-item>
      <el-form-item prop="channelEmail" label="对账单接收邮箱">
        <el-input  v-model="channelForm.channelEmail"></el-input>
      </el-form-item>
      <el-form-item prop="accountName" label="收款账户名称">
        <el-input v-model="channelForm.accountName"></el-input>
      </el-form-item>
      <el-form-item prop="bankcardNo" label="银行账号">
        <el-input v-model="channelForm.bankcardNo"></el-input>
      </el-form-item>
      <el-form-item prop="bankName" label="开户行">
        <el-input v-model="channelForm.bankName"></el-input>
      </el-form-item>
      <el-form-item prop="bankCode" label="开户行号">
        <el-input v-model="channelForm.bankCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { addChannel } from '@/api/channel'
  export default {
    data() {
      return {
        channelForm: {
          channelName: '',
          contractName: '',
          contractTel: '',
          backRate: 10.00,
          channelEmail: '',
          accountName: '',
          bankcardNo: '',
          bankName: '',
          bankCode: ''
        },
        formRules: {
          channelName: [{ required: true, message: '渠道名称不能为空', trigger: 'blur' }],
          contractName: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
          contractTel: [{ required: true, message: '联系电话不能为空', trigger: 'blur' }],
          backRate: [{ required: true, message: '佣金比例不能为空', trigger: 'blur' }],
          channelEmail: [
            { required: true, message: '对账单接收邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          accountName: [{ required: true, message: '收款账户不能为空', trigger: 'blur' }],
          bankcardNo: [{ required: true, message: '银行账号不能为空', trigger: 'blur' }],
          bankName: [{ required: true, message: '开户行不能为空', trigger: 'blur' }],
          bankCode: [{ required: true, message: '开户行号不能为空', trigger: 'blur' }]
        },
        loading: false
      }
    },
    created() {
    },
    methods: {
      onSubmit() {
        this.$refs.channelForm.validate(valid => {
          if (valid) {
            this.loading = true
            var data = {
              channelName: this.channelForm.channelName,
              contractName: this.channelForm.contractName,
              contractTel: this.channelForm.contractTel,
              backRate: this.channelForm.backRate / 100,
              channelEmail: this.channelForm.channelEmail,
              accountName: this.channelForm.accountName,
              bankcardNo: this.channelForm.bankcardNo,
              bankName: this.channelForm.bankName,
              bankCode: this.channelForm.bankCode
            }
            addChannel({ json: data }).then(() => {
              this.loading = false
              this.$router.push({ path: '/channel/list' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      onCancel() {
        this.$router.push({ path: '/channel/list' })
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
