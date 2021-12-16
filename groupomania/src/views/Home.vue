<template>
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
        <a href="Logout">
      <!-- <fa @click="logout()" icon="power-off" title="Déconnexion" /> -->
        <fa class="fas fa-power-off fa-2x" title="Déconnexion"></fa></a>
      </li>
    </ul> 
  </nav>

  <h2>Dernières publications</h2>
  <div class="card">
    <h3>Exprimez-vous...</h3>
    <textarea class="bio" cols="80" rows="5" placeholder="Ajouter un texte"></textarea><br>
    <button class="button">Choisir une image</button>
    <button class="button">Publier !</button>
  </div>

  <div class="card">
    <div class="bloc-picture-name">
      <div class="picture-profile"><img src="../assets/profil-6.png" alt="profil-6"></div>
      <div class="user-name">Nom de l'utilisateur</div>
    </div>
    <div class="post-img"><img src="../assets/okinawa.png" alt="coucher de soleil"></div>
    
    <div class="post-name">Mon dernier voyage à Okinawa !</div>
      <h3>Commentaires</h3>
      <div class="comment-list">
      <div class="picture-profile-comment"><img src="../assets/profil-3.png" alt="profil-3"></div>

      </div>
      
      <textarea class="comment-field" cols="80" rows="2" placeholder="Votre commentaire"></textarea><br>
      <button class="button">Commenter !</button>
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

.title{
  color: black;
  font-size: 3rem;
  font-weight: 800;
}
nav.menu-nav ul li.btn {
  display: flex;
  height: 50px;
  width: 50px;
  padding: 3px;
  margin: 10px;
  color: black;

}
.fas{
  margin-top: 10px;
  width: 100%;
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
h3{
  margin-top: 20px;
  margin-bottom: 20px;
}

.bloc-btn{
  display: flex;
  flex-direction: row;
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

.picture-profile{
  width: 50px;
  height: 50px;
  background: rgb(187, 187, 187);
}
.picture-profile-comment img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
  display: block;
  flex-direction: row;
  margin: 0 10px 10px 0;
}

.bio{
  width: 100%;
  border-radius: 5px;
}
.user-name{
  text-align: left;
}
.post-img{
  max-width: auto;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;

  box-sizing: border-box;
  background: rgb(187, 187, 187);
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.post-name{
  margin-top: 10px;
  text-align: left;
}
.comment-field{
  resize : both;
  width:100%;
  min-height : 30px;
  max-height : 200px;
}


.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  width: 700px;
  margin: 0 auto 25px;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
</style>