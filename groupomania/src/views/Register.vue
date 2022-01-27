<template>
  <div>
    <div class="card card-container">
      <h1>Inscription</h1>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form  v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <input name="username" type="text" class="form-control" placeholder="Nom d'utilisateur" v-model="username" req/>
        <div class="form-group">

          <input
            name="email"
            type="text"
            class="form-control"
            placeholder="Adresse mail"
            v-model="email"
          />
        </div>
          <div class="form-group">
            <input name="password" type="password" class="form-control" placeholder="Mot de passe" v-model="password"/>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" @click="signup">
              <span>Inscription</span>
            </button>
          </div>
        </div>
        <p>
          Vous avez déjà un compte ?
          <a href="#/login">
            <span>Se connecter</span>
          </a>
        </p>
      </form>

    
    </div>
  </div>
</template>

<script>
import authservice from "../services/authservice";
export default {
  data() {
    return {
      email: this.email,
      password: this.password,
      error: this.error,
      username: this.username,
    };
  },
  methods: {
    async signup() {
      if(this.username==""){ // Message d'erreur renseigner un champ
        alert("Veuillez renseigner un Nom d'utilisateur");
        return;
      }
      if(this.email==""){ // Message d'erreur renseigner un champ
        alert("Veuillez renseigner une adresse Email");
        return;
      }
      if(this.password==""){ // Message d'erreur renseigner un champ
        alert("Veuillez renseigner un mot de passe");
        return;
      }
      try {
        const response = await authservice.signup({
          email: this.email,
          password: this.password,
          username: this.username,
          error: this.error,
        });

        const res = response.data.token;
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
        console.log("ok")
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
  },
};
</script>

<style>
/* Style dans le fichier Login.vue */
</style>