<script lang="ts" setup>
import { computed, reactive, shallowRef } from "vue";
import type { ProTableColumnData, QueryForm } from "./models";
import { formParse } from "./utils/query";

const collapsed = shallowRef(true);
const triggerCollapsed = () => (collapsed.value = !collapsed.value);
const collapsedText = computed(() => (collapsed.value ? "展开" : "收起"));

interface Props {
  columns?: ProTableColumnData[];
  loading?: boolean;
}
const $props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  loading: false,
});

const $columns = computed(() => {
  const cs: ProTableColumnData[] = [];
  $props.columns.forEach((x) => {
    if (x.dataIndex) cs.push({ ...x });
  });
  return cs;
});

interface Emits {
  (event: "query", form: QueryForm): void;
  (event: "reload"): void;
}
const $emit = defineEmits<Emits>();

const form = reactive<QueryForm>({});

const onReload = () => {
  Object.keys(form).forEach((k) => (form[k] = undefined));
  $emit("reload");
};

const onQuery = () => {
  $emit("query", formParse($columns.value, form));
};
</script>

<template>
  <AForm :model="form" :label-col-props="{ xs: 24, md: 8 }" :wrapper-col-props="{ xs: 24, md: 16 }">
    <AGrid :collapsed="collapsed" :cols="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }" :col-gap="16">
      <AGridItem v-for="x in $columns" :key="x.dataIndex">
        <AFormItem :label="x.title" :tooltip="x.tips">
          <ARangePicker v-if="x.valueType === 'dateRange'" v-model="form[x.dataIndex!]" :style="{ width: '100%' }" allow-clear v-bind="x.fieldProps" />
          <AInput v-else v-model="form[x.dataIndex!]" :placeholder="x.fieldProps?.placeholder || `请输入${x.title}`" allow-clear v-bind="x.fieldProps" />
        </AFormItem>
      </AGridItem>
      <AGridItem suffix>
        <ASpace fill>
          <AButton type="primary" :loading="$props.loading" @click="onQuery">查询</AButton>
          <AButton @click="onReload">重置</AButton>
          <AButton type="text" @click="triggerCollapsed">
            <span>{{ collapsedText }}</span>
            <IconDown v-if="collapsed" />
            <IconUp v-else />
          </AButton>
        </ASpace>
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
