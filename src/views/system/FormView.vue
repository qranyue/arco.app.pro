<script lang="ts" setup>
import { ProForm, ProFormText } from "@/lib/pro-form";
import { wait } from "@/utils/wait";

const request = async () => {
  await wait(2000);
  return {
    field: "123456",
  };
};
</script>

<template>
  <ACard>
    <ProForm :request="request">
      <ProFormText name="field" label="菜鸡" />
    </ProForm>
  </ACard>
</template>
