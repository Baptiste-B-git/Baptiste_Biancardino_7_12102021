<template>
  <nav class="menu-nav">
<p><img class="logo" src="../assets/logo2.png" alt="Logo Groupomania" /></p>
    <ul class="bloc-btn">
      <li class="btn">
        <a href="#/home">
        <i class="fas fa-home fa-2x" title="Accueil"></i></a>
      </li>

      <li class="btn">
        <a href="#/profile">
          <i class="fas fa-user-alt fa-2x" title="Profil"></i>
        </a>
      </li>

      <li class="btn">
        <a href="#/login">
          <i class="fas fa-sign-out-alt fa-2x" title="Déconnexion" @click="logout"></i>
        </a>
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

<style scoped>
.logo {
	width: 250px;
	height: 80px;
}

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
  padding-left: 50px;
  padding-right: 30px;
  color: white;
  box-shadow: 1px 5px 12px black;
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
  transition: 0.3s all;
  cursor: pointer;
}

h3:hover {
  cursor:pointer
}
</style>