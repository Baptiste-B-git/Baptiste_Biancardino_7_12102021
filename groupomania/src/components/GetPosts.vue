<template>
<div>
  <Post v-on:postAdded="getPosts()"/>
  <h2>Publications récentes</h2>
      <div v-for="message in posts" :key="message" class="post-block" :id="message.id">
        <div class="bloc-picture-name">
      </div>
      <div class="post-name">{{message.User.username}}</div>
      <div class="post-time"> Posté le {{datePost(message.createdAt)}}</div>
      <div class="post-text">{{message.content}}</div>
      <div class="post-image" v-if="message.image"><img :src="message.image"></div>
      <div class="bloc-update-delete" v-if="id == message.User.id">


        <button @click="show">Modifier</button>
        <div v-show="ok">
          <input type="text" class="message" v-model="updateContent" />
          <button class="button-update" @click="updatePost(message.id)"><i class="fas fa-edit"></i></button>
        </div>

        <div class="button-delete" @click="deletePost(message.User.id)">
          <button v-if="id == message.User.id || isAdmin == 1" @click="deletePost(message.id)"> Supprimer </button>
        </div>
      </div>
    </div>

</div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import Post from "./Post.vue";
import axios from "axios";
import Comments from "../views/Comment.vue";
export default {
    components: {Comments, Post},
data() {
  return {
    post_id: this.post_id,
    userId: this.userId,
    posts : this.posts,
    ok: false,
    updateContent: this.updateContent,
    isAdmin: "",
          id: "",
    user: {
      username: this.username,
      id: "",
      postUsername: this.postUsername,

    },
  } 
},
  beforeMount(){
    this.getPosts();
    this.getIdPostUser();
    this.checkId();
  },
  methods:{

 show() {
      this.ok = !this.ok;
      console.log("ok")
    },
    async checkId() {
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


       console.log(id)
      } catch (error) {
        console.log(error);
      }
    },
    getOnePost(postId){
        this.post_id = postId
        console.log(postId)
    },
    async getIdPostUser() {
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
    
  },
       datePost(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
    
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
          this.username = post.User.username;
          
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updatePost(postId) {
      const token = JSON.parse(localStorage.getItem("res"));
      const UserId = VueJwtDecode.decode(token).userId;
      const formData = new FormData();
      formData.append("content", this.updateContent);
      try {
       const response =  await axios.put(
         "http://localhost:5000/api/post/"+ postId,
          formData,
          {headers: { Authorization: `Bearer ${token}` }}
       )
          this.getPosts();
          this.updateContent = "";
          this.ok = false;
      } catch (error) {
        console.log(error)
      }
    },
    deletePost(postId) {
      const token = JSON.parse(localStorage.getItem("res"));
      axios
        .delete("http://localhost:5000/api/post/" + postId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
         
          window.location.reload();
          console.log(postId)
        })
        .catch((error) => {
          window.alert(error);
        });
    },
  }
}
</script>

<style>
@media (max-width: 500px)
{
  .bloc-update-delete{
  display: flex;
  flex-direction: row;
  text-align: left;

  }
}
.message{
  border: 1px solid rgb(104, 104, 104);
  background:#f2f2f2;
  border-radius: 15px;
  height: 30px;
  margin-top: 20px;
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
  border-radius: 20px;
  margin-top: 20px;
}
.post-time{
  font-style: italic;
  text-align: left;
  margin-top: 5px;
  border-bottom: 0.5px solid;
  padding-bottom: 10px;
  opacity: 0.7;
}
.post-name{
  margin-top: 10px;
  text-align: left;
  font-weight: 600;
  font-size: 1.2em;
}
.post-text{
  margin-top: 20px;
  text-align: left;
}

input:focus{
  outline: none !important;
  border-color: #719ECE;
  box-shadow: 0 0 10px #719ECE;
}
.post-block {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  width: auto;
  max-width: 700px;
  margin: 0 auto 25px;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
.bloc-update-delete{
  display: flex;
  flex-direction: row;
  text-align: left;
}
.button-update{
  margin-left: 5px;
}


.fa-edit:hover{
  transition: 0.3s all;
  cursor: pointer;
}
</style>