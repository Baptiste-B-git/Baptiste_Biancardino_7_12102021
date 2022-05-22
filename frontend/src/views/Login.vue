<template>
  <div>
    <div class="card card-container">
      <h1>Connexion</h1>
      <img
        class="profile-img-card"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="png"/>
      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <area-label id="username" for="username"></area-label>
          <!-- area label -->
        </div>

        <!-- e-mail -->
        <div class="form-group">
          <div v-if="error" style="color: crimson" class="error" :key='error'>{{ error }}</div>
          <label for="email">Adresse e-mail :</label>
          <input
            name="email"
            type="email"
            id="form-control"
            placeholder="Adresse e-mail"
            maxlength="25"
            autofocus
            required
            v-model="email"/>
        </div>

        <!-- Mot de passe -->
        <div class="form-group">
          <area-label for="password"></area-label>
          <input
            name="password"
            type="password"
            class="form-control"
            placeholder="Mot de passe"
            maxlength="25"
            required
            v-model="password"/>
        </div>

        <!-- Bouton Connexion -->
        <div class="form-group">
          <button class="btn-block" @click="login">Connexion</button>
        </div>

        <!-- Redicrection vers l'inscription -->
          <p>
            Vous n'avez pas de compte ?
            <a class="link-to" href="/register">Créer un compte</a>
          </p>
      </form>
    </div>
  </div>
</template>

<script>
import authservice from "../services/authservice";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      if(this.email=="" || this.password==""){ // Message d'erreur renseigner un champ
        return false;
      }
      try {
        const response = await authservice.login({
          email: this.email,
          password: this.password,
          error: this.error,
        });
        const res = response.data.token;
        const parsed = JSON.stringify(res);
        localStorage.setItem("res", parsed);
        this.$router.push({ name: "Home" }); // Push vers Home
      } catch (error) {
        this.error = "Adresse e-mail ou mot de passe incorrect";
        console.log(error);
      }
    },
  },
};
</script>

<style>
h1 {
  margin-top: 0;
}
.card-container.card {
  max-width: 330px !important;
  margin-top: 50px;
}
input {
  border: none;
}
.card {
  background-color: #f7f7f7;
  padding: 25px;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
  margin: 0 auto 25px;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  border-radius: 50%;
}

.btn-block {
  min-width: 200px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  background-color: #247b9e;
  color: white;
  font-weight: bold;
}
.error{
  font-size: 13px;
}

.form-control {
  max-width: 100%;
  width: 300px;
  margin-top: 12px;
  background: #eeeeee;
  border-radius: 10px;
  padding: 10px;
}
#form-control {
  max-width: 100%;
  width: 300px;
  margin-top: 12px;
  background: #eeeeee;
  border-radius: 10px;
  padding: 10px;
}

p {
  font-size: 14px;
  font-weight: 500;
  font-family: Helvetica
}

.link-to{
  color: black;
  text-decoration: none;
}
.link-to:hover {
  color: #007bff;
}
button:hover {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
  cursor:pointer
}
input:focus{
  outline: none !important;
  border-color: #719ECE;
  box-shadow: 0 0 10px #719ECE;
}
@media (max-width: 500px) {
  p {
    font-size: 12px;
  }
  .form-control{
    width: 250px;
  }
}
</style>