import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/* 
  The default mode for vue-router is hash mode - it uses the URL hash to simulate a full URL so that the page won't be reloaded when the URL changes.

  To get rid of the hash, we can use the router's history mode, which leverages the history.pushState API to achieve URL navigation without a page reload. 

  hash: http://oursite.com/#/user/id
  history: http://oursite.com/user/id
*/

const Home = { template: '<div>home</div>' };
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };
const Baz = { template: '<div>baz</div>' };

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
    },
    {
      path: '/baz',
      component: Baz
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <h1>HTML5 History Mode</h1>
      <router-link to="/foo">/foo</router-link>
      <router-link to="/bar">/bar</router-link>
      <router-link to="/baz">/baz</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');