<template>
  <div id="app">
      <Navigation v-if="currentUser"></Navigation>
      <router-view/>
  </div>
</template>

<script>
  
import Navigation from './components/Navigation.vue'
import { mapState } from 'vuex'

export default {
   components: { Navigation },
   computed: {
            ...mapState(['currentUser'])
   },
   updated(){
    console.log('Current User',this.$store.state.currentUser);
   }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
