import type { ProColumn, QueryForm } from "../models";

/** 字典配置 */
export interface Dict {
  loading: boolean;
  options: { value: number | string; label: string; children?: Dict["options"] }[];
  emun: Partial<Record<string, string>>;
}

export type Dicts = Record<string, Dict>;

export type ProColumnOption = [string | number, string, (string | number)?][];
export type ProColumnRequest = (form: QueryForm) => Promise<ProColumnOption>;

export const setDicts = (cols: ProColumn[], form: QueryForm, dicts: Dicts) => {
  cols.forEach(async (x) => {
    let p: Promise<[string | number, string, (string | number)?][]> | undefined;
    if (x.valueType === "select" && x.option) p = new Promise((r) => r(x.option!));
    if (x.valueType === "select" && x.request) p = x.request(form);
    if (!p) return;
    const d: Dict = { loading: true, options: [], emun: {} };
    dicts[x.dataIndex] = d;
    const ind: Record<string, number> = {};
    const m: Dict["emun"] = {};
    const os: Dict["options"] = [];
    const l = await p;
    for (const oi in l) {
      const o = l[+oi];
      ind[o[0]] = +oi;
      m[o[0]] = o[1];
      if (o[2] && !os[ind[o[2]]].children) os[ind[o[2]]].children = [{ value: o[0], label: o[1] }];
      else if (o[2] && os[ind[o[2]]].children) os[ind[o[2]]].children?.push({ value: o[0], label: o[1] });
      os.push({ value: o[0], label: o[1] });
    }
    dicts[x.dataIndex].options = os;
    dicts[x.dataIndex].emun = m;
    dicts[x.dataIndex].loading = false;
  });
};
