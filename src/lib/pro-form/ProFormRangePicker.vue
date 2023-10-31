<script lang="ts" setup>
import type { FormItem, RangePicker } from "@arco-design/web-vue";
import { useField } from "./hooks";

interface Props {
  fieldProps?: Omit<InstanceType<typeof RangePicker>["$props"], "modelValue">;
  formProps?: Omit<InstanceType<typeof FormItem>["$props"], "field" | "label" | "rules">;
  name: string;
  label?: string;
  rules?: InstanceType<typeof FormItem>["$props"]["rules"];
}
const $props = withDefaults(defineProps<Props>(), {
  fieldProps: undefined,
  formProps: undefined,
  label: undefined,
  rules: undefined,
});

const [value] = useField<[string, string]>($props.name);
</script>

<template>
  <AFormItem :field="name" :label="label" :rules="rules" v-bind="formProps">
    <ARangePicker v-model="value" v-bind="fieldProps" style="width: 100%" />
  </AFormItem>
</template>
