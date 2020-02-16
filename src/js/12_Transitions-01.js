import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { template: '<div>Home</div>' };
const Foo = { template: '<div>Foo</div>' };
const Bar = { template: '<div>Bar</div>' };

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/foo',
      component: Foo
    },
    {
      path: '/bar',
      component: Bar
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <router-link to="/">/</router-link>
      <router-link to="/foo">/foo</router-link>
      <router-link to="/bar">/bar</router-link>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  `
}).$mount('#app');