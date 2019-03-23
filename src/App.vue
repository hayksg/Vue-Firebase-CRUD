<template>
  <div ref="app" id="app">
    <AppHeader />
    <AppSidebar />

    <div class="container app-container mt-3">
      
       
        <router-view></router-view>
        
      
    </div>
  </div>
</template>

<script>
import AppHeader from './components/layouts/Header';
import AppSidebar from './components/layouts/Sidebar';

export default {
  name: 'app',
  components: {
    AppHeader, AppSidebar
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">

</style>
