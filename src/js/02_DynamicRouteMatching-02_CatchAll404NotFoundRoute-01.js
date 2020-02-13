import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const NotFound = {
  template: '<div>404 Not Found!</div>'
};

const User = {
  template: '<div>User: {{ $route.params.pathMatch }}</div>'
};

const router = new VueRouter({
  routes: [
    {
      path: '/user-*',
      component: User
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

new Vue({
  router,
  methods: {
    toNotFound() {
      this.$router.push('/non-existing');
      alert('PathMatch: ' + this.$route.params.pathMatch);
    },
    toUserAdmin() {
      this.$router.push('/user-admin');
      alert('PathMatch: ' + this.$route.params.pathMatch);
    },
  }
}).$mount('#app');