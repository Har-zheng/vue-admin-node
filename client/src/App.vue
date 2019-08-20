<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import jwt_code from 'jwt-decode'
export default {
  created() {
    if (localStorage.getItem('eletoken')) {
      var user = jwt_code(localStorage.getItem('eletoken'))
      this.$store.dispatch('setAuthenticated', !this.isEmpty(user))
      this.$store.dispatch('user', user)
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined || value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>
<style>
html,
body,
#app{
  width: 100%;
  height: 100%;
}

</style>
