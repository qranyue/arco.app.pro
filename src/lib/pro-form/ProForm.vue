<script lang="ts" setup>
import type { Form } from "@arco-design/web-vue";
import type { ProFormData } from "./models";
import { useForm, type UseForm } from "./use-form";

interface Props {
  form?: UseForm;
  formProps?: Omit<InstanceType<typeof Form>["$props"], "model">;
  request?: () => Promise<ProFormData>;
}
const $props = withDefaults(defineProps<Props>(), {
  form: undefined,
  formProps: undefined,
  request: undefined,
});

interface Emits {
  (event: "finish", form: ProFormData): void;
}
const $emit = defineEmits<Emits>();

const { form$, data } = useForm($props.form).register($props.request);

const onFinish = () => {
  $emit("finish", { ...data });
};
</script>

<template>
  <AForm ref="form$" :model="data" v-bind="formProps" @submit-success="onFinish">
    <slot></slot>
  </AForm>
</template>
