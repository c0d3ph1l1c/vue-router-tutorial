import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = {
  template: `
    <transition name="slide" mode="out-in">
      <div class="foo">foo</div>
    </transition>
  `
};

const Bar = {
  template: `
    <transition name="fade" mode="out-in">
      <div class="bar">bar</div>
    </transition>
  `
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/foo'
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
      <router-link to="/foo">/foo</router-link>
      <router-link to="/bar">/bar</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');