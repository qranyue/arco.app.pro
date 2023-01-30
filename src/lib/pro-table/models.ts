import type { Input, RangePicker, TableColumnData } from "@arco-design/web-vue";

export type QueryForm = Partial<Record<string, never>>;

interface ProTableColumnValueTypeText {
  valueType?: "text";
  fieldProps?: InstanceType<typeof Input>["$props"];
}

interface ProTableColumnValueTypeDataRange {
  valueType: "dateRange";
  fieldProps?: InstanceType<typeof RangePicker>["$props"];
  transform?: (value: [string, string]) => unknown;
}

type ProTableColumnsValueType = ProTableColumnValueTypeText | ProTableColumnValueTypeDataRange;

interface ProTableColumnsDef {
  title?: string;
  tips?: string;
}

export type ProTableColumnData = ProTableColumnsDef & ProTableColumnsValueType & Omit<TableColumnData, "title">;
