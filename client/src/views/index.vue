<template>
  <div class="index">
    <!-- 123 -->
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <section class="content">
      <router-view></router-view>
    </section>
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
.index
  height 100%
.content
  margin-left 200px
  width: calc(100% - 200px);
  height: calc(100% - 52px);
  overflow: auto;

</style>