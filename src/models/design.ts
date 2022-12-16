export interface MenuRes {
  parent: string;
  id: string;
  path: string;
  icon: string;
  title: string;
  sort: number;
}

export interface Menu {
  id: string;
  path: string;
  icon?: string;
  title: string;
  children?: Menu[];
}

export type MenuMap = Partial<Record<string, Menu[]>>;
