import type { Auth, Menu, MenuMap, MenuParentMap, MenuUrls } from "@/models/design";
import { http, type HttpResponse } from "@/utils/http";

export interface MenuRes {
  parent: string;
  type: Auth["type"];
  id: string;
  path: string;
  icon: string;
  title: string;
  sort: number;
}

export const getMenu = async () => {
  const res = (await http.get<HttpResponse<MenuRes[]>>("design/menu")).data.data;
  res.push({ id: "welcome", type: "url", parent: "root", icon: "icon-home", path: "/welcome", title: "欢迎", sort: 0 });
  res.sort((a, b) => (a.sort > b.sort ? 1 : -1));
  const urls: MenuUrls = {};
  const map: MenuMap = {};
  const parent: MenuParentMap = {};
  res.forEach((x) => {
    urls[`${x.type}:${x.path}`] = x.id;
    parent[x.id] = { name: x.title, parent: x.parent };
    if (!map[x.parent]) map[x.parent] = [];
    const menu: Menu = { id: x.id, path: x.path, title: x.title };
    x.icon && (menu.icon = x.icon);
    map[x.parent]!.push(menu);
  });
  return { urls, parent, list: res.map<Auth>((x) => ({ type: x.type, value: x.path, name: x.title })), map };
};
