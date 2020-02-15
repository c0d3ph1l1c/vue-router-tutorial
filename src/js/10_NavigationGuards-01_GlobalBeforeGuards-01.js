import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { 
  template: '<div>Home</div>'
};

const Login = {
  props: ['username', 'password', 'incorrect', 'hasLoggedIn'],
  template: `
    <div>
      <label for="username">Username: </label>
      <input 
        type="text" 
        id="username" 
        :value="username"
        @input="$emit('username-input', $event.target.value)"
      />
      <label for="password">Password: </label>
      <input 
        type="password" 
        id="password" 
        :value="password"
        @input="$emit('password-input', $event.target.value)"
      />
      <button 
        @click="$emit('click')"
      >
        Submit
      </button>
      <span 
        v-if="incorrect"
        :style="{ color: 'red', fontStyle: 'italic' }"
      >
        Username or password incorrect!
      </span>
      <span 
        v-if="hasLoggedIn"
        :style="{ color: 'red', fontStyle: 'italic' }"
      >
        User has logged in!
      </span>
    </div>
  `
};

const Posts = {
  template: `
    <ul>
      <li>
        <h3>Post 1</h3>
        <p>This is post 1.</p>
      </li>
      <li>
        <h3>Post 2</h3>
        <p>This is post 2.</p>
      </li>
      <li>
        <h3>Post 3</h3>
        <p>This is post 3.</p>
      </li>
    </ul>
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
      path: '/login',
      component: Login
    },
    {
      path: '/posts',
      component: Posts
    }
  ]
});

let isAuthenticated = false;

const vm = new Vue({
  data: {
    username: '',
    password: '',
    incorrect: false,
    hasLoggedIn: false,
    currUser: '',
    users: [ 
      {
        id: 0, 
        username: 'user', 
        password: 'password'
      }
    ]   
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
      for(let i = 0 ; i < this.users.length; i++) {
        if(this.username == this.users[i].username &&
           this.password == this.users[i].password) {
          isAuthenticated = true;
          this.currUser = this.username;
          this.username = '';
          this.password = '';
          this.$router.push('/posts');
          break;
        } else {
          this.incorrect = true;
          this.username = '';
          this.password = '';
        }
      }
    },
    logout() {
      isAuthenticated = false;
      this.currUser = '';
      this.username = '';
      this.password = '';
      this.$router.push('/');
    }
  },
  router,
  template: `
    <div id="app">
      <router-link to="/login">Login</router-link>
      <router-link to="/posts">Posts</router-link>
      <span v-if="currUser">{{ currUser }} logged in!</span>
      <button v-if="currUser" @click="logout">Logout</button>
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
  vm.incorrect = false;
  vm.hasLoggedIn = false;
  vm.username = '';
  vm.password = '';
  if (to.path == '/posts' && !isAuthenticated) next('/login');
  else next();
});