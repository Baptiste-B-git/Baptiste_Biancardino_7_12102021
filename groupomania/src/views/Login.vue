<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h1>Connexion</h1>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form >
        <div class="form-group">
          <label for="username"></label>
          <input name="username" type="text" class="form-control" placeholder="Nom d'utilisateur" />
          <!-- <ErrorMessage name="username" class="error-feedback" /> -->
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input name="password" type="password" class="form-control" placeholder="Mot de passe" />

          <!-- <ErrorMessage name="password" class="error-feedback" /> -->
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" @click="login">
            
            <!-- <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span> -->
            <span>Connexion</span>
          </button>
        </div>

        <!-- <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div> -->
      </form>
    </div>
  </div>
</template>

<script>
// import { Form, Field, ErrorMessage } from "vee-validate";
// import * as yup from "yup";

export default {
  name: "Login",
//   components: {
//     Form,
//     Field,
//     ErrorMessage,
//   },
//   data() {
//     const schema = yup.object().shape({
//       username: yup.string().required("Nom d'utilisateur est requis !"),
//       password: yup.string().required("Mot de passe est requis !"),
//     });

//     return {
//       loading: false,
//       message: "",
//       schema,
//     };
//   },
//   computed: {
//     loggedIn() {
//       return this.$store.state.auth.status.loggedIn;
//     },
//   },
//   created() {
//     if (this.loggedIn) {
//       this.$router.push("/profile");
//     }
//   },
  methods: {
    login() { console.log("ok") }


    // handleLogin(user) {
    //   this.loading = true;

    //   this.$store.dispatch("auth/login", user).then(
    //     () => {
    //       this.$router.push("/profile");
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.message =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //     }
    //   );
    // },
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
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
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
  width: 320px;
  border: none;
  border-radius: 10px;
  padding:10px;
  margin-top: 20px;
      background-color: #007BFF;
    Color:white;
}
.form-control{
  max-width: 100%;
  width: 300px;
  margin-top: 10px;
  background:#f2f2f2;
  border-radius: 10px;
  padding:10px;
}

.error-feedback {
  color: red;
}
</style>