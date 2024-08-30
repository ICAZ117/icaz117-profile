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
            projects: [],
		},
		aboutPage: {
			csContent: "",
			medicineContent: "",
		},
		projectsPage: {
			projects: [],
		},
		username: "",
		email: "",
		pb: 0,
		leaderboard: [],
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
		setUsername(state, payload) {
			state.username = payload;
		},
		setEmail(state, payload) {
			state.email = payload;
		},
		setPb(state, payload) {
			state.pb = payload;
		},
		addLDBScore(state, payload) {
			state.leaderboard.push(payload);
			state.leaderboard.sort((a, b) => b.score - a.score);

			if (state.leaderboard.length > 10) {
				// delete the last element
                state.leaderboard.pop();
			}
		},
		setLeaderboard(state, payload) {
			state.leaderboard = payload;
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
		async createUser({ state }) {
			// Create new user in users table
			await setDoc(doc(db, "users", state.email), {
				username: state.username,
				pb: 0,
			});
		},
		async fetchUser({ commit, state }) {
			// Get user from users table
			const data = await getDoc(doc(db, "users", state.email));
			commit("setUsername", data.data().username);
			commit("setPb", data.data().pb);
		},
        async updatePb({ state }) {
            // Update user's pb in users table
            await setDoc(doc(db, "users", state.email), {
                username: state.username,
                pb: state.pb,
            });
        },
        async setLeaderboard({ state }) {
            // Update leaderboard on db
            await setDoc(doc(db, "leaderboard", "leaderboard"), {
                scores: state.leaderboard,
            });
        },
		async fetchLeaderboard({ commit }) {
			// Get leaderboard from leaderboard table
			const data = await getDoc(doc(db, "leaderboard", "leaderboard"));
			commit("setLeaderboard", data.data().scores);
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
		getUsername(state) {
			return state.username;
		},
		getPb(state) {
			return state.pb;
		},
        getLeaderboard(state) {
            return state.leaderboard;
        }
	},
});

export default store;
