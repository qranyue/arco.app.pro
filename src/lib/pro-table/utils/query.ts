import type { ProColumn } from "../models";
import { isNull } from "./common";

export const formParse = <D extends {}, Q extends {}>(columns: ProColumn<D>[], form: D) => {
  const parse = {} as Q;
  for (const x of columns) {
    const v = form[x.dataIndex];
    if (isNull(v)) continue;
    if (x.valueType === "dateRange" && x.transform) {
      Object.assign(parse, x.transform(v as [string, string]));
    } else Object.assign(parse, { [x.dataIndex]: JSON.parse(JSON.stringify(v)) });
  }
  return parse;
};
