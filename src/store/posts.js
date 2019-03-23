import * as firebase from 'firebase';

export default {
  state: {
    loadedPosts: [],
    loading: false
  },
  getters: {
    getPosts (state) {
      return state.loadedPosts.sort((a, b) => {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
        // return new Date(b.date) - new Date(a.date);
      });
    },
    getPost (state) {
      return (id => {
        return state.loadedPosts.find(post => {
          return post.id == id;
        })
      });
    },
    loading (state) {
      return state.loading;
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setPosts (state, payload) {
      /* let posts = [
        { id: 1, title: 'Post title 1', content: 'Post content 1', date: '2019-03-1', img: 'https://c.wallhere.com/photos/30/b6/1366x768_px_pier-1349209.jpg!d' },
        { id: 2, title: 'Post title 2', content: 'Post content 2', date: '2019-03-2', img: 'http://wallpapers-images.ru/1366x768/nature/wallpapers-1366x768/wallpaper-priroda-doroga-tuman-utro-oboi-1366x768.jpg' },
        { id: 3, title: 'Post title 3', content: 'Post content 3', date: '2019-03-3', img: 'https://s1.1zoom.ru/b5050/7/225989-Sepik_1366x768.jpg' },
        { id: 4, title: 'Post title 4', content: 'Post content 4', date: '2019-03-4', img: 'http://www.tokkoro.com/picsup/1433663-scenic.jpg' },
      ];
      state.loadedPosts = posts; */

      state.loadedPosts = payload;
    },
    setPost (state, payload) {
      state.loadedPosts.push(payload);
    },
    removePost (state, payload) {
      let post = state.loadedPosts.find(item => {
        return item.id === payload.id;
      });
      state.loadedPosts.splice(state.loadedPosts.indexOf(post), 1);
    },
    updatePost(state, payload) {
      let post = state.loadedPosts.find(item => {
        return item.id === payload.id;
      });

      if(payload.title) {
        post.title = payload.title
      }

      if (payload.content) {
        post.content = payload.content
      }

      if (payload.imageUrl) {
        post.imageUrl = payload.imageUrl
      }
      
    }
  },
  actions: {
    setPosts ({commit}, payload) {
      commit('setLoading', true);
      firebase.database().ref('posts').once('value')
        .then(data => {
          commit('setLoading', false);
          let posts = [];
          let obj = data.val();
          
          for (let key in obj) {
            posts.push({
              id: key,
              title: obj[key].title,
              content: obj[key].content,
              date: obj[key].date,
              imageUrl: obj[key].imageUrl,
            });
          }

          commit('setPosts', posts);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
    },
    setPost(context, payload) {
      let post = {
        title: payload.title,
        content: payload.content,
        date: payload.date.getTime(),
        // img: payload.img,
      }

      let key;
      let imageUrl;

      context.commit('setLoading', true);
      firebase.database().ref('posts').push(post)
        .then(data => {
          context.commit('setLoading', false);
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase.storage().ref('posts/' + key + ext).put(payload.image);
        })
        .then(fileData => {
          let imagePath = fileData.metadata.fullPath
          return firebase.storage().ref().child(imagePath).getDownloadURL()
        })
        .then(url => {
          imageUrl = url;
          return firebase.database().ref('posts').child(key).update({imageUrl})
        })
        .then(() => {
          
          context.commit('setPost', {
            id: key,
            imageUrl,
            ...post
          });
        })
        .catch(error => {
          context.commit('setLoading', false);
          console.log(error);
        });
    },
    updatePost(context, payload) {
      let post = {};

      if (payload.title) {
        post.title = payload.title
      }

      if (payload.content) {
        post.content = payload.content
      }

      context.commit('setLoading', true);
      if (payload.image) {
        const filename = payload.image.name;
        const ext = filename.slice(filename.lastIndexOf('.'));
        const key = payload.id;

        firebase.storage().ref('posts/' + key + ext).put(payload.image)
          .then(fileData => {
            context.commit('setLoading', false);
            let imagePath = fileData.metadata.fullPath
            return firebase.storage().ref().child(imagePath).getDownloadURL()
          })
          .then(url => {
            payload.imageUrl = url;
            return firebase.database().ref('posts').child(key).update(post);
          })
          .then(() => {
            
            context.commit('updatePost', payload);
          })
          .catch(error => {
            context.commit('setLoading', false);
            console.log(error);
          });
      } else {
        firebase.database().ref('posts').child(payload.id).update(post)
          .then(() => {
            context.commit('setLoading', false);
            context.commit('updatePost', payload);
          })
          .catch(error => {
            context.commit('setLoading', false);
            console.log(error);
          });
      }
    },
    removePost (context, payload) {
      context.commit('setLoading', true);
      firebase.database().ref('posts').child(payload.id).remove()
      .then(() => {
        context.commit('setLoading', false);
        context.commit('removePost', payload);
      })
      .catch(error => {
        context.commit('setLoading', false);
        console.log(error);
      });

      let ext = payload.imageUrl.match(/\.[a-z]+(?=\?)/);

      firebase.storage().ref('posts/' + payload.id + ext).delete()
      .then(() => {
        // console.log('Image deleted successfully from storage');
        // alert('Image deleted successfully from storage');
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
