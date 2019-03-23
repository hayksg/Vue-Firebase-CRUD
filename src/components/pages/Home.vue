<template>
  <div>
    <h5 class="mb-4">{{ title }}</h5>

    <div class="text-center" v-if="loading">
      <b-spinner variant="primary" label="Text Centered" />
    </div>

    <div 
      v-for="post in posts"
      :key="post.id"
      class="card shadow mb-5"
    >

      <div>
        <img :src="post.imageUrl" :alt="post.title" class="post-img">
      </div>
      <h5 class="card-header">
        <router-link 
          :to="{name: 'post', params: {id: post.id}}"
        >
          {{ post.title }}
        </router-link>
      </h5>
      <p class="card-body">{{ post.content }}</p>
      <div class="card-footer">Date: {{ new Date(post.date).toLocaleDateString() }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        title: 'All Posts'
      }
    },
    computed: {
      posts () {
        return this.$store.getters.getPosts;
      },
      loading () {
        return this.$store.getters.loading;
      }
    }
  }
</script>

<style scoped>

</style>