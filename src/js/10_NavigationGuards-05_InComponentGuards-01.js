import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const mixin = Vue.mixin({
  beforeRouteEnter(to, from, next) {
    console.log('****BeforeRouteEnter****');
    console.log('to: ');
    console.log(to);
    console.log('from: ');
    console.log(from);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('****BeforeRouteUpdate****');
    console.log('to: ');
    console.log(to);
    console.log('from: ');
    console.log(from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('****BeforeRouteLeave****');
    console.log('to: ');
    console.log(to);
    console.log('from: ');
    console.log(from);
    next();
  }
});

const Home = { 
  mixins: ['mixin'],
  template: '<div>Home</div>' 
}; 
const Foo = { 
  mixins: ['mixin'],
  template: '<div>Foo {{ $route.params.id }}</div>' 
}; 
const Bar = { 
  mixins: ['mixin'],
  template: '<div>Bar</div>' 
}; 

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      component: Home,
      beforeEnter: (to, from, next) => {
        console.log('****BeforeEnter****');
        console.log('to: ');
        console.log(to);
        console.log('from: ');
        console.log(from);
        next();
      } 
    },
    { 
      path: '/foo/:id?', 
      component: Foo,
      beforeEnter: (to, from, next) => {
        console.log('****BeforeEnter****');
        console.log('to: ');
        console.log(to);
        console.log('from: ');
        console.log(from);
        next();
      }
    },
    { 
      path: '/bar', 
      component: Bar,
      beforeEnter: (to, from, next) => {
        console.log('****BeforeEnter****');
        console.log('to: ');
        console.log(to);
        console.log('from: ');
        console.log(from);
        next();
      }
    }
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
      <router-link to="/foo/1">/foo/1</router-link>
      <router-link to="/foo/2">/foo/2</router-link>
      <router-link to="/bar">/bar</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');

