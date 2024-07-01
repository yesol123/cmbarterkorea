import { createApp } from 'vue';
import App from './App.vue';

// 라우터
import router from "./router/index.js";

// 부트스트랩
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

createApp(App).use(router).mount('#app');
