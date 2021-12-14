// import { createApp } from "vue";
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

// library.add(fas);

// createApp(App).use(store).use(router).component('fa', FontAwesomeIcon).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FontAwesomeIcon } from './plugins/font-awesome'

createApp(App)
  .use(router)
  .use(store)
  // .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");