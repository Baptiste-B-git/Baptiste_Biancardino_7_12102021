<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h1>Connexion</h1>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username"></label>
        </div>
        <div class="form-group">
          <label for="email"></label>
          <input
            name="email"
            type="text"
            class="form-control"
            placeholder="Adresse mail"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input
            name="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            v-model="password"
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" @click="handleLogin">
            <span>Connexion</span>
          </button><br>
          <p>
          Vous n'avez pas de compte ? <a href="#/register">
            <span>Créer un compte</span>
          </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import authservice from "../services/authservice";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      error: "",
    };
  },

  methods: {
    async handleLogin() {
      try {
        const response = await authservice.login({
          email: this.email,
          username: this.username,
          password: this.password,
          error: this.error,
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        const token = this.$store.state.token;
        const user = this.$store.state.user;

        const res = response.data.token;
        this.$router.push({ path: "home" });
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
label {
  display: block;
  margin-top: 10px;
}
h1 {
  margin-bottom: 10px;
  margin-top: 0;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
input {
  border: none;
}
body {
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  border-radius: 50%;
}
.btn-block {
  max-width: 100%;
  min-width: 200px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
}
.form-control {
  max-width: 100%;
  width: 300px;
  margin-top: 12px;
  background: #eeeeee;
  border-radius: 10px;
  padding: 10px;
}
p{
  font-size: 14px;
  font-weight: 500;
}
a{
  color: #007bff;
}
</style>