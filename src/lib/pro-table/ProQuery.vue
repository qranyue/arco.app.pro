<script lang="ts" setup>
import { computed, reactive, shallowRef } from "vue";
import type { ProTableColumnData } from "./models";

const collapsed = shallowRef(true);
const triggerCollapsed = () => (collapsed.value = !collapsed.value);
const collapsedText = computed(() => (collapsed.value ? "展开" : "收起"));

interface Props {
  columns?: ProTableColumnData[];
  loading?: boolean;
}
const $props = defineProps<Props>();

const $columns = computed(() => {
  const cs: ProTableColumnData[] = [];
  ($props.columns || []).forEach((x) => {
    if (x.dataIndex) cs.push({ ...x });
  });
  return cs;
});

const $loading = computed(() => $props.loading ?? false);

interface Emits {
  (event: "query"): void;
  (event: "reload"): void;
}
const $emit = defineEmits<Emits>();

const form = reactive<Record<string, any>>({});

const onReload = () => {
  Object.keys(form).forEach((k) => (form[k] = undefined));
  $emit("reload");
};
</script>

<template>
  <AForm :model="form" label-align="left" :label-col-props="{ xs: 24, md: 8 }" :wrapper-col-props="{ xs: 24, md: 16 }">
    <AGrid :collapsed="collapsed" :cols="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }" :col-gap="16">
      <AGridItem v-for="x in $columns" :key="x.dataIndex">
        <AFormItem :label="x.title">
          <template v-if="x.tips" #label>
            <span>{{ x.title }}</span>
            <APopover>
              <template #content>{{ x.tips }}</template>
              <IconQuestionCircle />
            </APopover>
          </template>
          <ARangePicker v-if="x.valueType === 'dateRange'" v-model="form[x.dataIndex!]" :style="{ width: '100%' }" />
          <AInput v-else v-model="form[x.dataIndex!]" :placeholder="`请输入${x.title}`" />
        </AFormItem>
      </AGridItem>
      <AGridItem suffix>
        <ASpace fill>
          <AButton type="primary" :loading="$loading">查询</AButton>
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
