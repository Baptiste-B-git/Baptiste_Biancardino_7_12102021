<template>
  <div>
    <nav class="menu-nav">
      <img class="logo" src="../assets/logo.png" alt="Logo Groupomania" />
      <h1 class="name-user">Bonjour {{ username }}</h1> |
      <router-link to="/" title="accueil">Accueil</router-link> |
      <router-link to="/profil" title="profil">Profil</router-link> |
      <button class="btn-logout" title="Deconnexion" @click="logout">Déconnexion</button>
    </nav>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Header",
  data(){
    return{
      error: null,
      user: null,
      username: null,
    }
  },
    beforeMount() {
    this.getId();
  },
  methods:{
    // On récupère l'id et donc le nom d'utilisateur 
    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      try {
        const res = await fetch(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        this.user = user;
        this.username = user.username;
      } catch (error) {
        console.log(error);
      }
    },

    // Déconnexion du compte
    logout() {
      localStorage.clear();   
      this.$router.push({ name: "Login" });
      console.log("Deconnexion du compte");
    },
  },
};
</script>

<style scoped>
.logo {
	width: 250px;
	height: 80px;
  align-items: center;
}
.menu-nav {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  background-color: #333;
  padding: 5px;
  padding-left: 50px;
  padding-right: 50px;
  color: white;
  box-shadow: 1px 5px 12px black;
  margin-bottom: 20px;
}

.profile-img-card{
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: white;
  font-size: 20px;
}
.router-link-active {
  color: white;
  background-color: rgba(88, 88, 88, 0.685);
  font-size: 20px;
  padding: 5px 8px 5px 8px;
  border: #00acee 1px solid;
  border-radius: 20px;
}
li {
  list-style: none;
}

.btn-logout {
  border-radius: 20px;
  padding: 8px;
  background-color: rgba(88, 88, 88, 0.685);
  color: white;
  border: none;
  align-items: center;
}
.btn-logout:hover {
  outline: none !important;
  border-color: rgb(165, 165, 165);
  border: white 0.1px solid;
  box-shadow: none;
}
.btn-user{
  border-radius: 50px;
  padding: 12px;
  margin-right: 12px;
  background-color: rgba(88, 88, 88, 0.685);
  color: white;
  border: none;
  box-shadow: none;
  height: 40px;
  margin-top: 15px;
}
.btn-user:hover {
  outline: none !important;
  border-color: rgb(165, 165, 165);
  border: white 0.1px solid;
}
.bloc-name-user{
  display: flex;
  position: relative;
  justify-content: space-between;
}

@media (max-width: 800px) {
  .menu-nav{
  display: block;
  color: white;
  height: 220px;
}
  h1{
    margin-top: 0px;
  }
}

@media (max-width: 350px){
  .btn-logout{
    margin-top: 20px;
  }
}
</style>