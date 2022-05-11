<template>
  <div>
    <div class="card card-container">
      <h1>Connexion</h1>
      <img
        class="profile-img-card"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      />

      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <label for="username"></label>
        </div>

        <div class="form-group">
          <label for="email"></label>

          <div v-if="error" style="color: red" class="error" :key='error'>{{ error }}</div>
          <input
            name="email"
            type="email"
            class="form-control"
            placeholder="Adresse mail"
            maxlength="25"
            autofocus
            required
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
            maxlength="25"
            required
            v-model="password"

          />
        </div>

        <div class="form-group">
          <button class="btn-block" @click="login">Connexion</button>
          <br />
          <p>
            Vous n'avez pas de compte ?
            <a class="link-to" href="/register">Créer un compte</a>
          </p>
        </div>
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

        // this.error.push('Name required.');

      } catch (error) {
        this.error = "Email ou mot de passe incorrect";
        console.log(error);
      }
    },
  },
  // computed: {
  //   isDisabled: function () {
  //     return !this.email || !this.password;
  //   },
  // },
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
  background-color: #00acee;
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