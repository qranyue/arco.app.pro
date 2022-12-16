<script lang="tsx" setup>
import { computed, inject, reactive } from "vue";
import { TableColumns, TableLoading, TableOnReload } from "./keys";
import type { ProTableColumnData } from "./models";

interface Props {
  columns?: ProTableColumnData[];
  loading?: boolean;
}
const $props = defineProps<Props>();

const _columns = inject(TableColumns);
const $_columns = computed(() => {
  const cs: ProTableColumnData[] = [];
  ($props.columns || _columns || []).forEach((x) => {
    if (x.dataIndex) cs.push({ ...x });
  });
  return cs;
});

const _loading = inject(TableLoading);
const $_loading = computed(() => _loading?.value ?? $props.loading ?? false);

interface Emits {
  (event: "query"): void;
  (event: "reload"): void;
}
const $emit = defineEmits<Emits>();

const form = reactive<Record<string, any>>({});

const _onReload = inject(TableOnReload);
const onReload = () => {
  Object.keys(form).forEach((k) => (form[k] = undefined));
  _onReload?.();
  $emit("reload");
};
</script>

<template>
  <AForm :model="form" :label-col-props="{ span: 8 }" :wrapper-col-props="{ span: 16 }">
    <ARow align="center">
      <ACol flex="auto">
        <ARow class="pro-query-main" :gutter="[16, 0]">
          <ACol v-for="x in $_columns" :key="x.dataIndex" :lg="8">
            <AFormItem :label="x.title">
              <template v-if="x.tips" #label>
                <span>{{ x.title }}</span>
                <APopover>
                  <template #content>{{ x.tips }}</template>
                  <IconQuestionCircle />
                </APopover>
              </template>
              <ARangePicker v-if="x.valueType === 'dateRange'" v-model="form[x.dataIndex!]" />
              <AInput v-else v-model="form[x.dataIndex!]" :placeholder="`请输入${x.title}`" />
            </AFormItem>
          </ACol>
        </ARow>
      </ACol>
      <ADivider direction="vertical" :style="{ height: '72px' }" />
      <ACol flex="100px">
        <ASpace direction="vertical" fill>
          <AButton type="primary" long :loading="$_loading">查询</AButton>
          <AButton long @click="onReload">重置</AButton>
        </ASpace>
      </ACol>
    </ARow>
  </AForm>
</template>

<style lang="less" scoped>
.pro-query-main {
  margin-bottom: -20px;
}
</style>
