import type { ProTableColumnData, QueryForm } from "../models";

export const formParse = (columns: ProTableColumnData[], form: QueryForm) => {
  const parse: QueryForm = {};
  columns.forEach((x) => {
    if ([undefined, null, ""].includes(form[x.dataIndex!])) return;
    if (x.valueType === "dateRange" && x.transform) {
      Object.assign(parse, x.transform(form[x.dataIndex!]! as [string, string]));
    } else parse[x.dataIndex!] = JSON.parse(JSON.stringify(form[x.dataIndex!]));
  });
  return parse;
};
