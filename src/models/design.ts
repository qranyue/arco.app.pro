export interface Auth {
  type: "button" | "url";
  value: string;
  name: string;
}

export type MenuUrls = Partial<Record<string, string>>;

export interface Menu {
  id: string;
  path: string;
  icon?: string;
  title: string;
}

export type MenuMap = Partial<Record<string, Menu[]>>;

export interface MenuParent {
  name: string;
  parent: string;
}
export type MenuParentMap = Partial<Record<string, MenuParent>>;
