<template>
   <div class="card">
  <div v-for="message in posts" :key="message" class="post-block" :id="message.id">

    <div class="bloc-picture-name">
      <div class=""></div>
    </div>
    <div class="post-name">{{message.content}}</div>
        <div class="post-name">{{message.id}}</div>

    <div class="post-time"> Le {{datePost(message.createdAt)}}</div>

    <div @click="updatePost(message.id)"> <button> update </button>
                        <input type="text" class="message" v-model="updateContent" />

    </div>
        <div @click="deletePost(message.id)"><button> delete </button> </div>



  
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
    updateContent: this.updateContent,
    user: {
      username: this.username,
      id: "",
      postUsername: this.postUsername,
    },
  } 
},

  beforeMount(){
    this.getPosts();
    this.getPost();
    this.getIdPostUser();

  },
  methods:{

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
          this.postId = post.id;
              //      this.username = post.User.username;

          

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
        await axios.put(`http://localhost:5000/api/post/${postId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

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


      } catch (error) {
        console.log(error);
      }

      
      try {
        const res = await fetch(`http://localhost:5000/api/post/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const post = await res.json();


      console.log(post)
      } catch (error) {
        console.log(error);
      }

    }
  }
}
</script>

<style>
/* Bloc post du User */

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