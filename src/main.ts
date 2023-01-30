import { createApp, type App as Instance } from "vue";
import { createPinia } from "pinia";

if (import.meta.env.DEV) import("./mock");

import App from "./App.vue";
import router from "./router";

let app: Instance;

export const mount = (el: Element) => {
  app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount(el);
};

export const unmount = () => {
  app.unmount();
};

if (import.meta.env.DEV) mount(document.querySelector("#app")!);
