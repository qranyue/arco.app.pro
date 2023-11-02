<script lang="ts" setup>
import type { ProColumn, QueryParams } from "@/lib/pro-table";
import ProTable from "@/lib/pro-table/ProTable.vue";
import { wait } from "@/utils/wait";

interface Data {
  text: string;
  select: 0;
  dataRange?: [string, string];
}

const columns: ProColumn<Data>[] = [
  { dataIndex: "text", title: "文字", tips: "测试" },
  { dataIndex: "select", title: "序号", valueType: "select", request: () => new Promise((r) => setTimeout(() => r([[0, "特殊"]]), 5000)) },
  { dataIndex: "dataRange", title: "时间范围", valueType: "dateRange", fieldProps: { showTime: true }, transform: (value) => ({ start: value[0], end: value[1] }) },
];

interface Query {
  text: string;
  select: 0;
  start: string;
  end: string;
}

const reqeuest = async (params: QueryParams<Query>) => {
  console.log(params);
  await wait(100);
  return {
    data: [{ text: "12", select: 0 }] as Data[],
    total: 1,
  };
};
</script>

<template>
  <ProTable :columns="columns" :request="reqeuest" />
</template>
