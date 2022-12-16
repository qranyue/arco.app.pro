import type { Auth, MenuMap, MenuParentMap, MenuUrls } from "@/models/design";
import { getMenu as getMenuAsync } from "@/services/menu";
import { defineStore } from "pinia";
import { shallowReactive } from "vue";

export const useMenu = defineStore("menu", () => {
  const menu = shallowReactive({ urls: {} as MenuUrls, list: [] as Auth[], parent: {} as MenuParentMap, map: {} as MenuMap, loading: true });

  const getMenu = async () => {
    Object.assign(menu, await getMenuAsync());
    menu.loading = false;
  };

  return { menu, getMenu };
});
