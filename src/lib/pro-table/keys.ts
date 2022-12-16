import type { InjectionKey, Ref } from "vue";
import type { ProTableColumnData } from "./models";

export const TableColumns = Symbol("TableColumns") as InjectionKey<ProTableColumnData[]>;

export const TableLoading = Symbol("TableLoading") as InjectionKey<Ref<boolean>>;

export const TableOnReload = Symbol("TableOnReload") as InjectionKey<() => void>;
