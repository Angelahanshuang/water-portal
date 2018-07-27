<template>
  <div class="app-container">
    <el-form ref="form" :model="channelForm" label-width="120px">
      <el-form-item label="渠道名称">
        <el-input v-model="channelForm.channelName"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input  v-model="channelForm.contractName"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="channelForm.contractTel"></el-input>
      </el-form-item>
      <el-form-item label="佣金比例">
        <el-input-number :precision="0" :min="0" :max="100" v-model="channelForm.backRate"></el-input-number> %
      </el-form-item>
      <el-form-item label="对账单接收邮箱">
        <el-input  v-model="channelForm.channelEmail"></el-input>
      </el-form-item>
      <el-form-item label="收款账户名称">
        <el-input v-model="channelForm.accountName"></el-input>
      </el-form-item>
      <el-form-item label="银行账号">
        <el-input v-model="channelForm.bankcardNo"></el-input>
      </el-form-item>
      <el-form-item label="开户行">
        <el-input v-model="channelForm.bankName"></el-input>
      </el-form-item>
      <el-form-item label="开户行号">
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
  import { editChannel, detailChannel } from '@/api/channel'
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
        loading: false
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.loading = true
        detailChannel({ channelId: this.$route.params.id }).then(response => {
          this.channelForm = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      onSubmit() {
        this.loading = true

        var val = {
          id: this.$route.params.id,
          channelName: this.channelForm.channelName,
          contractName: this.channelForm.contractName,
          contractTel: this.channelForm.contractTel,
          backRate: this.channelForm.backRate,
          channelEmail: this.channelForm.channelEmail,
          accountName: this.channelForm.accountName,
          bankcardNo: this.channelForm.bankcardNo,
          bankName: this.channelForm.bankName,
          bankCode: this.channelForm.bankCode
        }

        editChannel({ json: val }).then(() => {
          this.loading = false
          this.$router.push({ path: '/channel/list' })
        }).catch(() => {
          this.loading = false
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
