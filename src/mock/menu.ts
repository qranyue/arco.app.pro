import mockjs from "mockjs";

mockjs.mock("/api/design/menu", () => ({
  code: 200,
  success: true,
  data: [],
}));
