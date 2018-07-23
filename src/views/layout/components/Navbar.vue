<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="imgUrl">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span  @click="dialogVisible = true" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item label="旧密码" :label-width="labelWidth" prop="oldPassword">
          <el-input v-model="form.oldPassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="labelWidth" prop="newPassword">
          <el-input v-model="form.newPassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" :label-width="labelWidth" prop="rePassword">
          <el-input v-model="form.rePassword" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePasswd">确 定</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import sha1 from 'js-sha1'
import { updatePassword } from '@/api/common'
import ulogo from '@/assets/img/u.png'

export default {
  data() {
    return {
      imgUrl: ulogo,
      dialogVisible: false,
      labelWidth: '80px',
      form: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      formRules: {
        oldPassword: [{ required: true, trigger: 'blur' }],
        newPassword: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'))
            } else {
              if (!(/^[a-zA-Z0-9_-]{6,16}$/.test(value))) {
                callback(new Error('密码至少6位,由大小写字母和数字,-,_组成'))
              } else {
                callback()
              }
            }
          },
          trigger: 'blur'
        }],
        rePassword: [{
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.form.newPassword) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },

    updatePasswd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          var form = {}
          form.oriPasswd = sha1(this.form.oldPassword)
          form.newPasswd = sha1(this.form.newPassword)
          updatePassword(form).then(response => {
            this.loading = false
            MessageBox.alert('密码修改成功', '提示', {
              confirmButtonText: '确认',
              type: 'warning'
            }).then(() => {
              this.logout()
            })
          }).catch(() => {
            this.loading = false
          })
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },

    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

