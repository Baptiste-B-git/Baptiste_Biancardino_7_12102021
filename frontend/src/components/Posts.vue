<template>
  <div>
    <div class="container">
      <Post v-on:postAdded="getPosts()" />
      <h2 class="subtitle">Publications récentes</h2>
      <div v-for="message in posts" :key="message" class="post-block" :id="message.id">
        <div class="bloc-picture-name"></div>
        <div class="post-name">{{ message.User.username }}</div>
        <div class="post-date">Posté le {{ datePost(message.createdAt) }}</div>
        <div class="post-text">{{ message.content }}</div>
        <div class="post-image" v-if="message.image">
          <img alt="post-image" :src="message.image" />
        </div>

        <div class="bloc-update-delete" v-if="id == message.User.id || isAdmin">
          <button @click="modify">Modifier</button>
          <div v-show="showModify">
            <input type="text" class="message" v-model="updateContent" />
            <button class="button-update-post" @click="updatePost(message.id)">
              <i class="fas fa-edit"></i>
            </button> 
          </div>

          <div class="button-delete-post" @click="deletePost(message.User.id)">
            <button v-if="id == message.User.id || isAdmin" @click="deletePost(message.id)">Supprimer</button>
          </div>
        </div>
            <Comment v-on:commentAdded="getPosts()" :comments="message.Comments" :postId="message.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue";
import Comment from "./Comment.vue";
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  components: { Post, Comment }, 
  data() {
    return {
      post_id: null,
      userId: null,
      posts: null,
      showModify: false,
      updateContent: null,
      isAdmin: "",
      id: "",
      user: {
        username: null,
        id: "",
        postUsername: null,
      },
    };
  },
  beforeMount() {
    this.getPosts();
    this.getIdPostUser();
    this.getId();
    this.check();
  },

  methods: {
    // Afficher les commentaires
    modify() {
      this.showModify = !this.showModify;
      console.log("ok");
    },
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
      this.id = id;
      try {
        const res = await fetch(`http://localhost:5000/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        this.isAdmin = user.isAdmin;
        console.log(this.isAdmin);
      } catch (error) {
        console.log(error);
      }
    },
    getOnePost(postId) {
      this.post_id = postId;
      console.log(postId);
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
        console.log(posts);
        this.posts = posts;
      } catch (error) {
        console.log(error);
      }
    },

    // Modifier un Post
    async updatePost(postId) {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      this.id = id;
      const formData = new FormData();
      formData.append("content", this.updateContent);
      try {
        await axios.put(`http://localhost:5000/api/post/${postId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
          this.getPosts();
          this.updateContent = "";
          this.ok = false;
      } catch (error) {
        console.log(error)
      }
    },
    
    // Supprimer un Post
    deletePost(postId) {
      const token = JSON.parse(localStorage.getItem("res"));
      axios.delete("http://localhost:5000/api/post/" + postId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error);
        });
    },

    // Date d'un post
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
  },
};
</script>

<style scoped>
.container {
  background-color: #333;
  padding: 15px 20px 5px;
  width: auto;
  max-width: 700px;
  margin: 50px auto 25px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
.message {
  border: 1px solid rgb(104, 104, 104);
  background: #f2f2f2;
  border-radius: 15px;
  height: 30px;
  margin-top: 20px;
  padding-left: 10px;
}
.user-name {
  text-align: left;
}
.post-img {
  max-width: auto;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
  box-sizing: border-box;
  background: rgb(187, 187, 187);
}
img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  margin-top: 20px;
}
.post-date {
  font-style: italic;
  font-size: 13px;
  text-align: left;
  margin-top: 5px;
  opacity: 0.5;
}
.post-name {
  text-align: left;
  font-weight: 600;
  font-size: 1.5em;
}
.post-text {
  margin-top: 20px;
  text-align: left;
  font-family: Helvetica;
}

input:focus {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}
.post-block {
  background-color: #f7f7f7;
  padding: 15px 15px 15px;
  width: auto;
  max-width: 700px;
  margin: 0 auto 25px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
.bloc-update-delete {
  display: flex;
  flex-direction: row;
  text-align: left;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  margin-right: 10px;
  background-color: #06729c;
  color: white;
}
button:hover {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}
.button-update-post {
  margin-left: 5px;
}
.fa-edit{
  color: white;
}
  @media (max-width: 720px) {
    .bloc-update-delete {
      justify-content: center;
      display: block;
    }
  }
  @media (max-width: 500px) {
    img{
      height: 200px;
    }
  }
</style>