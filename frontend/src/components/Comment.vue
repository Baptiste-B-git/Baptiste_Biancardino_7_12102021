<template>
  <div class="bloc-comment">
    <div class="button-commenter">
      <button>Commenter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  emits: ["commentAdded"],
  data() {
    return {};
  },
};
</script>

<style scoped>
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
.bloc-comment {
  border-top: 0.5px solid;
  padding-top: 10px;
}
</style>