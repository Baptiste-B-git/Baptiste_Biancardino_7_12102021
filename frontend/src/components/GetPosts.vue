<template>
  <div>
    <div class="container">
      <Post v-on:postAdded="getPosts()" />
      <h2 class="subtitle">Publications récentes</h2>
      <div v-for="message in posts" :key="message" class="post-block" :id="message.id">
        <div class="bloc-picture-name"></div>
        <div class="post-name">{{message.User.username}}</div>
        <div class="post-time"> Posté le {{datePost(message.createdAt)}}</div>
        <div class="post-text" >{{message.content}}</div>
        <div class="post-image"></div>
      
        <div class="bloc-update-delete">
          <button>Modifier</button>
          <div v-show="ok">
            <input type="text" class="message" v-model="updateContent" />
            <button class="button-update"><i class="fas fa-edit"></i></button>
          </div>

          <div class="button-delete">
            <button> Supprimer </button>
          </div>
        </div>

        <Comment v-on:commentAdded="getPosts()" />

      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue";
import Comment from "./Comment.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  components: { Post, Comment },
  data() {
    return {
      post_id: this.post_id,
      userId: this.userId,
      posts: this.posts,
      ok: false,
      updateContent: this.updateContent,
      isAdmin: "",
      id: "",
      user: {
        username: this.username,
        id: "",
        postUsername: this.postUsername,
      },
    };
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
        this.isAdmin = user.isAdmin
        console.log(this.isAdmin)
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

// Update Post

// Delete Post

  }
};
</script>

<style scoped>
.container{
  background-color: #333;
  padding: 15px 20px 5px;
  width: auto;
  max-width: 700px;
  margin: 50px auto 25px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
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
  font-size: 13px;
  text-align: left;
  margin-top: 5px;
  opacity: 0.5;
}
.post-name{
  text-align: left;
  font-weight: 600;
  font-size: 1.4em;
}
.post-text{
  margin-top: 20px;
  text-align: left;
  font-family: Helvetica;
  font-weight: bold;
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
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
.bloc-update-delete{
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-bottom: 20px;
}
.button-update{
  margin-left: 5px;
}
button {
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: #00acee;
  color: white;
  min-width: 100px;
}

button:hover {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}

.fa-edit:hover{
  transition: 0.3s all;
  cursor: pointer;
}
</style>