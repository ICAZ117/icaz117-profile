import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import OBS from "../views/OBS.vue";
import Resume from "../views/Resume.vue";
import ResumeDL from "../views/ResumeDL.vue";

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
        path: "/resume/dl",
        name: "Resume Download",
        component: Resume,
        meta: {
            title: "Resume | ICAZ117"
        }
    },
    {
        path: "/resume/docx",
        name: "Resume Docx",
        component: ResumeDL,
        meta: {
            title: "Resume | ICAZ117"
        }
    },
    {
        path: "/resume/pdf",
        name: "Resume PDF",
        component: ResumeDL,
        meta: {
            title: "Resume | ICAZ117"
        }
    },
    // {
    // 	path: "/game",
    // 	name: "HiLo",
    // 	component: HiLo,
    // 	meta: {
    //         title: "Hi-Lo | ICAZ117",
    // 		requiresAuth: true,
    // 	},
    // },
    // {
    // 	path: "/leaderboard",
    // 	name: "Leaderboard",
    // 	component: Leaderboard,
    // 	meta: {
    //         title: "Leaderboard | ICAZ117",
    // 		requiresAuth: true,
    // 	},
    // },
    // Catch-all dynamic route for redirects
    {
        path: "/:customRoute",
        name: "DynamicRedirect",
        component: () => import("../views/DynamicRedirect.vue"),
        meta: {
            title: "Redirecting... | ICAZ117"
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
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
    }
    else if ((from.path === "/resume" && to.path === "/resume/dl") || (from.path === "/resume/dl" && to.path === "/resume")) {
        // Go home first, then go to the to route
        next('/'); // or next('/home') depending on your home route

        // Then navigate to the intended destination after a brief delay
        setTimeout(() => {
            router.push(to.path);
        }, 100);
    }
    else {
        next();
    }
});

router.beforeEach((toRoute, fromRoute, next) => {
    window.document.title =
        toRoute.meta && toRoute.meta.title ? toRoute.meta.title : "Home";

    next();
});

export default router;
