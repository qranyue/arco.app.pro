<script lang="ts" setup generic="D extends TableData, Q extends {}">
import type { TableData } from "@arco-design/web-vue";
import { computed, reactive, shallowRef, shallowReactive, watch } from "vue";
import type { ProColumn } from "./models";
import { formParse } from "./utils/query";
import { setDicts, type Dicts } from "./utils/dict";

interface Props {
  params?: Q;
  columns?: ProColumn<D>[];
  loading?: boolean;
}
const $props = withDefaults(defineProps<Props>(), {
  params: () => ({}) as Q,
  columns: () => [] as ProColumn<D>[],
  loading: false,
});

const collapsed = shallowRef(true);
const triggerCollapsed = () => (collapsed.value = !collapsed.value);
const collapsedText = computed(() => (collapsed.value ? "展开" : "收起"));

const $columns = computed(() => {
  const cs: ProColumn<D>[] = [];
  $props.columns.forEach((x) => {
    if (x.hideSearch !== true) cs.push({ ...x });
  });
  return cs;
});

interface Emits {
  (event: "query", form: Q): void;
  (event: "reload"): void;
}
const $emit = defineEmits<Emits>();

const $form = shallowReactive({} as D);

watch(
  () => $props.params,
  (v) => {
    Object.assign($form, v);
  },
  { immediate: true, deep: true },
);

const onReload = () => {
  for (const k of $columns.value) {
    $props.params[k.dataIndex as keyof Q] ?? delete $form[k.dataIndex];
  }
  $emit("reload");
};

const onQuery = () => {
  $emit("query", formParse($columns.value, $form));
};

const $dicts = reactive({} as Dicts<D>);

watch(
  () => $columns.value,
  (cs) => setDicts(cs, $form, $dicts),
  { immediate: true },
);
</script>

<template>
  <AForm :model="$form!" :label-col-props="{ xs: 24, md: 8 }" :wrapper-col-props="{ xs: 24, md: 16 }">
    <AGrid :collapsed="collapsed" :cols="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }" :col-gap="16">
      <AGridItem v-for="x in $columns" :key="x.dataIndex">
        <AFormItem :label="x.title" :tooltip="x.tips">
          <ARangePicker v-if="x.valueType === 'dateRange'" v-model="($form as D)[x.dataIndex]" :style="{ width: '100%' }" allow-clear v-bind="x.fieldProps" />
          <ASelect
            v-else-if="x.valueType === 'select'"
            v-model="($form as D)[x.dataIndex]"
            :placeholder="x.fieldProps?.placeholder || `请选择${x.title}`"
            :loading="($dicts as Dicts<D>)[x.dataIndex]!.loading"
            :options="($dicts as Dicts<D>)[x.dataIndex]!.options"
            allow-clear
            v-bind="x.fieldProps"
          />
          <AInput v-else v-model="($form as D)[x.dataIndex]" :placeholder="x.fieldProps?.placeholder || `请输入${x.title}`" allow-clear v-bind="x.fieldProps" />
        </AFormItem>
      </AGridItem>
      <AGridItem suffix>
        <ARow :gutter="8" justify="end">
          <ACol flex="none"><AButton type="primary" :loading="loading" @click="onQuery">查询</AButton></ACol>
          <ACol flex="none"><AButton @click="onReload">重置</AButton></ACol>
          <ACol flex="none">
            <AButton type="text" @click="triggerCollapsed">
              <span>{{ collapsedText }}</span>
              <IconDown v-if="collapsed" />
              <IconUp v-else />
            </AButton>
          </ACol>
        </ARow>
      </AGridItem>
    </AGrid>
  </AForm>
</template>

<style lang="less" scoped>
@import: url("@arco-design/web-vue/es/grid/style/index.less");

.pro-query-main {
  margin-bottom: -20px;
}
</style>
