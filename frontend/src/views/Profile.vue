<template>
  <div class="profile">
    <Header />
    <h1>Page de profil</h1>
    <div class="card">
      <h2 class="name-user">Dupont Jeanne</h2>
      <div>
        <div>
          <p class="subtitle">E-mail</p>
          <p>dupont.jeanne@gmail.com</p>
        </div>
      </div>
      <button class="delete">
        Supprimer mon compte
      </button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "Profile",
  components: {
    Header,
  },
};
</script>

<style scoped>
.card {
  margin-top: 50px;
  text-align: center;
  max-width: 300px;
}

.name-user {
  font-weight: 800;
  font-size: 2rem;
  padding-bottom: 10px;
  border-bottom: solid 1px black;
}
.subtitle {
  text-align: center;
  margin-bottom: 5px;
  font-weight: 800;
  font-size: 1.2em;
}
.delete {
  min-width: 200px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
}
</style>
