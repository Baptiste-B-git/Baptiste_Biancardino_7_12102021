<template>

<!-- Header -->
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
                <fa @click="logout()" icon="power-off" title="Déconnexion" />
                <fa class="fas fa-power-off fa-2x" title="Déconnexion"></fa></a>
            </li>
        </ul> 
    </nav>

<!-- Profile -->
    <div class="card">
        <div class="name-user">Dupont Jeanne</div>
        <div class="double-bloc">
            <div class="col-1">
                <p class="sub-title">Photo de profil</p>
                <div class="bloc-photo-profile">
                    <div class="photo-profile"><img src="../assets/profil-1.png" alt="profil-6"></div>
                    <button class="button-profile">Changer ma photo de profil</button>
                </div>
            </div>
            <div class="col-2">
                <p class="email-and-account">E-mail</p>
                <p>dupont.jeanne@gmail.com</p>
                <p class="email-and-account">Description</p>
                <p>Pas de description</p>
                <textarea class="account" cols="30" rows="5" placeholder="Votre nouvelle description"></textarea>
                <button class="button-account">Changer ma description</button>
            </div>
        </div>

        <div class="double-bloc">
            <div class="col-1">
                <p class="sub-title">Changer de mot de passe</p>
                
                <input name="actually-password" type="text" class="password-field" placeholder="Mot de passe actuel" v-model="username" />

                <input name="new-password" type="text" class="password-field" placeholder="Nouveau mot de passe" v-model="username" />

                <button class="button-password">Modifier mot de passe</button>
            </div>
            
            <div class="col-2">
                <p class="text-delete">Supprimer mon compte</p>
                
                <button class="button-delete">Supprimer</button>
            </div>
        </div>

    </div>
  
</template>
<script>
export default {
    name: 'Profile',
}
</script>
<style scoped>
.password-field{
  max-width: 100%;
  width: 100%;
  margin-top: 10px;
  background:#f2f2f2;
  border-radius: 10px;
  padding:10px;
}
html,
body{
  padding: 0;
  height: 100%;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}

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

/* Profile */
.card{
    margin-top: 50px;
}

.name-user{
    font-weight: 800;
    font-size: 2rem;
    padding-bottom: 10px;
    border-bottom: solid 1px black;
}

.double-bloc{
    display: flex;
    padding-bottom: 20px;
    border-bottom: solid 1px black;
    width: 100%;
}
.col-1{
    flex: 1; 
    padding: 2em;

}
.col-2{
    flex: 1; 
    padding: 2em;

}

.bloc-photo-profile{
    margin-top: 20px;
    margin-left: 50px;
    margin-top: 0;
    width: 180px;
    height: auto;

}
.photo-profile img{
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: blue;
}
.button-profile{
    width: 100%;
    height: auto;
    border: none;
    padding: 8px;
    background-color: #007BFF;
    border-radius: 0px 0px 10px 10px;
    color:white;
    text-align:center;
}
.button-account{
    width: 100%;
    height: auto;
    border: none;
    padding: 8px;
    background-color: #007BFF;
    border-radius: 0px 0px 10px 10px;
    color:white;
    text-align:center;
}
.button-password{
    margin-top: 10px;
    height: auto;
    border: none;
    padding: 8px;
    background-color: #007BFF;
    border-radius: 10px;
    color:white;
    text-align:center;
}
.button-delete{
    height: auto;
    border: none;
    padding: 8px;
    background-color: #007BFF;
    border-radius: 10px;
    color:white;
    text-align:center;
}
.sub-title{
    text-align: left;
    margin-left:50px;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 1.2em;
}
.email-and-account{
    text-align: left;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 1.2em;
}
.text-delete{
    text-align: center;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 1.2em;
}
.account{
    padding: 0.5em;
    border-radius: 5px;
    width: 100%;
}
p{
    text-align: left;
}

</style>