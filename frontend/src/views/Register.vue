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
            type="text"
            class="form-control"
            placeholder="Nom d'utilisateur"
            v-model="username"
            req
          />
          <small></small>
        </div>
        <!-- Email -->
        <div class="form-group">
          <input
            name="email"
            type="text"
            class="form-control"
            placeholder="Adresse mail"
            v-model="email"
          />
          <small></small>
        </div>

        <!-- Password -->
        <div class="form-group">
          <input
            name="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            v-model="password"
          />
          <small></small>
        </div>

        <!-- Vers Connexion -->
        <div class="form-group">
          <button class="btn btn-primary btn-block" @click="signup">
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
      password: "",
      error: this.error,
      userName: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await authservice.signup({
          email: this.email,
          password: this.password,
          userName: this.userName,
          error: this.error,
        });
        const res = response.data.token;
        // this.$router.push({ name: "Login" }); // Push vers Login.vue
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
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
</style>