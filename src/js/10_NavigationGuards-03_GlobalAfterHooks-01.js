import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { template: '<div>Home</div>' }; 
const Foo = { template: '<div>Foo</div>' }; 
const Bar = { template: '<div>Bar</div>' }; 

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});

router.beforeEach((to, from, next) => {
  console.log('****BeforeEach****');
  console.log('to: ');
  console.log(to);
  console.log('from: ');
  console.log(from);
  next();
});

router.beforeResolve((to, from, next) => {
  console.log('****BeforeResolve****');
  console.log('to: ');
  console.log(to);
  console.log('from: ');
  console.log(from);
  next();
});

router.afterEach((to, from) => {
  console.log('****AfterEach****');
  console.log('to: ');
  console.log(to);
  console.log('from: ');
  console.log(from);
});

new Vue({
  router,
  template: `
    <div id="app">
      <router-link to="/">/</router-link>
      <router-link to="/foo">/foo</router-link>
      <router-link to="/bar">/bar</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');

