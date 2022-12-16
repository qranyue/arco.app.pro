import { defineStore } from "pinia";
import { computed } from "vue";

export const useMenu = defineStore("menu", () => {
  return {
    menu: computed(() => [{ path: "/welcome", title: "欢迎" }]),
  };
});
