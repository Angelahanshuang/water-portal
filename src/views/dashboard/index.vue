<template>
  <div class="app-container">
    <el-form ref="form" :model="storeForm" label-width="120px">
      <el-form-item label="门店ID：">
        <span>{{ storeForm.id }}</span>
      </el-form-item>
      <el-form-item label="门店名称：">
        <span>{{ storeForm.storeName }}</span>
      </el-form-item>
      <el-form-item label="门店地址：">
        <span>{{ storeForm.storeAddress }}</span>
      </el-form-item>
      <el-form-item label="联系人：">
        <span>{{ storeForm.storeContact }}</span>
      </el-form-item>
      <el-form-item label="联系电话：">
        <span>{{ storeForm.storeContactTel }}</span>
      </el-form-item>
      <el-form-item label="创建时间：">
        <span>{{ storeForm.createDateTime | formatDate }}</span>
      </el-form-item>
      <el-form-item label="过期时间：">
        <span>{{ storeForm.expireTime | formatShortDate }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { formatDate, formatShortDate } from '@/utils/date'
  import { detailStore } from '@/api/store'
  import { ack } from '@/api/common'
  export default {
    data() {
      return {
        storeForm: {
          id: '',
          storeName: '',
          storeAddress: '',
          storeContact: '',
          storeContactTel: '',
          createDateTime: '',
          expireTime: ''
        },
        loading: false
      }
    },
    created() {
      setInterval(this.secduled, 1000 * 60 * 5)
      this.fetchData()
    },
    filters: {
      formatDate(date) {
        return formatDate(date)
      },
      formatShortDate(date) {
        return formatShortDate(date)
      }
    },
    methods: {
      fetchData() {
        this.loading = true
        detailStore({ mercId: this.$route.params.id }).then(response => {
          this.storeForm = response.data
          localStorage.setItem('S-Status', response.data.status)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      secduled() {
        ack().then(response => {
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
