import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { template: '<div>Home</div>' };
const Foo = { 
  template: `
    <div>
      Foo
      <router-view></router-view>
    </div>
  ` 
};
const Bar = { template: '<div>Bar</div>' };
const Login = { 
  props: ['username', 'password', 'incorrect', 'hasLoggedIn'],
  template: `
    <div>
      <label for="username">Username: </label>
      <input
        id="username"
        :value="username"
        @input="$emit('username-input', $event.target.value)"
      >
      <br>
      <label for="password">Password: </label>
      <input
        id="password"
        type="password"
        :value="password"
        @input="$emit('password-input', $event.target.value)"
      >
      <br>
      <button @click="$emit('click')">Submit</button>
      <span 
        v-if="incorrect"
        :style="{ color: '#f00' }"
      >
        Username or password incorrect!
      </span>
      <span 
        v-if="hasLoggedIn"
        :style="{ color: '#f00' }"
      >
        User already logged in!
      </span>
    </div>
  `
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
});

const auth = (function() {
  let currUser = '';
  const users = [{
    id: 0,
    username: 'user',
    password: 'password'
  }];

  return {
    loggedIn() {
      return currUser !== '';
    },
    logIn(username, password) {
      for (let i = 0; i < users.length; i++) {
        if(users[i].username == username && 
           users[i].password == password) {
          currUser = username;
          return true;
        }
      }
    },
    logOut() {
      currUser = '';
    }
  };
})();

const vm = new Vue({
  data: {
    username: '',
    password: '',
    incorrect: false,
    hasLoggedIn: false,
    currUser: '',
  },
  methods: {
    authenticateUser() {
      this.incorrect = false;
      this.hasLoggedIn = false;
      if (this.currUser && this.username == this.currUser) {
        this.hasLoggedIn = true;
        this.username = '';
        this.password = '';
        return;
      }
      if(auth.logIn(this.username, this.password)) {
        this.currUser = this.username;
        this.username = '';
        this.password = '';
        this.$router.push('/foo/bar');
      } else {
        this.incorrect = true;
        this.username = '';
        this.password = '';    
      }
    },
    logout() {
      auth.logOut();
      this.currUser = '';
      this.username = '';
      this.password = '';
      this.$router.push('/');
    }
  },
  router,
  template: `
    <div id="app">
      <router-link to="/">/</router-link>
      <router-link to="/foo">/foo</router-link>
      <router-link to="/foo/bar">/foo/bar</router-link>
      <router-link to="/login">/login</router-link>
      <span v-if="currUser">
        {{ currUser }} logged in!
      </span>
      <button 
        v-if="currUser" 
        @click="logout"
      >
        Logout
      </button>
      <router-view
        :username="username" 
        :password="password"
        :incorrect="incorrect"
        :hasLoggedIn = "hasLoggedIn"
        @username-input="username = $event"
        @password-input="password = $event"
        @click="authenticateUser"
      ></router-view>
    </div>  
  `
}).$mount('#app');

router.beforeEach((to, from, next) => {
  vm.username = '';
  vm.password = '';
  vm.incorrect = false;
  vm.hasLoggedIn = false;

  if(to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if(!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();   // make sure to always call next()!
  }
});