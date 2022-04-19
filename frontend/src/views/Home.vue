<template>
  <div class="home">
    <Header />
    <h1>Page d'accueil</h1>

    <GetPosts />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import GetPosts from "@/components/GetPosts.vue";

export default {
  name: "Home",
  components: {
    Header, GetPosts
  },
};
</script>

<style>
html,
body{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100vw;
  overflow-x: hidden;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}
</style>
