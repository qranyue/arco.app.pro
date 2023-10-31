<script lang="ts" setup>
import { ProForm, ProFormDigit, ProFormRangePicker, ProFormText } from "@/lib/pro-form";
import type { FormType } from "@/lib/pro-form/models";
import { wait } from "@/utils/wait";

const request = async () => {
  await wait(2000);
  return {
    text: "123456",
    digit: 12345,
  };
};

const onFinish = (form: FormType) => {
  console.log(form);
};
</script>

<template>
  <ACard>
    <ProForm :request="request" @finish="onFinish">
      <ARow :gutter="32">
        <ACol :span="8"><ProFormText name="text" label="文本" /></ACol>
        <ACol :span="8"><ProFormDigit name="digit" label="数字" /></ACol>
        <ACol :span="8"><ProFormRangePicker name="range" label="周期" /></ACol>
      </ARow>

      <AButton type="primary" html-type="submit">提交</AButton>
    </ProForm>
  </ACard>
</template>
