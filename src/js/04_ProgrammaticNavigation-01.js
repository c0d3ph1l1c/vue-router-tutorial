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
      name: 'user',
      component: User
    },
    {
      path: '/',
      component: null
    }
  ]
});

/* 
  router.push('home') // literal string path
  router.push({ path: 'home' }) // object 
  router.push({ name: 'user', params: { userId: '123' } })  // named route

  // with query, resulting in /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' } }) 

  In 2.2.0+, optionally provide onComplete and onAbort callbacks to router.push or router.replace as the 2nd and 3rd arguments. These callbacks will be called when the navigation either successfully completed (after all async hooks are resolved), or aborted(navigated to the same route, or to a different route before current navigation has finished), respectively.In 3.1.0+ , you can omit the 2nd and 3rd parameter and router.push / router.replace will return a promise instead if Promises are supported.

  Note: If the destination is the same as the current route and only params are changing (e.g.going from one profile to another /users/1 -> /users/2), you will have to use beforeRouteUpdate to react to changes(e.g.fetching the user information).

  router.replace acts like router.push, the only difference is that it navigates without pushing a new history entry, as its name suggests - it replaces the current entry.
*/

new Vue({
  data: {
    number: null,
    idx: 0,
    history: [null]
  },
  methods: {
    push() {
      if(this.number) {
        // this.$router.push(`/user/${this.number}`);
        this.$router.push({
          name: 'user',
          params: {
            id: this.number
          }
        }).catch(err => {});
        this.history.splice(0, this.idx, this.number);
        this.idx = 0;
      }
    },
    replace() {
      if(this.number) {
        // this.$router.replace(`/user/${this.number}`);
        this.$router.replace({
          name: 'user',
          params: {
            id: this.number
          }
        }).catch(err => {});
        this.history.splice(this.idx, 1, this.number);
      }
    },
    go() {
      if (this.number) {
        this.$router.go(this.number);
        if(0 <= this.idx - this.number && 
           this.idx - this.number <= this.history.length - 1) {
          this.idx -= this.number;
        }
      }
    }
  },
  router
}).$mount('#app');