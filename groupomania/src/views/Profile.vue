<template>
<div>
<!-- Header -->
  <Header/>

<!-- Profile -->
    <div class="card">
        <h2 class="name-user">Dupont Jeanne</h2>
        <div>
            <div>
                <p class="subtitle">E-mail</p>
                <p>dupont.jeanne@gmail.com</p>
                <!-- <input type="email" v-model="email" :placeholder="this.email" /> -->
                <p class="subtitle">Description</p>
                <p>Pas de description</p>
                <textarea class="account" cols="30" rows="5" placeholder="Votre nouvelle description"></textarea>
                <button class="button-account">Changer ma description</button>
            </div>
        </div>

        <div>
            <div>
                <p class="subtitle-delete">Supprimer mon compte</p>
                <button class="button-delete" @click="deleteAccount">Supprimer</button>
            </div>
        </div>

    </div>
</div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import Header from "../components/Header.vue";
export default {
  name: "Profile",
  components: { Header },
  data() {
    return {
      error: this.error,
      user: this.user,
      username: this.username,
      email: this.email,
      image: this.image,
      password: this.password,
    };
  },
  beforeMount() {
    this.check();
    this.getId();
  },
  methods: {
    check() {
      const token = JSON.parse(localStorage.getItem("res"));
      if (!token) {
        this.$router.push({ name: "Login" });
      } else {
        const id = VueJwtDecode.decode(token).userId;
        this.id = id;
      }
    },
    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        this.user = user;
        this.username = user.username;
        this.email = user.email;
      } catch {
        error;
      }
    },
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },
    async update() {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;
      const formData = new FormData();
      formData.append("username", this.username);
      formData.append("email", this.username);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/user/${user_id}`,
          {
            username: this.username,
            email: this.email,
            error: this.error,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
      } catch (error) {
        this.error = error.response.data.message;
        console.log(this.error);
      }
    },
    async deleteAccount() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      try {
        await axios.delete(`http://localhost:3000/api/user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
        this.$router.push({ name: "Login" });
        localStorage.clear();
      } catch (error) {
        console.log(error);
      }
    },
    async updatePicture() {
      const token = JSON.parse(localStorage.getItem("res"));
      const user_id = VueJwtDecode.decode(token).userId;
      const formData = new FormData();
      formData.append("image", this.image);
      try {
        const response = await axios.put(
          `http://localhost:3000/api/user/image/${user_id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
html,
body{
  padding: 0;
  height: 100%;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
}
.card{
    margin-top: 50px;
}

.name-user{
    font-weight: 800;
    font-size: 2rem;
    padding-bottom: 10px;
    border-bottom: solid 1px black;
}
.button-account{
    margin: 0;
    height: auto;
    border: none;
    padding: 8px;
    background-color: #007BFF;
    border-radius: 0px 0px 10px 10px;
    color:white;
    text-align:center;
}

.button-delete{
    height: auto;
    border: none;
    margin: 0;
    padding: 8px;
    background-color: #007BFF;
    border-radius: 10px;
    color:white;
    text-align:center;
}

.subtitle{
    text-align: center;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 1.2em;
}
.subtitle-delete{
    text-align: center;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 1.2em;
    border-top: solid 1px black;
    padding-top: 10px;
}
.account{
    padding: 0.5em;
    border-radius: 5px;
    width: 100%;

}
p{
    text-align: center;
}

</style>