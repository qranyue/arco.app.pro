<script lang="ts" setup>
import type { Form, Row } from "@arco-design/web-vue";
import { onMounted, reactive } from "vue";
import { useProvideOnChange, useProvideOnSetValue } from "./keys";
import { isNull } from "./utils/common";

type FormType = Record<string, unknown>;

interface Props {
  formProps?: Omit<InstanceType<typeof Form>["$props"], "model">;
  request?: () => Promise<FormType>;
  rowProps?: InstanceType<typeof Row>["$props"];
}
const $props = withDefaults(defineProps<Props>(), {
  formProps: undefined,
  request: undefined,
  rowProps: undefined,
});

const form = reactive<FormType>({});
useProvideOnChange((name, value) => {
  if (isNull(form[name])) delete form[name];
  else if (form[name]) if (form[name] !== value) form[name] = value;
});

const setValueObject = new Map<string, <T>(value?: T) => void>();
useProvideOnSetValue((name, callback) => setValueObject.set(name, callback));

onMounted(async () => {
  if (!$props.request) return;
  const value: FormType = await $props.request();
  if (!(value instanceof Object) || value instanceof Function) return console.warn("请返回对象类型");
  Object.keys(value).forEach((x) => setValueObject.get(x)?.(value[x]));
  Object.assign(form, value);
});
</script>

<template>
  <AForm :model="form" v-bind="formProps">
    <ARow v-bind="rowProps">
      <slot></slot>
    </ARow>
  </AForm>
</template>
