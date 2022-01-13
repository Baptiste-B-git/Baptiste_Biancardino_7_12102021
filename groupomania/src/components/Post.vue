<template>
  <div class="card">
    <h3>Exprimez-vous...</h3>
    <textarea class="post-field"  placeholder="Quoi de neuf ?" v-model="content"></textarea><br>

    <input
            type="file"
            name="image"
            id="image"
            ref="image"
            class="custom-file-input" v-on:change="handleFileUpload()">
    <button class="button" @click="post">Publier !</button>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";
export default {
  name: "Post",

  emits: ['postAdded'],
  data() {
    return {
      error: this.error,
      text: "",
      image: this.image,
      UserId: this.id,
      content: this.content,
      token: ""
    };
  },
  beforeMount() {
    this.getId();
   
  },
  methods: {
    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      this.token=token
      this.UserId = id
      // try {
      //   const res = await fetch(`http://localhost:5000/api/user/${id}`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   const user = await res.json();

      //   this.username = user.username;
      //   this.id = user.UserId;

      //   console.log(this.UserId)
      // } catch (error) {
      //   console.log(error);
      // }
    },
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
    },

    async post() {
      // const token = JSON.parse(localStorage.getItem("res"));
      // const id = VueJwtDecode.decode(token).userId;
      // this.UserId = id

     const formData = new FormData();
        formData.append("image", this.image);
        formData.append("UserId", this.UserId);
        formData.append("content", this.content);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/post",
      
            formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(this.image);
        this.$emit('postAdded');
      
        // window.location.reload();
      } catch (error) {
        console.log(error.data);
      }
    }
  }
}
</script>

<style>
/* Bloc post (Exprimez-vous...) */
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  width: 700px;
  margin: 0 auto 25px;
  margin-top: 40px;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
}
h3{
margin-top: 0px;
}
.post-field{
  width: 100%;
  border-radius: 20px;
  padding: 12px 0 0 12px;
}

textarea:focus{
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
}

.bloc-btn{
  display: flex;
  flex-direction: row;
}
.button{
  max-width: 100%;
  min-width: 200px;
  border: none;
  border-radius: 8px;
  padding:10px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: #007BFF;
  Color:white;
}
button:hover{
    outline: none !important;
    border-color: #719ECE;
    box-shadow: 0 0 10px #719ECE;
}
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
</style>