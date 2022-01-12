<template>
<div>
  <h3 @click="show">Afficher les commentaires</h3>
  <div class="card">
    <form v-on:submit.prevent="onSubmit">
      <input type="text" class="comment-input" v-model="content" required >
      <button @click="commentPost(title.id)"> Envoyer </button>
    </form>

    <div v-show="ok">  
      <div v-for="(comment) in comments" :key="comment" :username ="comment.User.username" class="comment_bloc">
        <div v-if="comment.post_id == title.id">
          <div class="comment_user_area"> 
            <div v-if="comment.User.picture !== null">
              <span> <img :src="comment.User.picture" class="picture_comment"/></span>
            </div>
            <div>{{comment.User.username}},  le {{datePost(title.createdAt)}}</div> <br> 
            </div>
                    
            <div><h3 class="comment-area"> {{comment.content}} <br></h3></div>

            <button v-if="id == comment.user_id || isAdmin==1" class="button_bloc" @click="deleteCommentPost(comment.id)">Supprimer</button>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';
export default {
  name: "Comment",
  props:["postId"],
  data() {
    return {
      ok : false,
      email:'',
      password:'',
      error:'',
      //id:this.id,
      posts:this.posts,
      comments : this.comments,
      title:"",
      content:"",
      image:"",
      user_id:this.user_id,
      contentPost:'',
      titlePost:'',
      id:"",
      isAdmin:"",
      // post_id:this.post_id,
      userId : this.userId,
      user: {
        username:"",
        id:"",
        postUsername : this.postUsername,
        commentUsername : this.commentUsername
      }}
  },
  beforeMount(){
  this.getComments();
  }, methods : {
    async createComment(postId) {
      const token = JSON.parse(localStorage.getItem('res'));
      const user_id = VueJwtDecode.decode(token).userId;
      const post_id =  postId
      const formData = new FormData();
      try {
        formData.append("content", this.content);
        formData.append("user_id",user_id);
        formData.append("post_id",post_id);
        const response = await axios.post('http://localhost:5000/api/post/commentPost', formData,
        {
          headers: {
          Authorization: `Bearer ${token}`
          }
        })
         // window.location.reload();
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    },
   async getComments() {
    const token = JSON.parse(localStorage.getItem('res'));
    try {
      const p = await fetch(`http://localhost:5000/api/post/${this.postId}/commentPost`) ;
      const comments = await p.json();
      this.comments = comments;
      comments.forEach(comment => {
      this.content = comment.content;
      this.commentusername =  comment.User.username;
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
}
</script>

<style>

</style>