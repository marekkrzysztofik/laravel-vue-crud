import './bootstrap';

import { createApp } from 'vue';

import router from './router';

import App from './components/App.vue';

import PrimeVue from 'primevue/config';

import Dialog from 'primevue/dialog';

import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css'; //icons
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import TabMenu from 'primevue/tabmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row
import Card from 'primevue/card';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import ToastService from 'primevue/toastservice';
import Home from './components/Products/Home.vue';
import Toast from 'primevue/toast';
import ConfirmationService from 'primevue/confirmationservice';


const app = createApp(App);
  
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.component('Toast', Toast);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('Card', Card);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Toolbar', Toolbar);
app.component('TabMenu', TabMenu);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('Home', Home);
app.mount('#app');

