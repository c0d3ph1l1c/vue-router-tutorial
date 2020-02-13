import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const User = {
  template: '<div>User {{ $route.params.id }}</div>',
  beforeRouteUpdate(to, from, next) {
    console.log('****Before Route Update****');
    console.log('from: ');
    console.dir(from);
    console.log('to: ');
    console.dir(to);
    next();
  },
  watch: {
    $route(to, from) {
      console.log('****Watch****');
      console.log('from: ');
      console.dir(from);
      console.log('to: ');
      console.dir(to);
    }
  }
};

const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User
    }
  ]
});

const app = new Vue({
  router
}).$mount('#app');