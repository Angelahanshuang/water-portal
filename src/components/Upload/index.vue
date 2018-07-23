<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://up.qiniup.com"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :before-upload="beforeAvatarUpload"
      :data="postData" >
      <img v-if="oldImgUrl" :src="oldImgUrl" class="avatar" style="width:150px;height:150px">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/common'
// 需要传入一个file(图片地址)
// 进行初始化，读取参数
export default {
  data() {
    return {
      oldImgUrl: '',
      newImgUrl: '',
      postData: {
        token: 'your token'
      }
    }
  },
  name: 'imgUpload',
  props: ['imgUrl'],
  watch: {
    newImgUrl(val) {
      this.$emit('setImgUrl', 'http://image2.52cx.com/' + val)
    },
    imgUrl(val) {
      this.oldImgUrl = val
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.oldImgUrl = URL.createObjectURL(file.raw)
      this.newImgUrl = res.key
    },
    handleAvatarError(res, file) {
      this.$message.error('上传头像图片失败!')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        return getQiniuToken().then(response => {
          this.postData.token = response.data
        }).catch((err) => {
          console.log(err)
          return Promise.reject(err)
        })
      }
    }
  }
}
</script>
