import { createStore } from "vuex";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

// Connect to firestore and get database
const db = getFirestore(app);

const store = createStore({
	state: {
		homePage: {
			pfp: "",
            description: "",
			discord: "",
			github: "",
			linkedin: "",
			email: "",
		},
		aboutPage: {
			csContent: "",
			medicineContent: "",
		},
		projectsPage: {
			projects: [],
		},
	},
	mutations: {
		setHomePage(state, payload) {
			state.homePage = payload;
		},
		setAboutPage(state, payload) {
			state.aboutPage = payload;
		},
		setProjectsPage(state, payload) {
			state.projectsPage = payload;
		},
	},
	actions: {
		async fetchHomePage({ commit }) {
			const data = await getDoc(doc(db, "pageData", "homePage"));
			commit("setHomePage", data.data());
		},
		async fetchAboutPage({ commit }) {
			const data = await getDoc(doc(db, "pageData", "aboutPage"));
			commit("setAboutPage", data.data());
		},
		async fetchProjectsPage({ commit }) {
			const data = await getDoc(doc(db, "pageData", "projectsPage"));
			commit("setProjectsPage", data.data());
		},
	},
	getters: {
		getHomePage(state) {
			return state.homePage;
		},
		getAboutPage(state) {
			return state.aboutPage;
		},
		getProjectsPage(state) {
			return state.projectsPage;
		},
	},
});

export default store;
