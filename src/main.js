import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FontAwesomeIcon from "./utilities/fontawesome-icons";
import Notifications from '@kyvg/vue3-notification';
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCPK3xOVQQHUzYNkpnCq_dRGP-R9uE3_2w",
	authDomain: "icaz117.firebaseapp.com",
	projectId: "icaz117",
	storageBucket: "icaz117.appspot.com",
	messagingSenderId: "459005865141",
	appId: "1:459005865141:web:3d103abdf79475eca6a2fc",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
app.use(store);
app.use(router);
app.use(FontAwesomeIcon);
app.use(Notifications);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
