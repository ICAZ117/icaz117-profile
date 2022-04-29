import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FontAwesomeIcon from "./utilities/fontawesome-icons";
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(FontAwesomeIcon);
app.use(Notifications);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
