<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <router-view></router-view> 
  </div> 
</template>
<script>
import HeadNav from '../components/HeadNav'
import LeftMenu from '../components/LeftMenu'
export default { 
  name: 'Index',
  components: {
    HeadNav,
    LeftMenu
  }
}
</script>
<style lang="stylus" scoped>
</style>