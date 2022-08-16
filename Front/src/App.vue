<template>
  <div id="app">
    <b-navbar toggleable="lg" class="navbar">
      <img src="https://www.allrecipes.com/img/misc/og-default.png" width="220" height="100" >
      <b-navbar-brand :to="{ name: 'main' }">Main</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <b-navbar-brand >Hello Guest</b-navbar-brand>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item :to="{ name:'addPersonalRecipes' }">Create Recipe</b-nav-item>
          
           <b-nav-item-dropdown>
          <template #button-content>Personal
          </template>
          <b-dropdown-item :to="{ name: 'favorites' }">Favorites</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'personalRecipes' }">My Recipes</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'familyRecipe' }">Family Recipe</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown right>
          <template #button-content>
            {{$root.store.username}}
          </template>
          <b-dropdown-item href="#" @click="Logout()">Log Out</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      // try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/Logout", { withCredentials: true },
        );
        this.$root.store.logout();
        sessionStorage.setItem("LastQuery", "");
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
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
</style>
