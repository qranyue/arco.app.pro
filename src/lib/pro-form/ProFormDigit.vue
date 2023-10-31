<script lang="ts" setup>
import type { FormItem, InputNumber } from "@arco-design/web-vue";
import { useField } from "./hooks";

interface Props {
  fieldProps?: Omit<InstanceType<typeof InputNumber>["$props"], "modelValue">;
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

const [value] = useField<number>($props.name);
</script>

<template>
  <AFormItem :field="name" :label="label" :rules="rules" v-bind="formProps">
    <AInputNumber v-model.number="value" v-bind="fieldProps" />
  </AFormItem>
</template>
