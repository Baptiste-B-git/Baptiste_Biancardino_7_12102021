<template>
<div>
<!-- Header -->
  <Header/>

<!-- Profile -->
    <div class="card">
        <h2 class="name-user">Dupont Jeanne{{ user.username}}</h2>
        <div>
            <div>
                <p class="subtitle">E-mail</p>
                <p>dupont.jeanne@gmail.com{{ email }}</p>
            </div>
        </div>
        <button class="delete" @click="deleteAccount">
          Supprimer mon compte
        </button>
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
      user: [],
      
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
      console.log(res)
      try {
        const res = await fetch(`http://localhost:3000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        this.user = user;
        this.username = user.username;
        console.log(user);
        this.email = user.email;
      } catch (error) {
        console.error(error);
      }
    },
    

  // Supprimer un compte
    async deleteAccount() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      try {
        await axios.delete(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    text-align: center;
    max-width: 300px;
}

.name-user{
    font-weight: 800;
    font-size: 2rem;
    padding-bottom: 10px;
    border-bottom: solid 1px black;
}
button{
  margin-right: 0px;
}

.subtitle{
    text-align: center;
    margin-bottom: 5px;
    font-weight: 800;
    font-size: 1.2em;
}

p{
    text-align: center;
}

</style>