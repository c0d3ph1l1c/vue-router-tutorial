import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = () => import(/* webpackChunkName: "group-foo" */ '../components/Foo.vue');
const Bar = () => import(/* webpackChunkName: "group-foo" */ '../components/Bar.vue');
const Baz = () => import(/* webpackChunkName: "group-foo" */ '../components/Baz.vue');
const App = { 
  template: `
    <div>
      <foo></foo>
      <bar></bar>
      <baz></baz>
    </div>
  `,
  components: {
    foo: Foo,
    bar: Bar,
    baz: Baz
  }
};

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: App
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
