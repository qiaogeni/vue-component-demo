<template>
  <Breadcrumb separator=">" class="breadcrumb">
    <BreadcrumbItem :to="trail.address" v-for="(trail, index) in trails" :key="index">{{trail.name}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    setBreadcrumb(menus) {
      let trails = [{ address: '/', name: 'home' }]
      for (let i = 0; i < menus.length; i++) {
        for (let j = 0, subMenus = menus[i].childMenus; j < subMenus.length; j++) {
          if ('/' + subMenus[j].address === this.$route.path) {
            trails.push({ address: menus[i].address, name: menus[i].title })
            trails.push({ address: '/' + subMenus[j].address, name: subMenus[j].title })
          }
        }
      }
      return trails
    }
  },
  computed: {
    trails() {
      let menus = this.$root.$data.menus
      return this.setBreadcrumb(menus)
    }
  }
}
</script>
<style scoped>
.breadcrumb {
  padding: 10px;
}
</style>
