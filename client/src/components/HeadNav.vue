<template>
  <header class="header-nav">
    <el-row>
      <el-col :span="6" class="login-continer">
        <img src="../assets/logo.png" alt />
        <span>后台管理系统</span>
      </el-col>
      <el-col :span="6" class="icon-container" :offset="12">
        <div class="userinfo">
          <el-dropdown class="dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name username">zhz</p>
          </div>
          <img src="//www.gravatar.com/avatar/487f87505f619bf9ea08f26bb34f8118?s=200&r=pg&d=mm" alt />
        </div>
        
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: 'headenav',
  methods: {
    handleCommand(command){
      console.log(command)
      switch (command){
        case 'info':
          this.showInfoList();
          break
        case 'logout':
          this.logout()
          break   
      }
    },
    showInfoList(){
      this.$router.push('/infoShow')
      console.log('个人信息')
    },
    logout() {
      // 清除token
      localStorage.removeItem('eletoken')
      // 清除 vuex
      this.$store.dispatch('clearCurrentState')
      // 跳转登录页
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="stylus" scoped>
.header-nav
  height 52px
  background rgb(48, 65, 86)
  .login-continer
    padding-left 4px
    height 52px
    display flex
    align-items center
    img
      width 36px
      border-radius 50%
    span
      text-indent 10px
      color #fff
  .icon-container
    height 52px
    .userinfo
      height 100%
      width 100%
      margin-top 10px
      img
        float right
        display block
        line-height 52px
        width 30px
        vertical-align middle
        border-radius 50%
        margin-right 10px
      .welcome
        float right
        height 100%
        color #fff
        font-size 12px
      .dropdown{
        float right !important
        margin-top 15px
      }
</style>