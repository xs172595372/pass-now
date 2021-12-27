import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
    }, {
        path: "/study",
        name: "Study",
        component: () =>
            import("../views/Study.vue"),
    }, {
        path: "/repository",
        name: "EditRepository",
        component: () =>
            import("../views/Repository.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
