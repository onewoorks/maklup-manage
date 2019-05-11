<template>
  <div id="app">
    <nav
      class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"
      v-if="authenticated"
    >
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">PULKAM ADMIN</a>

      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" v-on:click="logout">Sign out</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar no-print" v-if="authenticated">
          <div class="sidebar-sticky">
            <SideMenu/>
          </div>
        </nav>

        <main role="main" class="ml-sm-auto ycol" :class=" !authenticated ? 'col-sm-12' : 'col-md-9  col-lg-10 px-4'">
          <router-view @authenticated="setAuthenticated"/>
        </main>
      </div>
    </div>

    <div id="nav"></div>
  </div>
</template>

<style>
#sticky-sidebar {
  position: absolute;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media print {
  .no-print {
    display: none;
  }
}
</style>

<script>
import SideMenu from "@/components/SideMenu";
export default {
  components: {
    SideMenu
  },
  data() {
    return {
      class: {
        mainView: "ycol col-md-9 ml-sm-auto col-lg-10 px-4"
      },
      authenticated: false,
      mockAccount: {
        username: "iwang",
        password: "iwang"
      }
    };
  },
  created: function(){
    
    if(localStorage.getItem('auth-jwt') == ''){
      this.$router.replace({ name: "login" });
    } else {
      this.authenticated = true;
      this.$router.replace({name: "home"})
    }    
  },
  mounted: function() {
    // if (!this.authenticated) {
    //   this.$router.replace({ name: "login" });
    // }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      localStorage.removeItem('jwt-auth')
      this.authenticated = false;
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
