<template>
  <div class="register">
    <section class="from_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form
          ref="registerFrom"
          :model="registerUsers"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户" prop="name">
            <el-input v-model="registerUsers.name" type="input" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUsers.email" type="email" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerUsers.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="registerUsers.password2" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="管理" prop="identity">
            <el-select v-model="registerUsers.identity" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerFrom')">注册</el-button>
            <el-button @click="resetForm('registerFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.registerUsers.checkPass !== '') {
        this.$refs.registerFrom.validateField('password2')
      }
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerUsers.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerUsers: {
        name: '',
        email: '',
        password: '',
        password2: '',
        identity: ''
      },
      url: process.env,
      options: [
        {
          value: 1,
          label: '管理员'
        },
        {
          value: 2,
          label: '用户'
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/usrs/register', this.registerUsers).then(res => {
            console.log(res)
            this.$message({
              showClose: true,
              type: 'success',
              message: '账号注册成功'
            })
          })
          this.$router.push('/login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="stylus" scoped>
.register
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
</style>
