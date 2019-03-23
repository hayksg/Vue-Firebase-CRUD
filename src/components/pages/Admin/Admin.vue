<template>
  <div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5>{{ title }}</h5>
      <router-link 
        :to="{name: 'create-post'}"
        class="btn btn-primary btn-sm"
      >
        Create Post
      </router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-striped admin-table">
        <thead class="app-thead-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="post in posts"
            :key="post.id"
          >
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.content }}</td>
            <td>{{ new Date(post.date).toLocaleDateString() }}</td>
            <td>
              <img :src="post.imageUrl" :alt="post.title">
            </td>
            <td>
              <router-link 
                :to="{name: 'edit-post', params: {id: post.id}}"
                tag='a'
                class="btn btn-warning btn-sm"
              >
                Edit
              </router-link>
              <button class="btn btn-danger btn-sm" @click="deletePost(post)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Admin',
    data () {
      return {
        title: 'Admin Area'
      }
    },
    computed: {
      posts () {
        return this.$store.getters.getPosts;
      }
    },
    methods: {
      deletePost (post) {
        let res = confirm(`You want to delete post ${post.title} \nAre you sure?`);

        if (res) {
          this.$store.dispatch('removePost', post);
          return this.$router.push({name: 'admin'});
        }
      }
    }
  }
</script>

<style scoped>

</style>