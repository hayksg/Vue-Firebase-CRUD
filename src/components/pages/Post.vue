<template>
  <div>
    <h4 class="mb-4">{{ post.title }}</h4>
    
    <div class="card shadow">
      <div>
        <img :src="post.imageUrl" :alt="post.title" class="post-img">
      </div>
      <p class="card-body">{{ post.content }}</p>
      <div class="card-footer">Date: {{ new Date(post.date).toLocaleDateString() }}</div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex';

  export default {
    name: 'Post',
    data () {
      return {
        // post: {}
      }
    },
    computed: {
      ...Vuex.mapGetters({
        getPost: 'getPost'
      }),
      post () {
        let id = this.$route.params['id'];
        return this.getPost(id);
      }
    }
  }
</script>

<style scoped>

</style>