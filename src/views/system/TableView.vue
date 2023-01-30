<script lang="ts" setup>
import type { ProTableColumnData } from "@/lib/pro-table/models";
import ProQuery from "@/lib/pro-table/ProQuery.vue";

interface Table {}

const columns: ProTableColumnData[] = [
  { dataIndex: "text", title: "文字", tips: "测试" },
  { dataIndex: "number", title: "序号" },
  { dataIndex: "dataRange", title: "时间范围", valueType: "dateRange", fieldProps: { showTime: true }, transform: (value) => ({ start: value[0], end: value[1] }) },
];

const onQuery = (form: Partial<Table>) => {
  console.log(form);
};
</script>

<template>
  <ACard>
    <ProQuery :columns="columns" @query="onQuery" />
  </ACard>
</template>
