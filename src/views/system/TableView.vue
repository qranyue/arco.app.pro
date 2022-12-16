<script lang="ts" setup>
import type { ProTableColumnData } from "@/lib/pro-table/models";
import ProQuery from "@/lib/pro-table/ProQuery.vue";

const columns: ProTableColumnData[] = [
  { dataIndex: "text", title: "文字", tips: "测试" },
  { dataIndex: "text", title: "序号" },
  { dataIndex: "dataRange", title: "时间范围", valueType: "dateRange" },
];
</script>

<template>
  <ACard>
    <ProQuery :columns="columns" />
  </ACard>
</template>
