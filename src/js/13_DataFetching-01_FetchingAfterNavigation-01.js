import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function getPost(id, cb) {
  setTimeout(() => {
    if (!parseInt(id)) {
      cb(new Error('Invalid route!'));
    } else {
      cb(null, {
        title: `Post ${id}`,
        body: `This is post ${id}.`
      });
    }
  }, 2000);
}

const Post = {
  data() {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created() {
    // fetch the data when the view is created and the data is already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // replace `getPost` with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    }
  },
  template: `
    <div class="post">
    
      <div v-if="loading" class="loading">
        Loading...
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>  

      <div v-if="post" class="content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  `
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/post/1'
    },
    {
      path: '/post/:id',
      component: Post
    }
  ]
});

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Fetching After Navigation</h1>
      <router-link to="/post/1">/post/1</router-link>
      <router-link to="/post/2">/post/2</router-link>
      <router-link to="/post/3">/post/3</router-link>
      <router-link to="/post/invalid">/post/invalid</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');
