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
      post: null,
      error: null
    }
  },
  beforeRouteEnter(to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post));
    });
  },
  // when route changes and this component is already rendered, the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    this.post = null;
    this.error = null;
    getPost(to.params.id, (err, post) => {
      this.setData(err, post);
      next();
    });
  },
  methods: {
    setData(err, post) {
      if(err) {
        this.error = err.toString();
      } else {       
        this.post = post;
      }
    }
  },
  template: `
    <div class="post">
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
  routes: [{
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
      <h1>Fetching Before Navigation</h1>
      <router-link to="/post/1">/post/1</router-link>
      <router-link to="/post/2">/post/2</router-link>
      <router-link to="/post/3">/post/3</router-link>
      <router-link to="/post/invalid">/post/invalid</router-link>
      <router-view></router-view>
    </div>
  `
}).$mount('#app');
