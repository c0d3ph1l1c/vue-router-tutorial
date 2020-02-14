import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const A = {
  template: '<div>A</div>'
};

/* An alias of /a as /b means when the user visits /b, the URL remains /b, but it will be matched as if the user is visiting /a */

const router = new VueRouter({
  routes: [
    {
      path: '/a',
      component: A,
      alias: '/b'
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Alias</h1>
      <router-link :to="{ path: '/a' }">/a</router-link>
      <router-link :to="{ path: '/b' }">/b</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');