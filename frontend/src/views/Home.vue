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
