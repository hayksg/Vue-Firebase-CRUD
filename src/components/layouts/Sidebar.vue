<template>
  <transition name="fade">
    <div class="sidebar" v-if="toggle" @click="hide">
      <div class="sidebar-in">
        <h5 class="text-center">{{ title }}</h5>

        <ul class="list-group list-group-flush sidebar-ul">

          <router-link 
            :to="{name: 'home'}" 
            tag="li"    
            class="list-group-item"
            exact
          >
            <a class="">Home</a>
          </router-link>

          <router-link 
            :to="{name: 'about'}" 
            tag="li"    
            class="list-group-item"
            exact
          >
            <a class="">About</a>
          </router-link>

          <router-link 
            :to="{name: 'admin'}" 
            tag="li"    
            class="list-group-item"
            exact
          >
            <a class="">Admin</a>
          </router-link>

        </ul>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "Sidebar",
  data() {
    return {
      title: "Sidebar",
      toggle: false
    };
  },
  computed: {
    parentDivClasses() {
      return this.$parent.$refs.app.classList;
    }
  },
  created() {
    this.$root.$on("toggle", () => {
      this.toggle = !this.toggle;

      if (this.toggle) {
        this.parentDivClasses.remove("modal-overlay-not-active");
        this.parentDivClasses.add("modal-overlay-active");
      } else {
        this.parentDivClasses.remove("modal-overlay-active");
        this.parentDivClasses.add("modal-overlay-not-active");
      }
    });
  },
  methods: {
    hide() {
      this.toggle = false;

      this.parentDivClasses.remove("modal-overlay-active");
      this.parentDivClasses.add("modal-overlay-not-active");
    }
  }
};
</script>

<style>
.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #2C3E50;
  color: #fff;
  z-index: 1000;
}

.sidebar-in {
  padding: 20px;
}

.modal-overlay-active {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s linear;
}

.modal-overlay-not-active {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  transition: all 0.3s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-250px);
}
</style>
