<template>
<div>
    <p>C'est mon Header</p>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.logo {
	width: 250px;
	height: 80px;
}

.menu-nav{
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color : white;
  padding: 5px;
  padding-left: 50px;
  padding-right: 30px;
  color: white;
  box-shadow: 1px 5px 12px black;
}

nav.menu-nav ul li.btn {
  display: flex;
  height: 50px;
  width: 50px;
  padding: 5px;
  margin: 10px;
  color: black;
}
.fas{
  margin-top: 10px;
  width: 100%;
}
a {
  color: black;
}
a:hover{
  color: #f58544;
  transition: 0.3s all;
  cursor: pointer;
}

h3:hover {
  cursor:pointer
}
</style>