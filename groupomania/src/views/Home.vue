<template>
<nav class="menu-nav">
    <h1>Groupomania</h1>
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
  <div class="home">

  </div>
  <h2>Dernières publications</h2>
  <div class="card">
    <h3>Exprimez-vous...</h3>
    <textarea class="bio" cols="80" rows="5" placeholder="Ajouter un texte"></textarea><br>
    <button class="button">Choisir une image</button>
    <button class="button">Publier !</button>
  </div>

  <div class="card">
    <div class="bloc-picture-name">
      <div class="picture-profile">Photo</div>
      <p>Nom de l'utilisateur</p>
    </div>
  </div>

    <div class="card">
    <h3>Vos commentaires</h3>
    <textarea class="comment-field" cols="80" rows="1" placeholder="Votre commentaire"></textarea><br>
    <button class="button">Commenter !</button>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',

}
</script>

<style>


html,
body{
  padding: 0;
  height: 100%;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}

nav.menu-nav ul li.btn {
  display: flex;
  height: 50px;
  width: 50px;
  padding: 3px;
  margin: 10px;

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
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  box-shadow: 1px 5px 12px black;
}
h1{
  color: black;
  font-weight: 800;
  font-size: 2.5rem;
}
h3{
  margin-top: 0;
  margin-bottom: 20px;
}

.bloc-btn{
  display: flex;
  flex-direction: row;
}


.svg-inline--fa {
  font-size: 2em;
  color: black;
}
.svg-inline--fa:hover{
  color: #f58544;
  background-color: white;
  transition: 0.3s all;
  cursor: pointer;
}

.picture-profile{
  width: 50px;
  height: 50px;
  background-color: rgb(253, 241, 201);
}
.button{
    max-width: 100%;
  min-width: 200px;
  border: none;
  border-radius: 8px;
  padding:10px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: #007BFF;
  Color:white;
}
.bloc-picture-name{
flex-direction: row;
margin: 0 10px 10px 0;
}

.bio{
  width: 100%;
  border-radius: 5px;
}
.comment-field{
  height: ;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  width: 600px;
  margin: 0 auto 25px;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
</style>