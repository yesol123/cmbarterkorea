/* eslint-disable */

import { createApp } from 'vue';
// Pinia
import { createPinia } from 'pinia';
import App from '@/App.vue';
import mitt from 'mitt'; // mitt 임포트
// router
import router from "@/router/index.js";

//eventBus
export const eventBus = mitt()

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
 
DataTable.use(DataTablesCore);
// 부트스트랩
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';

// PrimeVue
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
// import Toast from 'primevue/toast';
// import ToastService from 'primevue/toastservice';
// import ConfirmDialog from 'primevue/confirmdialog';
// import ConfirmationService from 'primevue/confirmationservice';
import InputText from 'primevue/inputtext';

// SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue, {theme : {preset: Aura}});
app.component('Checkbox', Checkbox);
app.component('Button', Button);
// app.component('Toast', Toast);
// app.use(ToastService);
app.component('Dialog', Dialog);
// app.component('ConfirmDialog', ConfirmDialog);
// app.use(ConfirmationService);
app.component('InputText', InputText);
app.use(VueSweetalert2);
app.mount('#app');


app.provide('api_pw','cmb1018!');
