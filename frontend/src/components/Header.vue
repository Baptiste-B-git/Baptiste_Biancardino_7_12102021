<template>
  <div>
    <nav class="menu-nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/profil">Profil</router-link> |
      <router-link to="/register">S'inscrire</router-link> |
      <router-link to="/login">Se connecter</router-link> |
      <button class="btn-logout">Déconnexion</button>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: white;
font-size: 20px;
    text-shadow: 4px 4px 5px rgb(131, 131, 131);
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
  box-shadow: 0 0 5px rgb(141, 141, 141);
}
</style>