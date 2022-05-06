<template>
  <div>
    <h2 class="subtitle">Exprimez-vous...</h2>
    <div class="card">
      <textarea
        class="post-field"
        placeholder="Quoi de neuf ?"
        v-model="content"
      ></textarea
      ><br />

      <input
        type="file"
        name="image"
        id="image"
        ref="image"
        class="custom-file-input"
        v-on:change="handleFileUpload()"
      />
      <button class="button" @click="post">Publier !</button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import axios from "axios";

export default {
  name: "Post",
  emits: ["postAdded"],
  data() {
    return {
      image: "",
      UserId: this.id,
      content: "",
      token: "",
      error: this.error,
    };
  },

  beforeMount() {
    this.getId();
  },

  methods: {
    handleFileUpload() {
      this.image = this.$refs.image.files[0];
      console.log(this.$refs.image.files);
    },

    async getId() {
      const token = JSON.parse(localStorage.getItem("res"));
      const id = VueJwtDecode.decode(token).userId;
      this.token = token;
      this.UserId = id;
    },
    async post() {
      if (this.content == "") {
        alert("Veuillez renseigner un post");
        return;
      }
      const token = JSON.parse(localStorage.getItem("res"));

      // append() ajoute une nouvelle valeur dans l'objet FormData
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
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        this.$emit("postAdded");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.subtitle {
  color: white;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.post-field {
  width: 100%;
  border-radius: 8px;
  padding: 12px 0 0 12px;
}

textarea:focus {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}

.bloc-btn {
  display: flex;
  flex-direction: row;
}
.button {
  min-width: 100px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  margin-right: 20px;
  background-color: #00acee;
  color: white;
}

button:hover {
  outline: none !important;
  border-color: #719ece;
  box-shadow: 0 0 10px #719ece;
}

.picture-profile {
  width: 50px;
  height: 50px;
  background: rgb(187, 187, 187);
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
  height: 100%;
  object-fit: cover;
}
</style>