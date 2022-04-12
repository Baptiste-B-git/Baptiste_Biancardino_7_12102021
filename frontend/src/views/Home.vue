<template>
  <div class="home">
    <Header />
    <HelloWorld msg="Progressor" />
    <Form />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Form,
    Header,
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
