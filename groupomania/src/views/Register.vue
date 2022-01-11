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
            placeholder="Email"
            v-model="email"
          />
          <!-- <ErrorMessage name="username" class="error-feedback" /> -->
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
          <a href="#/login">
            <span>Vous avez déjà un compte ?</span>
          </a>
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
      try {
        const response = await authservice.signup({
          email: this.email,
          password: this.password,
          username: this.username,
          error: this.error,
        });

        const res = response.data.token;
        //this.$router.push({ name: "Login" });
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
h1{
  margin-bottom: 10px;
  margin-top: 0;
  font-weight: 800;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
input{
  border: none;

}
body {
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
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
.btn-block{
  max-width: 100%;
  min-width: 200px;
  border: none;
  border-radius: 10px;
  padding:10px;
  margin-top: 12px;
  margin-bottom: 20px;
  background-color: #007BFF;
  Color:white;
}
.form-control{
  max-width: 100%;
  width: 300px;
  margin-top: 12px;
  margin-bottom: 12px;
  background:#f2f2f2;
  border-radius: 10px;
  padding:10px;
}

.error-feedback {
  color: red;
}
a{
  text-decoration: none;
}
</style>