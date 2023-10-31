<script lang="ts" setup>
import { useMenuStore } from "@/stores/menu";
import { useRoute } from "vue-router";
import { shallowRef, watch } from "vue";
import LayoutMenuItem from "./LayoutMenuItem.vue";

const $route = useRoute();

const { menu, getMenu } = useMenuStore();
getMenu();

const open = shallowRef<string[]>([]);
const selected = shallowRef<string[]>([]);
watch(
  () => [menu.loading, $route.path],
  () => {
    const ids: string[] = [menu.urls[`url:${$route.path}`] || "root"];
    const len = Object.keys(menu.urls).length;
    while (ids.length <= len) {
      const p = menu.parent[ids[0]];
      if (!p || p.parent === "root") break;
      ids.splice(0, 0, p.parent);
    }
    open.value = ids.slice(0, -1).map((x) => `sub_${x}`);
    selected.value = ids.slice(-1);
  },
);
</script>

<template>
  <ASkeleton v-if="menu.loading" class="skeleton" animation>
    <ASkeletonLine :rows="5" :widths="['60%']" />
  </ASkeleton>
  <AMenu v-else v-model:open-keys="open" :selected-keys="selected">
    <LayoutMenuItem v-for="x in menu.map['root']" :key="x.id" :menu="x" />
  </AMenu>
</template>

<style lang="less" scoped>
.skeleton {
  padding: 12px;
}
</style>
