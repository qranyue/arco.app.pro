import type { InjectionKey, ComputedRef } from "vue";
import type { ProTableColumnData } from "./models";

export const TableColumns = Symbol("TableColumns") as InjectionKey<ComputedRef<ProTableColumnData[]>>;

export const TableLoading = Symbol("TableLoading") as InjectionKey<ComputedRef<boolean>>;

export const TableOnReload = Symbol("TableOnReload") as InjectionKey<() => void>;
