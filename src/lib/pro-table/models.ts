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

interface ProTableColumnsDef {
  title?: string;
  tips?: string;
}

export type ProTableColumnData = ProTableColumnsDef & ProTableColumnsValueType & Omit<TableColumnData, "title" | "titleSlotName">;
