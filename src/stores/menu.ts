import type { MenuMap, MenuParentMap, MenuUrls } from "@/models/design";
import { getMenu as getMenuAsync } from "@/services/menu";
import { defineStore } from "pinia";
import { shallowReactive } from "vue";

export const useMenuStore = defineStore("menu", () => {
  const menu = shallowReactive({ urls: {} as MenuUrls, parent: {} as MenuParentMap, map: {} as MenuMap, loading: true });

  const getMenu = async () => {
    Object.assign(menu, await getMenuAsync());
    menu.loading = false;
  };

  return { menu, getMenu };
});
