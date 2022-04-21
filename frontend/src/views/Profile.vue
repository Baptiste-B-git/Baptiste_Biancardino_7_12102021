<template>
  <div class="profile">
    <Header />
    <div class="card">
      <h2 class="name-user">Dupont Jeanne</h2>
      <div>
        <div>
          <p class="subtitle-email">E-mail</p>
          <p>dupont.jeanne@gmail.com</p>
        </div>
      </div>
      <button class="btn-delete">
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
.subtitle-email {
  text-align: center;
  margin-bottom: 5px;
  font-weight: 800;
  font-size: 1.2em;
}
.btn-delete {
  min-width: 200px;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: 20px;
  background-color: #00acee;
  color: white;
  font-weight: bold;
}
</style>
