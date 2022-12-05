import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})
//a page name to title on route change
router.beforeEach((to, from, next) => {
//to is where we are going
//from is which router are we comin from
//next is metho we need to trigger to display our new page
//document.title will target the title in index.html
document.title= `${ process.env.VUE_APP_TITLE } - ${ to.name }`
next()
})

//to automaticlly scrollto the begining of the page after jumping from one to another
router.afterEach((to, from) => {
 goTo(0, { duration: 0 })
})

export default router
