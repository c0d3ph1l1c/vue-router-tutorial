import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const User = {
  props: ['id'],
  template: '<h3 class="user">User {{ id }}</h3>'
};

const Sidebar = {
  template: `
    <ul class="sidebar">
      <li><a>Home</a></li>
      <li><a>Profile</a></li>
      <li><a>Contact</a></li>
    </ul>`
}

/* When props is set to true, the route.params will be set as the component props */

const router = new VueRouter({
  routes: [
    // { path: '/user/:id', component: User, props: true },

    // for routes with named views, you have to define the `props` option for each named view:
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Passing Props to Route Components</h1>
      <router-link to="/user/123">/user/123</router-link>
      <div class="content">
        <router-view></router-view>
        <router-view name="sidebar"></router-view>
      </div>
    </div>
  `
}).$mount('#app');