<template>
  <div class="left-menu">
    <el-row class="row-menu">
      <el-col class="col-menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo menu"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link to="/home">
            <el-menu-item index="0">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="item in items">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class="'fa fa-margin '+item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                <el-menu-item :index="citem.path">
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'LeftMenu',
  data() {
    return {
      items: [
        {
          icon: "fa-money",
          name: "资金管理",
          path: "fund",
          children: [{ path: "foundlist", name: "资金流水" }]
        },
        {
          icon: "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息" }]
        }
      ]
    }
  }, 
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style lang="stylus" scoped>
.left-menu, .row-menu, .row-menu, .col-menu
  height 100%
.left-menu
  box-shadow -4px 2px 4px #131010
  position fixed
  left 0
  .menu
    border 0
    height 100%
    width 200px
    a
      text-decoration none
</style>