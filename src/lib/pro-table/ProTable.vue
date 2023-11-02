<script lang="ts" setup generic="D extends TableData, Q extends {}">
import type { PaginationProps, Table, TableChangeExtra, TableData } from "@arco-design/web-vue";
import type { UnwrapRef } from "vue";
import { computed, ref, shallowReactive, shallowRef } from "vue";
import type { ProColumn, ProTableRequest, QueryParams } from "./models";
import ProQuery from "./ProQuery.vue";

interface Props {
  params?: Q;
  columns: ProColumn<D>[];
  request?: ProTableRequest<D, Q>;
}
const $props = withDefaults(defineProps<Props>(), {
  params: () => ({}) as Q,
  columns: () => [] as ProColumn<D>[],
  request: async () => ({ data: [], total: 0 }),
});

const $t_cols = computed(() => {
  const cols: TableData[] = [];
  $props.columns.forEach((x) => {
    if (x.hideTable === true) return;
    cols.push(x);
  });
  return cols;
});

const $loading = shallowRef(false);
const $data = ref<D[]>([]);

const $form = shallowRef({} as Q);
const $sorter = shallowRef<TableChangeExtra["sorter"]>();
const $pagination = shallowReactive<PaginationProps>({
  current: 1,
  pageSize: 10,
  total: 0,
});

const query = async () => {
  try {
    if ($loading.value) return;
    $loading.value = true;
    const params = { ...$form.value, current: $pagination.current!, pageSize: $pagination.pageSize! } as QueryParams;
    const data = await $props.request(params, $sorter.value);
    $data.value = data.data as UnwrapRef<D[]>;
    $pagination.total = data.total;
  } finally {
    $loading.value = false;
  }
};
query();

const onQuery = (params: Q) => {
  $form.value = { ...params, ...$props.params };
  query();
};

const onReload = () => {
  $form.value = { ...$props.params };
  query();
};

const onTableChange: InstanceType<typeof Table>["onChange"] = (_, extra) => {
  if (extra.page !== $pagination.current) $pagination.current = extra.page;
  if (extra.pageSize !== $pagination.pageSize) $pagination.pageSize = extra.pageSize;
  if (extra.sorter !== $sorter.value) $sorter.value = extra.sorter;
  query();
};
</script>

<template>
  <ACard>
    <ProQuery :params="$props.params" :loading="$loading" :columns="columns" @query="onQuery" @reload="onReload" />
  </ACard>
  <ACard style="margin-top: 16px">
    <ATable :columns="$t_cols" :data="$data" :loading="$loading" :pagination="$pagination" @change="onTableChange"></ATable>
  </ACard>
</template>
