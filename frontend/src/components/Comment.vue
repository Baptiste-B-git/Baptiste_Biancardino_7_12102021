<template>
  <div>
    <div class="bloc-comment">
      <div>
        <button @click="commentary">Commentaires</button>
        <div v-show="showComments">
          <div v-for="comment in comments" :key="comment.id" class="comment-name">
            <div> {{comment.User.username}}</div>

            
            <div class="comment-time">Commenté le {{ dateComment(comment.createdAt) }}</div>
            <div class="comment-text" ><div class="comment-text2">{{ comment.content }} </div>
              <button class="button-comment-delete" @click="updatePost(message.id)">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>


          </div>
          <div class="input-and-button">
            <input v-model="contentComment" type="text" class="comment-field" placeholder="Ecrire un commentaire" required >
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
  props:["comments"],
  emits: ["commentAdded"],
  data() {
    return {
      showComments: false,
      ok : false,
      error:'',
      content:"",
      id:"",
      isAdmin:"",
      contentComment: "",
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
        userId: this.userId,
        post_id: this.post_id,
        error: this.error,
        content: this.contentComment,
        headers: {
        Authorization: `Bearer ${token}`
        }
      })
         // window.location.reload();
      console.log(response)
    } catch (err) {
      console.log(err);
    }},

  dateComment(date) {
    const event = new Date(date);
    const options = {
      year: "numeric",
      month: "short",
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
.fa-trash-alt{
  color: white;
}
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
}
.button-comment-delete {
  border: none;
  border-radius: 8px;
  margin-top: 0;
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
  margin-top: 10px;
}
.comment-text{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  text-align: left;
  font-family: Helvetica;
  border-bottom: 0.5px solid;
  padding-bottom: 10px;
}
.comment-text2{
  padding-top: 10px;
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