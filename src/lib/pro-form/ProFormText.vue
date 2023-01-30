<script lang="ts" setup>
import type { Col, FormItem, Input } from "@arco-design/web-vue";
import { useOnChange, useOnSetValue } from "./keys";
import { useValue } from "./utils/fleid-value";

interface Props {
  colProps?: InstanceType<typeof Col>["$props"];
  fieldProps?: Omit<InstanceType<typeof Input>["$props"], "value">;
  formProps?: Omit<InstanceType<typeof FormItem>["$props"], "field" | "label">;
  name?: string;
  label?: string;
}
const $props = withDefaults(defineProps<Props>(), {
  colProps: undefined,
  fieldProps: undefined,
  formProps: undefined,
  name: undefined,
  label: undefined,
});

const [value, setValue] = useValue<string>($props.name, useOnChange());

useOnSetValue($props.name, setValue);
</script>

<template>
  <ACol v-bind="colProps">
    <AFormItem :field="name" :label="label" v-bind="formProps">
      <AInput v-model="value" v-bind="fieldProps" />
    </AFormItem>
  </ACol>
</template>
