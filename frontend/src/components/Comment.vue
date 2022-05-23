<template>
  <div>
    <div class="bloc-comment">
      <div>
        <button class="button-show-comment" @click="commentary">{{ showComments == 0 ? 'Afficher les commentaires' : 'Cacher les commentaires' }}</button>
        <div v-show="showComments">
          <!-- Pour chaque comment dans les comments -->
          <div v-for="comment in comments" :key="comment.id">
            <div class="comment-name"> {{comment.User.username}}</div>
            
            <div class="comment-date">Commenté le {{ dateComment(comment.createdAt) }}</div>

            <div class="comment-text-and-delete">
              <div class="comment-text">{{ comment.content }} </div>
              <div class="button-delete-comment" @click="deleteComment(comment.id)" v-if="isAdmin || id === comment.User.id">
                <button type="submit"><i class="far fa-trash-alt" aria-hidden="true"></i></button>
              </div>
            </div>
          </div>

          <div class="input-and-button">
            <label class="label" for="input-comment">comment</label>
            <input name=comment
            type="text"
            id="input-comment"
            placeholder="Ecrire un commentaire"
            required
            v-model="content">
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
  emits: ["commentAdded", "postAdded"],
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
    this.checkId();
  },

  methods : {
    // Afficher les commentaires
    commentary() {
    this.showComments = !this.showComments;
    },

    async checkId() {
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

    // Ajouter un commentaire
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
        console.log(response)
        this.$emit("commentAdded");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    // Supprimer un commentaire
    deleteComment(commentId) {
      const token = JSON.parse(localStorage.getItem("res"));
      axios.delete('http://localhost:5000/api/post/deleteComment/' + commentId, {
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
  background-color: #06729c;
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
input{
  max-width: 100%;
  width: 300px;
  margin-top: 12px;
  background: #eeeeee;
  border-radius: 10px;
  padding: 10px;
}
.label{
   position:absolute;
   left:-10000px;
   top:auto;
   width:1px;
   height:1px;
   overflow:hidden;
}

.comment-date{
  font-style: italic;
  font-size: 12px;
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
  font-size: 14px;
}
#input-comment {
  margin-top: 20px;
  border-radius: 3px;
  border: 1px solid;
  padding: 5px;
  width: 300px;
  margin-right: 10px;
}
@media (max-width: 500px) {
  #input-comment {
    width: 130px;
  }
}
</style>