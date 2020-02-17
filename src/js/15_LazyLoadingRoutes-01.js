import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = () => import('../components/Foo.vue');

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/foo'
    },
    {
      path: '/foo',
      component: Foo
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `
}).$mount('#app');