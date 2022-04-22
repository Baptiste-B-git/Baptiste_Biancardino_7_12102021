<template>
  <div>
    <div class="card card-container">
      <h1>Inscription</h1>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form v-on:submit.prevent="onSubmit" class="registerForm">
        <!-- Username -->
        <div class="form-group">
          <input
            name="username"
            type="pseudo"
            class="form-control"
            placeholder="Nom d'utilisateur"
            maxlength="15"
            autofocus
            required
            v-model="username"
          />
          <!-- <div v-if="error" style="color: red" class="error">{{ error }}</div> -->
        </div>

        <!-- Email -->
        <div class="form-group">
          <input
            name="email"
            type="email"
            class="form-control"
            placeholder="Adresse mail"
            maxlength="25"
            required
            v-model="email"
          />
        </div>

        <!-- Password -->
        <div class="form-group">
          <input
            name="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            maxlength="25"
            required
            v-model="password"
          />
        </div>

        <!-- Vers Connexion -->
        <div class="form-group">
          <!-- <div v-if="error" class="error">{{ error }}</div> -->
          <button
            class="btn btn-primary btn-block" href="/login"
            @click="signup"
          >
            <span>Inscription</span>
          </button>
        </div>
        <p>
          Vous avez déjà un compte ?
          <a class="link-to" href="/login">
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
      email: "",
      username: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async signup() {
      if(this.username=="" || this.email=="" || this.password==""){ // Message d'erreur renseigner un champ
        return false;
      }

      try {
        const response = await authservice.signup({
          email: this.email,
          password: this.password,
          username: this.username,
        });
        const res = response.data.token;
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
        this.$router.push({ name: "Login" }); // Push vers Login
        // this.error="erreur de création"
        console.log("ok");
      } catch (error) {
        this.error = error;
        console.log(error);
      }
    },
  },
};
</script>

<style>
/* input:invalid {
  box-shadow: 0 0 5px 1px red;
} */
/* 
input:valid {
  border: 1px solid black;
} */
/* :required
{
  box-shadow: 0 0 5px 1px red;
} */
</style>