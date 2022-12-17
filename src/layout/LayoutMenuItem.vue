<script lang="ts" setup>
import { IconFont } from "@/lib/iconfont";
import type { Menu } from "@/models/design";
import { useMenuStore } from "@/stores/menu";
import { toRef } from "vue";
import { useRouter } from "vue-router";

const $router = useRouter();

interface Props {
  menu: Menu;
}
const $props = defineProps<Props>();

const map = toRef(useMenuStore().menu, "map");

const onClick = () => {
  $router.push($props.menu.path);
};
</script>

<template>
  <AMenuItem v-if="!map[menu.id]" :key="menu.id" @click="onClick">
    <template v-if="menu.icon" #icon><IconFont :type="menu.icon" /></template>
    {{ menu.title }}
  </AMenuItem>
  <ASubMenu v-else :key="`sub_${menu.id}`">
    <template v-if="menu.icon" #icon><IconFont :type="menu.icon" /></template>
    <template #title>{{ menu.title }}</template>
    <LayoutMenuItem v-for="x in map[menu.id]" :key="x.id" :menu="x" />
  </ASubMenu>
</template>
