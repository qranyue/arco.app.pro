import type { TableColumnData } from "@arco-design/web-vue";

export type ValueType = "text" | "dateRange";

interface ProTableColumnValueTypeText {
  valueType?: "text";
  placeholder?: string;
}

interface ProTableColumnValueTypeDataRange {
  valueType: "dateRange";
  placeholder?: [string, string];
}

type ProTableColumnsValueType = ProTableColumnValueTypeText | ProTableColumnValueTypeDataRange;

export interface ProTableColumnData extends Omit<TableColumnData, "titleSlotName"> {
  valueType?: ValueType;
  tips?: string;
}
