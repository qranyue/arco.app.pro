<script lang="ts" setup>
import type { Col, FormItem, InputNumber } from "@arco-design/web-vue";
import { computed } from "vue";
import { useOnChange, useOnSetValue } from "./keys";
import { useValue } from "./utils/fleid-value";

interface Props {
  colSpan?: number;
  colProps?: InstanceType<typeof Col>["$props"];
  fieldProps?: Omit<InstanceType<typeof InputNumber>["$props"], "value">;
  formProps?: Omit<InstanceType<typeof FormItem>["$props"], "field" | "label" | "rules">;
  name?: string;
  label?: string;
  rules?: InstanceType<typeof FormItem>["$props"]["rules"];
}
const $props = withDefaults(defineProps<Props>(), {
  colSpan: 1,
  colProps: undefined,
  fieldProps: undefined,
  formProps: undefined,
  name: undefined,
  label: undefined,
  rules: undefined,
});

const span = computed(() => 24 / $props.colSpan);

const [value, setValue] = useValue<number>($props.name, useOnChange());

useOnSetValue($props.name, setValue);
</script>

<template>
  <ACol :span="span" v-bind="colProps">
    <AFormItem :field="name" :label="label" :rules="rules" v-bind="formProps">
      <AInputNumber v-model.number="value" v-bind="fieldProps" />
    </AFormItem>
  </ACol>
</template>
