import type { Input, RangePicker, Select, TableColumnData } from "@arco-design/web-vue";
import type { ProColumnOption, ProColumnRequest } from "./utils/dict";

export type QueryForm = Record<string, any>;

interface ProTableColumnTextValueType {
  valueType?: "text";
  fieldProps?: Omit<InstanceType<typeof Input>["$props"], "modelValue" | "allowClear">;
}

interface ProTableColumnDateRangeValueType {
  valueType: "dateRange";
  fieldProps?: Omit<InstanceType<typeof RangePicker>["$props"], "modelValue" | "allowClear">;
  transform?: (value: [string, string]) => unknown;
}

interface ProTableColumnSelectValueType {
  valueType: "select";
  fieldProps?: Omit<InstanceType<typeof Select>["$props"], "modelValue" | "allowClear" | "options" | "loading">;
  option?: ProColumnOption;
  request?: ProColumnRequest;
}

type ProTableColumnsValueType = ProTableColumnTextValueType | ProTableColumnSelectValueType | ProTableColumnDateRangeValueType;

type TableOmitType = "dataIndex" | "title";

interface ProTableColumnsDef extends Omit<TableColumnData, TableOmitType> {
  dataIndex: string;
  title?: string;
  tips?: string;

  hideSearch?: boolean;
  hideTable?: boolean;
}

export type ProColumn = ProTableColumnsDef & ProTableColumnsValueType;
