import VueRouter from 'vue-router';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Post from './components/pages/Post'
import Admin from './components/pages/Admin/Admin'
import CreatePost from './components/pages/Admin/Create'
import EditPost from './components/pages/Admin/Edit'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/about',
      component: About,
      name: 'about'
    },
    {
      path: '/post/:id',
      component: Post,
      name: 'post'
    },
    {
      path: '/admin',
      component: Admin,
      name: 'admin'
    },
    {
      path: '/admin/post/create',
      component: CreatePost,
      name: 'create-post'
    },
    {
      path: '/admin/post/edit/:id',
      component: EditPost,
      name: 'edit-post'
    }
  ],
  mode: "history"
});