import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HiLo from "../views/HiLo.vue";
import Leaderboard from "../views/Leaderboard.vue";
import OBS from "../views/OBS.vue";
import Resume from "../views/Resume.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
        meta: {
            title: "Home | ICAZ117"
        }
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
        meta: {
            title: "Login | ICAZ117"
        }
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
        meta: {
            title: "Register | ICAZ117"
        }
	},
    {
		path: "/obs",
		name: "OBS",
		component: OBS,
        meta: {
            title: "OBS | ICAZ117"
        }
	},
    {
		path: "/resume",
		name: "Resume",
		component: Resume,
        meta: {
            title: "Resume | ICAZ117"
        }
	},
	{
		path: "/game",
		name: "HiLo",
		component: HiLo,
		meta: {
            title: "Hi-Lo | ICAZ117",
			requiresAuth: true,
		},
	},
	{
		path: "/leaderboard",
		name: "Leaderboard",
		component: Leaderboard,
		meta: {
            title: "Leaderboard | ICAZ117",
			requiresAuth: true,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = onAuthStateChanged(
			getAuth(),
			(user) => {
				removeListener();
				resolve(user);
			},
			reject
		);
	});
};

router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (await getCurrentUser()) {
			next();
		} else {
			alert(
				"*In General Kenobi's Voice* This is not the page you're looking for!"
			);
			next("/");
		}
	} else {
		next();
	}
});

router.beforeEach((toRoute, fromRoute, next) => {
	window.document.title =
		toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "Home";

	next();
});

export default router;
