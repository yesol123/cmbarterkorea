import { createApp } from 'vue';
import App from './App.vue';

// 라우터
import router from "./router/index.js";

// Pinia
import { createPinia } from 'pinia';

// 부트스트랩
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Checkbox from 'primevue/checkbox';

createApp(App).use(router).use(createPinia()).use(PrimeVue, {theme : {preset: Aura}}).component('Checkbox', Checkbox).mount('#app');