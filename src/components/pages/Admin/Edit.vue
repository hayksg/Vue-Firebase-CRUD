<template>
  <div>
    <h5 class="mb-4">Edit Post</h5>

    <form @submit.prevent="updatePost">

      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" class="form-control" id="title" v-model="title">
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <textarea class="form-control" id="content" v-model="content"></textarea>
      </div>
      
      <div class="form-group">
        <label for="img">Image:</label>
        <div v-if="imgUrl">
          <img :src="imgUrl" alt="post-image" width="200px">
        </div>
      </div>

      <div class="form-group">
        <label for="img">Change Image:</label>
        <div v-if="newImgUrl" class="mb-2">
          <img :src="newImgUrl" alt="post-image" width="200px">
        </div>
        <input 
          type="file" 
          style="display: none;" 
          @change="onFilePicked"
          ref="fileInput">
        <button type="button" @click="onPickFile" class="btn btn-success">Upload</button>
      </div>

      <hr>

      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Edit',
    data () {
      return {
        id: '',
        title: '',
        content: '',
        date: new Date(),
        imgUrl: '',
        newImgUrl: '',
        image: null
      }
    },
    computed: {
      ...mapGetters({
        getPost: 'getPost'
      })
    },
    methods: {
      updatePost () {
        let post = {
          id: this.id,
          title: this.title,
          content: this.content,
          image: this.image,
        }

        this.$store.dispatch('updatePost', post);
        return this.$router.push({name: 'home'});
      },
      onPickFile () {
        this.$refs.fileInput.click();
      },
      onFilePicked (event) {
        let files = event.target.files;
        if (files[0]) {
          let fileName = files[0].name;
        
          if (fileName.lastIndexOf('.') <= 0) {
            return alert('Please add a valid image!');
          }

          const fileReader = new FileReader();
          fileReader.addEventListener('load', () => {
            this.newImgUrl = fileReader.result;
          })
          fileReader.readAsDataURL(files[0]);

          this.image = files[0];
        }
      }
    },
    mounted () {
      let id = this.$route.params['id'];
      let post = this.getPost(id);
      
      this.id = post.id;
      this.title = post.title;
      this.content = post.content;
      this.date = post.date;
      this.imgUrl = post.imageUrl;
    }
  }
</script>

<style scoped>

</style>