<script lang="ts" setup>
import type { ProColumn, QueryForm } from "@/lib/pro-table";
import ProTable from "@/lib/pro-table/ProTable.vue";
import { wait } from "@/utils/wait";

const columns: ProColumn[] = [
  { dataIndex: "text", title: "文字", tips: "测试" },
  { dataIndex: "select", title: "序号", valueType: "select", request: () => new Promise((r) => setTimeout(() => r([[0, "特殊"]]), 5000)) },
  { dataIndex: "dataRange", title: "时间范围", valueType: "dateRange", fieldProps: { showTime: true }, transform: (value) => ({ start: value[0], end: value[1] }) },
];

const reqeuest = async (params: QueryForm) => {
  console.log(params);
  await wait(500);
  return {
    data: [{ text: "12", select: 0 }],
    total: 1,
  };
};
</script>

<template>
  <ACard>
    <ProTable :columns="columns" :request="reqeuest" />
  </ACard>
</template>
