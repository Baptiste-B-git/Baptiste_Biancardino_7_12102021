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

import GetPosts from "./GetPosts.vue";
import Header from './Header.vue';

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

        //this.username = user.username;
        //this.id = user.UserId;

       // console.log(this.id)
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
/* Header */
.menu-nav{
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color : white;
  padding: 5px;
  padding-left: 30px;
  padding-right: 30px;
  color: white;
  box-shadow: 1px 5px 12px black;
}
h1{
  color: black;
  font-weight: 800;
  font-size: 2.5rem;
}
nav.menu-nav ul li.btn {
  display: flex;
  height: 50px;
  width: 50px;
  padding: 5px;
  margin: 10px;
  color: black;
}
.fas{
  margin-top: 10px;
  width: 100%;
}
a {
  color: black;
}
a:hover{
  color: #f58544;
  background-color: white;
  transition: 0.3s all;
  cursor: pointer;
}

/* Commentaires */
.picture-profile-comment img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.comment-field{
  resize : both;
  width:100%;
  min-height : 30px;
  max-height : 200px;
}
</style>