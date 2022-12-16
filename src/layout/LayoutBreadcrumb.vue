<script lang="ts" setup>
import { useMenu } from "@/stores/menu";
import { useRoute } from "vue-router";
import { computed } from "vue";
import type { MenuParent } from "@/models/design";

const $route = useRoute();

const { menu } = useMenu();

const list = computed(() => {
  const ls: MenuParent[] = [menu.parent[menu.urls[`url:${$route.path}`]!]!];
  return ls;
});
</script>

<template>
  <ABreadcrumb class="breadcrumb">
    <ABreadcrumbItem>
      <IconApps />
    </ABreadcrumbItem>
    <ABreadcrumbItem>欢迎</ABreadcrumbItem>
  </ABreadcrumb>
</template>
