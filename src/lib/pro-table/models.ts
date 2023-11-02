import type { Input, RangePicker, Select, TableChangeExtra, TableColumnData, TableData, TreeSelect } from "@arco-design/web-vue";

export type QueryParams<T = {}> = Partial<T> & {
  current: number;
  pageSize: number;
};
export type QuerySorter = TableChangeExtra["sorter"];
interface AwaitTableData<D> {
  data: D[];
  total: number;
}
export type ProTableRequest<D extends Record<string, unknown> = Record<string, unknown>, Q extends Record<string, unknown> = {}> = (
  params: QueryParams<Q>,
  sorter?: QuerySorter,
) => Promise<AwaitTableData<D>>;

interface ProTableColumnTextValueType {
  valueType?: "text";
  fieldProps?: Omit<InstanceType<typeof Input>["$props"], "modelValue" | "allowClear">;
}

interface ProTableColumnDateRangeValueType {
  valueType: "dateRange";
  fieldProps?: Omit<InstanceType<typeof RangePicker>["$props"], "modelValue" | "allowClear">;
  transform?: (value: [string, string]) => Record<string, string>;
}

type ProColumnOption = [string | number, string, (string | number)?][];
type ProColumnRequest<D> = (form: D) => Promise<ProColumnOption>;

interface ProTableColumnSelectValueType<D> {
  valueType: "select";
  fieldProps?: Omit<InstanceType<typeof Select>["$props"], "modelValue" | "allowClear" | "options" | "loading">;
  option?: ProColumnOption;
  request?: ProColumnRequest<D>;
}

interface ProTableColumnTreeSelectValueType<D> {
  valueType: "treeSelect";
  fieldProps?: Omit<InstanceType<typeof TreeSelect>["$props"], "modelValue" | "allowClear" | "data" | "fieldNames" | "loading">;
  option?: ProColumnOption;
  request?: ProColumnRequest<D>;
}

type ProTableColumnsValueType<D> = ProTableColumnDateRangeValueType | ProTableColumnTextValueType | ProTableColumnSelectValueType<D> | ProTableColumnTreeSelectValueType<D>;

type TableOmitType = "dataIndex" | "title";

interface ProTableColumnsDef<D> extends Omit<TableColumnData, TableOmitType> {
  dataIndex: keyof D;
  title?: string;
  tips?: string;

  hideSearch?: boolean;
  hideTable?: boolean;
}

export type ProColumn<D extends TableData = TableData> = ProTableColumnsDef<D> & ProTableColumnsValueType<D>;
