import type { ProColumn } from "../models";
import { isNull } from "./common";

/** 字典配置 */
export interface Dict {
  /** 字典加载中 */
  loading: boolean;
  /** 字典渲染 */
  options: { value: number | string; label: string; children?: Dict["options"] }[];
  /** 字典对象 */
  emun: Partial<Record<string, string>>;
}
/** 字典内容 */
export type Dicts<D extends {}> = Partial<Record<keyof D, Dict>>;

export const setDicts = <D extends {}>(cols: ProColumn<D>[], form: D, dicts: Dicts<D>) => {
  cols.forEach(async (x) => {
    // 异步内容
    let r: Promise<[string | number, string, (string | number)?][]> | undefined;
    // 静态配置
    if (x.valueType === "select" && x.option) r = Promise.resolve(x.option);
    if (x.valueType === "treeSelect" && x.option) r = Promise.resolve(x.option);
    // 函数执行，开始获取异步字典
    if (x.valueType === "select" && x.request) r = x.request(form);
    if (x.valueType === "treeSelect" && x.request) r = x.request(form);
    // 没有字典
    if (!r) return;
    // 创建字典配置
    const d: Dict = { loading: true, options: [], emun: {} };
    // 字典赋值
    dicts[x.dataIndex] = d;
    // 索引 [下标，是否有父级]
    const ind: Record<string, [number, boolean]> = {};
    // 字典对象
    const m: Dict["emun"] = {};
    // 字典渲染列表
    let os: Dict["options"] = [];
    // 是否生成树
    let h = false;
    // 获取异步内容
    const l = await r;
    for (const oi in l) {
      // oi为下标，o为单列
      const o = l[+oi];
      // 索引存储 [下标，是否有父级]
      ind[o[0]] = [+oi, !isNull(o[2])];
      // 字典对象存储
      m[o[0]] = o[1];
      // 添加字典
      os.push({ value: o[0], label: o[1] });
      // 是否有父级 用于生成树
      if (ind[o[0]][1] && !h) h = true;
    }
    if (h) {
      const t: Dict["options"] = [];
      for (const o of l) {
        // 算法内核：有父级，无子级
        if (ind[o[0]][1] && !os[ind[o[2]!][0]].children) os[ind[o[2]!][0]].children = [];
        if (ind[o[0]][1]) os[ind[o[2]!][0]].children!.push(os[ind[o[0]][0]]);
        // 过滤，保留无父级的，保留一级
        if (!ind[o[0]][1]) t.push(os[ind[o[0]][0]]);
      }
      os = t;
    }
    // 更新字典内容
    dicts[x.dataIndex]!.options = os;
    // 更新字典对象
    dicts[x.dataIndex]!.emun = m;
    // 更新字典获取状态
    dicts[x.dataIndex]!.loading = false;
  });
};
