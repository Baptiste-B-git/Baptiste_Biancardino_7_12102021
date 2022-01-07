<template>
<!-- COMPOSANTS -->
  <nav class="menu-nav">
    <h1>Groupomania</h1>
    <ul class="bloc-btn">
      <li class="btn">
        <a href="Home.vue">
        <i class="fas fa-home fa-2x" title="Accueil"></i></a>
      </li>

      <li class="btn">
        <a href="Profile.vue">
          <i class="fas fa-user-alt fa-2x" title="Profil"></i>
        </a>
      </li>

      <li class="btn">
    <div @click="logout"><h3>Logout</h3></div>
      
      </li>
    </ul> 
  </nav>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "Header",

 

  methods: {
  

    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      localStorage.clear();   
        this.$router.push({ name: "Login" });

    },
  },
};
</script>

<style>
/* Header */
.menu-nav{
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color : white;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  color: white;
  box-shadow: 1px 5px 12px black;
}
h1{
  color: black;
  font-weight: 800;
  font-size: 2.5rem;
}
nav.menu-nav ul li.btn {
  display: flex;
  height: 50px;
  width: 50px;
  padding: 5px;
  margin: 10px;
  color: black;
}
.fas{
  margin-top: 10px;
  width: 100%;
}
a {
  color: black;
}
a:hover{
  color: #f58544;
  background-color: white;
  transition: 0.3s all;
  cursor: pointer;
}

h3:hover {
  cursor:pointer
}
</style>