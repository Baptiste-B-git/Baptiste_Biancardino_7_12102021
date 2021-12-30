<template>
   <div class="card">
  <div v-for="message in posts" :key="message" class="post-block" :id="message.id">

    <div class="bloc-picture-name">
      <div class="picture-profile"><img src="" alt="profil-6"></div>
      <div class="user-name"></div>
    </div>
    <div class="post-img"><img :src="message.attachment" alt=""></div>
    <div class="post-name">{{message.content}}</div>
  
    <Comments/>
      </div>

  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
import Comments from "./Comment.vue";

export default {
    components: {Comments},


data() {
return {
   post_id: this.post_id,
      userId: this.userId,
      posts : this.posts,
      user: {
        username: "",
        id: "",
        postUsername: this.postUsername,
      },
}
},

  beforeMount(){
this.getPosts();
this.getPost()
  },
  methods:{
    
   async getPosts() {
      const token = JSON.parse(localStorage.getItem("res"));

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await fetch(`http://localhost:5000/api/post/`, {
          headers,
        });

        const posts = await response.json();
        console.log(posts)
        this.posts = posts;

        posts.forEach((post) => {
          this.content = post.content;
          this.post_id = post.id;
       // this.username = post.User.username;

          console.log(this.post_id)
        });
      } catch (error) {
        console.log(error);
      }
    },
   async getPost(){

       const token = JSON.parse(localStorage.getItem("res"));

      const id = VueJwtDecode.decode(token).userId;

      try {
        const res = await fetch(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = await res.json();

        this.users = users;

        console.log(users.username)

      } catch (error) {
        console.log(error);
      }

      
      try {
        const res = await fetch(`http://localhost:5000/api/user/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = await res.json();

        this.users = users;
      } catch (error) {
        console.log(error);
      }
    

    }
  }

}
</script>

<style>
/* Bloc post du User */
.picture-profile{
  width: 50px;
  height: 50px;
  background: rgb(187, 187, 187);
}
.user-name{
  text-align: left;
}
.post-img{
  max-width: auto;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
  box-sizing: border-box;
  background: rgb(187, 187, 187);
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.post-name{
  margin-top: 10px;
  text-align: left;
}

.post-block {
  margin-bottom: 25px;
  border-bottom: 1px solid black;
}
</style>