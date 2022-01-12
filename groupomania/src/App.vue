<template>
<div>
  <link href='http://fonts.googleapis.com/css?family=Ubuntu&subset=cyrillic,latin' rel='stylesheet' type='text/css' />
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap" rel="stylesheet" type='text/css'/>
  <router-link to="/"></router-link> 
 <router-view/> 
</div>
</template>

<script>

import Login from './views/Login.vue' 

export default {
  name: 'App',
  components: {
  Login 
  }
}
</script>

<style>
@font-face {
  font-family: "Ubuntu";
}
#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
