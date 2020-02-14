import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };
const Baz = { template: '<div>baz</div>' };

const router = new VueRouter({
  routes: [
    {
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    }
  ]
});

new Vue({
  router
}).$mount('#app');