import type { ProColumn, QueryForm } from "../models";
import { isNull } from "./common";

export const formParse = (columns: ProColumn[], form: QueryForm) => {
  const parse: QueryForm = {};
  for (const x of columns) {
    const v = form[x.dataIndex];
    if (isNull(v)) continue;
    if (x.valueType === "dateRange" && x.transform) {
      Object.assign(parse, x.transform(v as unknown as [string, string]));
    } else parse[x.dataIndex] = JSON.parse(JSON.stringify(v));
  }
  return parse;
};
