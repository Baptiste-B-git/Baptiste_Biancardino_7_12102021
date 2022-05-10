<template>
  <div>
    <div class="bloc-comment">
      <div>
        <button class="button-show-comment" @click="commentary">{{ showComments == 0 ? 'Afficher les commentaires' : 'Cacher les commentaires' }}</button>
        <div v-show="showComments">
          <div v-for="comment in comments" :key="comment.id">
            <div class="comment-name"> {{comment.User.username}}</div>
            
            <div class="comment-date">Commenté le {{ dateComment(comment.createdAt) }}</div>

            <div class="comment-text-and-delete">
              <div class="comment-text">{{ comment.content }} </div>
              <div class="button-delete-comment" @click="deleteComment(comment.id)" >
                
                <button><i class="far fa-trash-alt"></i></button>
              </div>
            </div>
          </div>

          <div class="input-and-button">
            <input v-model="content" type="text" class="comment-field" placeholder="Ecrire un commentaire" required >
            <div class="button-comment">
              <button class="button-input-comment" @click="createComment()">Commenter</button>
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
  props:["comments", "postId",],
  emits: ["commentAdded"],
  data() {
    return {
      showComments: false,
      id:"",
      userId : null,
      content:"",
      isAdmin:"",
      error: null,
      user: {
        userName:"",
        id:"",
        commentUserName: null
      }
    };
  },

  beforeMount(){
    this.getComments();
  },

  methods : {
    // Afficher les commentaires
    commentary() {
    this.showComments = !this.showComments;
    },

    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      this.token = token;
      this.UserId = id;
    },

    async createComment() {
      const token = JSON.parse(localStorage.getItem('res'));
      // l'ensemble de valeurs à envoyer à l'aide de l'api requete http
    const data = {
      content: this.content
    }
      try {
        const response = await axios.post('http://localhost:5000/api/post/'+ this.postId +'/commentPost', data,
        {
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
          }
        })
      window.location.reload();
        console.log(response)
      } catch (error) {
        console.log(error);
      }},

    async getComments() {
      const token = JSON.parse(localStorage.getItem('res'));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await fetch(`http://localhost:5000/api/post/commentPost`, {
          headers,
        });
        const comments = await response.json();

        // TEST
        this.isAdmin = comments.isAdmin;
        // TEST

        comments.forEach(comment => {
          this.content = comment.content;
          this.commentUserName =  comment.User.userName;
        });
      }
      catch(error) {
        console.log(error)
      }    
    },

    deleteComment(commentId) {
      const token = JSON.parse(localStorage.getItem("res"));
      axios.delete('http://localhost:5000/api/post/deleteComment/' + commentId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          // window.location.reload();
        })
        .catch((error) => {
          window.alert(error);
        });
    },

  // Date du commentaire
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
  background-color: #00acee;
  color: white;
}
.button-delete-comment {
  border: none;
  border-radius: 8px;
  margin-top: 0;
}
.button-show-comment{
  margin-top: 15px;
}
.button-input-comment{
  margin-top: 15px;
}
.comment-date{
  font-style: italic;
  font-size: 13px;
  text-align: left;
  margin-top: 5px;
  opacity: 0.5;
}
.comment-name{
  text-align: left;
  font-size: 1.1em;
  margin-top: 10px;
}
.comment-text-and-delete{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  text-align: left;
  font-family: Helvetica;
  border-bottom: 0.5px solid;
  padding-bottom: 10px;
}
.comment-text{
  padding-top: 10px;
  font-weight: 100;
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