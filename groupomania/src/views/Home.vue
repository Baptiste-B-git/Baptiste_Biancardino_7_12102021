<template>
<div>
<!-- Header -->
  
  <Header/>

<!-- Bloc post du User -->
 
 <GetPosts/>

  </div>

</template>

<script>
// @ is an alias to /src
import VueJwtDecode from "vue-jwt-decode";

import GetPosts from "../components/GetPosts.vue";
import Header from '../components/Header.vue';

export default {
  name: 'Home',
  components: {Header,GetPosts},
  data() {
    return {
      ok: false,
      picture: false,
      comment: false,
      email: "",
      password: "",
      error: "",
      posts: this.posts,
      comments: this.comments,
      contentComment: "",
      title: "",
      content: "",
      image: "",
      UserId: this.id,
      
      user: {
        id: "",
    
      },
    };
  },
  
beforeMount() {
    this.getId();
   
  },
  methods : {
    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;

      this.id = id

      try {
        const res = await fetch(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();

      } catch (error) {
        console.log(error);
      }
    },
  }
  
}
</script>

<style>
html,
body{
  padding: 0;
  height: 100%;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}
button {
  max-width: 100%;
  border: none;
  border-radius: 8px;
  padding:10px;
  margin-top: 20px;
  margin-right: 20px;
  cursor: pointer;
  background-color: #007BFF;
  Color:white;
}
</style>