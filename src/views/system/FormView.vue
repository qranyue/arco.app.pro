<script lang="ts" setup>
import { ProForm, ProFormDigit, ProFormText } from "@/lib/pro-form";
import { wait } from "@/utils/wait";

const request = async () => {
  await wait(2000);
  return {
    text: "123456",
    digit: 12345,
  };
};
</script>

<template>
  <ACard>
    <ProForm :request="request">
      <ProFormText name="text" label="文本" :col-span="3" />
      <ProFormDigit name="digit" label="数字" :col-span="3" />
    </ProForm>
  </ACard>
</template>
