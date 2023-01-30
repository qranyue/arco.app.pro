import type { RouteRecordRaw } from "vue-router";

export const system: RouteRecordRaw[] = [
  { path: "system/table", component: () => import("@/views/system/TableView.vue") },
  { path: "system/form", component: () => import("@/views/system/FormView.vue") },
];
