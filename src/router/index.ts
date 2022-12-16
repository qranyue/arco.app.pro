import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { system } from "./system";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/LayoutView.vue"),
    redirect: "/welcome",
    children: [{ path: "welcome", component: () => import("@/views/welcome/WelcomeView.vue") }, ...system],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
