<template>
  <div class="login">
    <section class="from_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form
          ref="loginFrom"
          :model="loginUser"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="loginUser.email" type="email" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="submitForm('loginFrom')">登录</el-button>
          </el-form-item>
          <el-form-item>
            <div>
              还没有账号? 马上
              <router-link to="/register">注册</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
import jwt_code from 'jwt-decode'
export default {
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/usrs/login', this.loginUser).then(res => {
            console.log(res)
            localStorage.setItem('eletoken', res.data.token)
            this.$message({
              showClose: true,
              type: 'success',
              message: '登录成功'
            })
            var user = jwt_code(res.data.token) 
            
            this.$store.dispatch('setAuthenticated', !this.isEmpty(user))
            this.$store.dispatch('user', user)
          })
          this.$router.push('/index')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isEmpty(value) {
      return (
        value === undefined || value === null || 
        (typeof value === 'object' && Object.keys(value).length === 0)||
        (typeof value === 'string' && value.trim().length === 0)
      )
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  height 100%
  width 100%
  background url('../assets/bg_register.png')
  .from_container
    .manage_tip
      background #fff
      padding 30px 30px 30px 0
      text-align center
      width 300px
      border-radius 10px
      margin 0 auto
      position relative
      top 130px
      .title
        color #444
        position relative
        top -10px
        display inline-block
        text-align center
        width 100%
      .btn
        width 100%
</style>
