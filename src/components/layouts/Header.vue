<template>
  
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
  
      <router-link 
        :to="{name: 'home'}" 
        tag="a" 
        class="navbar-brand"
        exact
      >Home</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggle();"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <router-link 
            :to="{name: 'about'}" 
            tag="li"    
            class="nav-item"
            exact
          >
            <a class="nav-link">About</a>
          </router-link>

          <router-link 
            :to="{name: 'admin'}" 
            tag="li"    
            class="nav-item"
            exact
          >
            <a class="nav-link">Admin</a>
          </router-link>
          
        </ul>
        
      </div>
    </div>
   
    </nav>
    
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      title: "Header"
    };
  },
  methods: {
    toggle() {
      this.$root.$emit("toggle");
    }
  }
};
</script>

<style scoped>
nav {
  background-color: #2C3E50;
}
</style>
