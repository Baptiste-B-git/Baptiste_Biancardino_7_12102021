<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
}

body {
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:32px;
}

img {
  max-width: 100%;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  width: 1040px;
  background:white;
  border-radius: 16px;
  padding:32px;
}
.card_bloc{
  display: flex;
  flex-direction: row;
  width: 100%;
}

.card__title {
  text-align:center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}
.card__profile{
  background-color: #fde3d4;
  border-radius: 20px;
  width: 50%;
  margin-right: 5px;
}
.card__bio{
  margin-left: 5px;
  background-color: #fde3d4;
  border-radius: 20px;
  width: 50%;

}
input[type=search] {
  border: 2px dotted #eea880;
  border-radius: 20px;

  -webkit-appearance: none;
}
.bio{
  border: solid 2px #eea880;
  border-radius: 10px 10px 0px 10px;
  width: 100%;

}
.bloc-bio{
  margin: 15px;

}
.button-bio{
  border: solid 2px #eea880;
  border-radius: 10px 0px 10px 10px;
  background-color: #f0d6c7;
  color: #FBAB7E;
}

  .button {
    background: #2196F3;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }

  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }

  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }

</style>
