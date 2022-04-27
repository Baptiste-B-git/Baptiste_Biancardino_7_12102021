<template>
  <div>
    <div class="bloc-comment">
      <div>
        <button @click="commentary">Commentaires</button>
        <div v-show="showComments">
          <div v-for="(comment) in comments" :key="comment" :userName ="comment.User.userName" class="comment-name">UserName</div>
          <div class="comment-time">Il y a 8 jours</div>
          <div class="comment-text" >Ceci est un commentaire.</div>
          <div class="input-and-button">
            <input type="text" class="comment-field" placeholder="Ecrire un commentaire" required >
            <div class="button-comment">
              <button @click="createComment(content.id)">Commenter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  name: "Comment",
    components: {
  },
  emits: ["commentAdded"],
  data() {
    return {
      showComments: false,
      ok : false,
      error:'',
      email:'',
      password:'',
      title:"",
      titlePost:'',
      image:"",
      content:"",
      contentPost:'',
      id:"",
      isAdmin:"",
      comments : this.comments,
      posts:this.posts,
      post_id:this.post_id,
      userId : this.userId,
      user: {
        userName:"",
        id:"",
        postUserName : this.postUserName,
        commentUserName : this.commentUsername
      }
    };
  },
  
  beforeMount(){
    this.getComments();
  },
  methods : {
    commentary() {
    this.showComments = !this.showComments;
    console.log("ok");
    },

   async createComment(postId) {
    const token = JSON.parse(localStorage.getItem('res'));
    const userId = VueJwtDecode.decode(token).userId;
    const post_id =  postId
    const formData = new FormData();
    try {
      formData.append("content", this.content);
      formData.append("userId",userId);
      formData.append("post_id",post_id);
      const response = await axios.post('http://localhost:5000/api/comment', formData,
      {
        headers: {
        Authorization: `Bearer ${token}`
        }
      })
         // window.location.reload();
      console.log(response)
    } catch (err) {
      console.log(err);
    }},

   async getComments() {
    const token = JSON.parse(localStorage.getItem('res'));
    const id = VueJwtDecode.decode(token).userId;
    this.id = id;
    try {
      const p = await fetch(`http://localhost:5000/api/comment/`);
      const comments = await p.json();
      this.comments = comments;
      comments.forEach(comment => {
        this.content = comment.content;
        this.commentUserName =  comment.User.UserName;
      });
    } catch(error) {
      console.log(error)
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
  },
};
</script>

<style scoped>
.input-and-button{
  display: flex;
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

.comment-time{
  font-style: italic;
  font-size: 13px;
  text-align: left;
  margin-top: 5px;
  opacity: 0.5;
}
.comment-name{
  text-align: left;
  font-weight: 600;
  font-size: 1em;
}
.comment-text{
  margin-top: 20px;
  text-align: left;
  font-family: Helvetica;
    border-bottom: 0.5px solid;
  padding-bottom: 10px;
}
.comment-field {
  margin-top: 20px;
  border-radius: 3px;
  border: 1px solid;
  padding: 5px;
  width: 300px;
  margin-right: 10px;
}
</style>