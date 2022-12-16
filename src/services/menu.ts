import type { Menu, MenuMap, MenuRes } from "@/models/design";
import { http, type HttpResponse } from "@/utils/http";

const parseMenu = (list: Menu[], map: MenuMap) => {
  return list.map<Menu>((x) => {
    const menu: Menu = { id: x.id, path: x.path, title: x.title };
    x.icon && (menu.icon = x.icon);
    map[x.id] && (menu.children = parseMenu(map[x.id]!, map));
    return menu;
  });
};

export const getMenu = async () => {
  const list = (await http.get<HttpResponse<MenuRes[]>>("design/menu")).data.data;
  list.push({ id: "welcome", parent: "root", icon: "icon-person", path: "/welcome", title: "欢迎", sort: 0 });
  list.sort((a, b) => (a.sort > b.sort ? 1 : -1));
  const map: MenuMap = {};
  list.forEach((x) => {
    if (!map[x.parent]) map[x.parent] = [];
    const menu: Menu = { id: x.id, path: x.path, title: x.title };
    x.icon && (menu.icon = x.icon);
    map[x.parent]!.push(menu);
  });
  return { list, map, menu: parseMenu(map["root"]!, map) };
};
