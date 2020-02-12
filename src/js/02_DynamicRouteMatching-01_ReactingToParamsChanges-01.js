import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const User = {
  template: '<div>User {{ $route.params.id }}</div>',
  watch: {
    $route(to, from) {
      console.log('from: ');
      console.dir(from);
      console.log('to: ');
      console.dir(to);
    }
  }
};

const User2 = {
  template: '<div>User2 {{ $route.params.id }}</div>',
  beforeRouteUpdate(to, from, next) {
    console.log('from: ');
    console.dir(from);
    console.log('to: ');
    console.dir(to);
    next();
  }
};

const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User
    },
    {
      path: '/user2/:id',
      component: User2
    }
  ]
});

const app = new Vue({
  router
}).$mount('#app');