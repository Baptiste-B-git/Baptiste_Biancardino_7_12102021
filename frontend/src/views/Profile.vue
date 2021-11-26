<template>
<div>
  <nav class="menu-nav">
    <h2>Groupomania</h2>

    <ul class="bloc-btn">
      <li class="btn">
        <fa icon="home" title="Accueil"/>
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
    <h1 class="card__title">Espace Perso</h1>
    <div  class="card_bloc">
      <div class="card__profile">
        <p class="card__subtitle">Photo de profil</p>
        <p>{{user.prenom}} {{user.nom}} {{user.email}}</p>
        <img :src="user.photo"/>
        <div class="form-row"></div>
        <button class="button">Changer d'image</button>
        <button class="button">Envoyer</button>
      </div>


      <div class="card__bio">
        <p class="card__subtitle">Bio</p>
        <form class="bloc-bio" method="post">
          <textarea class="bio" cols="40" rows="5" placeholder="Description"></textarea>
          <input class="button-bio" type="submit" value="Valider modifications"/>
        
        
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
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
</style>>
