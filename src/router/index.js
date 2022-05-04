import { createRouter, createWebHashHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Projects from "../views/Projects.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import HiLo from "../views/HiLo.vue";
import Leaderboard from "../views/Leaderboard.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/projects",
		name: "Projects",
		component: Projects,
	},
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/game",
        name: "HiLo",
        component: HiLo,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/leaderboard",
        name: "Leaderboard",
        component: Leaderboard,
        meta: {
            requiresAuth: true
        }
    },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), (user) => {
            removeListener();
            resolve(user);
        }, reject);
    });
};

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        }
        else {
            alert("*In General Kenobi's Voice* This is not the page you're looking for!");
            next("/");
        }
    }
    else {
        next();
    }
});

export default router;
