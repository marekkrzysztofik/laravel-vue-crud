import './bootstrap';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

window.Swal = Swal;
const toast = Swal.mixin({
    toast:true,
    position:'top-end',
    showConfirmButton:false,
    timer: 3000,
    timeProgressBar:true,
});
window.toast = toast;

import { createApp } from 'vue';

import router from "./router";

import App from './components/App.vue';

const app = createApp(App);

app.use(router);

app.mount('#app');

