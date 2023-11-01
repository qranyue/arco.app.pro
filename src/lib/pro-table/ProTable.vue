<script lang="ts" setup>
import type { PaginationProps, Table, TableChangeExtra, TableData } from "@arco-design/web-vue";
import { ref, shallowReactive, shallowRef } from "vue";
import ProQuery from "./ProQuery.vue";
import type { ProColumn, QueryForm } from "./models";

interface Params extends QueryForm {
  current?: number;
  pageSize?: number;
}
interface AwaitTableData {
  data: TableData[];
  total: number;
}
type TableRequest = (params: Params, sorter: TableChangeExtra["sorter"]) => Promise<AwaitTableData>;

interface Props {
  params?: QueryForm;
  columns: ProColumn[];
  request: TableRequest;
}
const $props = withDefaults(defineProps<Props>(), {
  params: () => ({}),
});

const $loading = shallowRef(false);
const $data = ref<TableData[]>([]);

const $form = shallowRef<QueryForm>({});
const $sorter = shallowRef<TableChangeExtra["sorter"]>();
const $pagination = shallowReactive<PaginationProps>({
  current: 1,
  pageSize: 10,
});

const query = async () => {
  try {
    $loading.value = true;
    const params = { ...$form.value, current: $pagination.current, pageSize: $pagination.pageSize };
    const data = await $props.request(params, $sorter.value);
    $data.value = data.data;
    $pagination.total = data.total;
  } finally {
    $loading.value = false;
  }
};
query();

const onQuery = (params: QueryForm) => {
  $form.value = { ...params, ...$props.params };
  query();
};

const onReload = () => {};

const onTableChange: InstanceType<typeof Table>["onChange"] = (_, extra) => {
  if (extra.page !== $pagination.current) $pagination.current = extra.page;
  if (extra.pageSize !== $pagination.pageSize) $pagination.pageSize = extra.pageSize;
  if (extra.sorter !== $sorter.value) $sorter.value = extra.sorter;
  query();
};
</script>

<template>
  <ACard>
    <ProQuery :params="params" :loading="$loading" :columns="columns" @query="onQuery" @reload="onReload" />
  </ACard>
  <ACard style="margin-top: 16px">
    <ATable :columns="columns" :data="$data" :loading="$loading" @change="onTableChange"></ATable>
  </ACard>
</template>
