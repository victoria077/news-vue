import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView  from '../views/News.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/news',
    name: 'news',
    component: HomeView,
    // children: [{
    //   path: '/news/:id',
    //   component: () =>
    //             import ( /* webpackChunkName: "Messages" */ '../views/Post.vue')
    // }]
  },
  {
    path: '/news/:id',
    component: () =>
              import ( /* webpackChunkName: "Messages" */ '../views/Post.vue')
  },
  {
    path: '/addPost',
    name: 'addPost',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddPost.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
