<template>
<div>
  <nav class="menu-nav">
        <h2>Groupomania</h2>
    <ul class="bloc-btn">
      <li class="btn">
        <a href="#">Profil</a>
      </li>
      <li class="btn">
        <a href="#">test</a>
      </li>
      <li class="btn">
        <a href="#">test2</a>
      </li>
    </ul>
  </nav>


  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <p>{{user.prenom}} {{user.nom}} {{user.email}}</p>
    <img :src="user.photo"/>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
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
  list-style-type: none;
  height: 50px;
  padding: 3px;
}
nav.menu-nav ul li.btn a{
  color: white;
  background-color: rgb(255, 102, 0);
  text-decoration: none;
  padding: 10px;
  border-radius: 12px;

}
nav.menu-nav ul li.btn:hover a{
  color: rgb(255, 102, 0);
  background-color: white;
  transition: 0.3s all;
  border: 1px solid rgb(255, 102, 0);
}
.menu-nav{
  display: flex;
  position: absolute;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color : white;
  padding: 5px;
  padding-left: 5px;
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

</style>>
