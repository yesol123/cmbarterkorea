/* eslint-disable */

import { createApp } from 'vue';
// Pinia
import { createPinia } from 'pinia';
import App from '@/App.vue';

// router
import router from "@/router/index.js";

// 부트스트랩
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue, {theme : {preset: Aura}});
app.component('Checkbox', Checkbox);
app.component('Dialog', Dialog);
app.mount('#app');