import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
};

const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User
    }
  ]
});

const app = new Vue({ router }).$mount('#app');
