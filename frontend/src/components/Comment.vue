<template>
  <div>
    <div class="bloc-comment">

      <div class="comment-name">UserName</div>
      <div class="comment-time">Il y a 8 jours</div>
      <div class="comment-text" >Ceci est un commentaire.</div>
      <div class="input-and-button">
        <input type="text" class="comment-field" placeholder="Ecrire un commentaire" required >
              <div class="button-comment">
        <button>Commenter</button>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
    components: {
  },
  emits: ["commentAdded"],
  data() {
    return {};
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