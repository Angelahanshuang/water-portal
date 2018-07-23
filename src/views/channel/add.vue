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
      <el-form-item label="商品名称">
        <el-input v-model="productForm.productName"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="productForm.productDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品原价">
        <el-input-number v-model="productForm.productAmount" :precision="2" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="商品销售价">
        <el-input-number v-model="productForm.productSalesAmount" :precision="2" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <img-upload :imgUrl="productForm.productPic" @setImgUrl='setImgUrl'></img-upload>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading"  type="primary" @click="onSubmit()">确定</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import imgUpload from '@/components/Upload'
  import { addProduct } from '@/api/product'
  import { listCatlog } from '@/api/catlog'
  export default {
    data() {
      return {
        options: null,
        es_options: [
          { value: '01', label: '充足' },
          { value: '02', label: '售罄' }
        ],
        productForm: {
          productName: '',
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
    },
    components: {
      imgUpload
    },
    methods: {
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
        addProduct({ json: this.productForm }).then(() => {
          this.loading = false
          this.$router.push({ path: '/product/list' })
        }).catch(() => {
          this.loading = false
        })
      },
      onCancel() {
        this.$router.push({ path: '/product/list' })
      }
    }
  }
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
