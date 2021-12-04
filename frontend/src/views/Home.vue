<template>
<div>
        <h1>Dernières publications</h1>
  <nav class="menu-nav">

    <h2>Groupomania</h2>

    <ul class="bloc-btn">
      <li class="btn">
        <a href="Home.vue"><fa icon="home" title="Accueil"/></a>
      </li>
      <li class="btn">
        <fa icon="user" title="Profil"/>
      </li>
      <li class="btn">
      <fa @click="logout()" icon="power-off" title="Déconnexion" />
      </li>
    </ul>
  </nav>
  <div class="card">
    <h3>Exprimez-vous...</h3>
    <textarea class="bio" cols="80" rows="5" placeholder="Ajouter un texte"></textarea>
  </div>
  
  
</div>
</template>

<script>
export default {
      name: 'Home',
}
</script>

<style>
nav.menu-nav ul li.btn {
  display: flex;
  height: 50px;
  padding: 3px;
  margin: 10px;
}

.menu-nav{
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color : white;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  box-shadow: 1px 5px 12px black;
}
h1{
  text-align: center;
}
h2{
  color: black;
  font-weight: 800;
  font-size: 2.5rem;
}
.bloc-btn{
  display: flex;
  flex-direction: row;
}


svg:not(:root).svg-inline--fa {
  font-size: 2em;
  color: black;
}
svg:not(:root).svg-inline--fa:hover{
  color: #f58544;
  background-color: white;
  transition: 0.3s all;
  cursor: pointer;
}
</style>