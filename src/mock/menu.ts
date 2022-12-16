import mockjs from "mockjs";

mockjs.mock("/api/design/menu", () => ({
  code: 200,
  success: true,
  data: [
    { id: "system", type: "url", parent: "root", icon: "icon-setting", path: "/system", title: "系统设置", sort: 99 },
    { id: "system_table", type: "url", parent: "system", icon: "", path: "/system/table", title: "表格", sort: 0 },
  ],
}));
