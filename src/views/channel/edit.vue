<template>
  <div class="app-container">
    <el-form ref="form" :model="productForm" label-width="120px">
      <el-form-item label="商品类型">
        <el-select v-model="productForm.productType" clearable placeholder="商品类型">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存状态">
        <el-select v-model="productForm.enoughStatus" clearable placeholder="库存状态">
          <el-option v-for="item in es_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品状态">
        <el-select v-model="productForm.productStatus" clearable placeholder="产品状态">
          <el-option v-for="item in st_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="productForm.productName"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="productForm.productDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品原价">
        <el-input-number v-model="productForm.productAmount" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="商品销售价">
        <el-input-number v-model="productForm.productSalesAmount" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <img-upload :imgUrl="productForm.productPic" @setImgUrl='setImgUrl'></img-upload>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import imgUpload from '@/components/Upload'
  import { Notification } from 'element-ui'
  import { findProduct } from '@/api/product'
  import { editProduct } from '@/api/product'
  import { listCatlog } from '@/api/catlog'
  export default {
    data() {
      return {
        options: null,
        es_options: [
          { value: '01', label: '充足' },
          { value: '02', label: '售罄' }
        ],
        st_options: [
          { value: '01', label: '上架' },
          { value: '02', label: '下架' }
        ],
        productForm: {
          productName: '',
          productStatus: '01',
          productType: '',
          productDesc: '',
          productAmount: 10.00,
          productSalesAmount: 10.00,
          productPic: '',
          enoughStatus: '01'
        },
        loading: false
      }
    },
    created() {
      this.fetchCatlogData()
      this.fetchData()
    },
    components: {
      imgUpload
    },
    methods: {
      fetchData() {
        this.loading = true
        findProduct({ productId: this.$route.params.id }).then(response => {
          this.productForm = response.data
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      fetchCatlogData() {
        listCatlog({ pageNum: 1, pageSize: 100 }).then(response => {
          this.options = response.data.data
        }).catch(() => {
        })
      },
      setImgUrl(url) {
        this.productForm.productPic = url
      },
      onSubmit() {
        this.loading = true
        editProduct({ json: this.productForm }).then(() => {
          this.loading = false
          Notification.success('操作成功')
          // this.$router.push({ path: '/product/list', query: { pNum: this.$route.query.pNum }})
        }).catch(() => {
          this.loading = false
        })
      },
      onBack() {
        this.$router.push({ path: '/product/list', query: { pNum: this.$route.query.pNum }})
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
