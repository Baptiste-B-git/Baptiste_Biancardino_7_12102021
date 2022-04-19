<template>
  <div>
    <Post v-on:postAdded="getPosts()" />
    <h2>Publications récentes</h2>
  </div>
</template>

<script>
import Post from "./Post.vue";
export default {
  components: { Post },
  data() {
    return {
      post_id: this.post_id,
      userId: this.userId,
      posts: this.posts,
      ok: false,
      updateContent: this.updateContent,
      isAdmin: "",
      id: "",
      user: {
        username: this.username,
        id: "",
        postUsername: this.postUsername,
      },
    };
  },
};
</script>

<style>

</style>