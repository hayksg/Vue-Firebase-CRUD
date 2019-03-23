<template>
  <div>
    <h5 class="mb-4">Create Post</h5>
    

    <form @submit.prevent="createPost">

      <div class="form-group">
        <label for="title">Title:</label>
        <input 
          type="text" 
          class="form-control"
          :class="{'is-invalid': $v.title.$error}"
          @input="$v.title.$touch"
          id="title" 
          v-model="title"
          autocomplete="off"
        >
        <div class="invalid-feedback" v-if="!$v.title.required">Title field is required</div>
        <div class="invalid-feedback" v-if="!$v.title.minLength">Min length is 2</div>
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <textarea
          id="content" 
          v-model="content"
          class="form-control" 
          :class="{'is-invalid': $v.content.$error}"
          style="min-height: 200px;"
          @input="$v.content.$touch"></textarea>
        <div class="invalid-feedback" v-if="!$v.content.required">Content field is required</div>
        <div class="invalid-feedback" v-if="!$v.content.minLength">Min length is 10. You input {{ content.length }}</div>
      </div>
      
      <!-- <div class="form-group">
        <label for="img">Image URL:</label>
        <input 
          type="text" 
          class="form-control" 
          :class="{'is-invalid': $v.img.$error}"
          @input="$v.img.$touch"
          id="img" 
          v-model="img"
          autocomplete="off"
        >
        <div class="invalid-feedback" v-if="!$v.img.required">URL field is required</div>
        <div class="invalid-feedback" v-if="!$v.img.url">Wrong URL</div>
      </div> -->

      <div class="form-group">
        
        <button type="button" class="btn btn-primary" @click="onPickFile">Upload Image</button>

        <input 
          type="file" 
          style="display: none;" 
          ref="fileInput" 
          accept="image/*"
          @change="onFilePicked"
        >

        <div v-if="imgUrl" class="mt-3">
          <img :src="imgUrl" alt="post-image" width="200px">
        </div>
      </div>
      
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="$v.$invalid"
      >Create</button>
    </form>
    

  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    name: 'Create',
    data () {
      return {
        title: '',
        content: '',
        date: new Date(),
        imgUrl: '',
        image: null
      }
    },
    validations: {
      title: {
        required,
        minLength: minLength(3)
      },
      content: {
        required,
        minLength: minLength(10)
      }
    },
    methods: {
      createPost () {

        if (!this.image) {
          return;
        }

        let post = {
          title: this.title,
          content: this.content,
          date: this.date,
          image: this.image,
        }

        this.$store.dispatch('setPost', post);
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
            this.imgUrl = fileReader.result;
          });
          fileReader.readAsDataURL(files[0]);
          this.image = files[0];
        }
      }
    }
  }
</script>

<style scoped>

</style>