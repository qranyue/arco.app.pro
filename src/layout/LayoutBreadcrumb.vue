<script lang="ts" setup>
import { useMenuStore } from "@/stores/menu";
import { useRoute } from "vue-router";
import { computed } from "vue";
import type { MenuParent } from "@/models/design";

const $route = useRoute();

const { menu } = useMenuStore();

const list = computed(() => {
  const ls: MenuParent[] = [];
  const p = menu.parent[menu.urls[`url:${$route.path}`] || "root"];
  if (!p) return ls;
  ls.push(p);
  const len = Object.keys(menu.urls).length;
  while (ls.length <= len) {
    const p = menu.parent[ls[0].parent];
    if (!p) break;
    ls.splice(0, 0, p);
  }
  return ls;
});
</script>

<template>
  <ABreadcrumb class="breadcrumb">
    <ABreadcrumbItem key="root">
      <IconApps />
    </ABreadcrumbItem>
    <ABreadcrumbItem v-for="x in list" :key="x.parent">{{ x.name }}</ABreadcrumbItem>
  </ABreadcrumb>
</template>
