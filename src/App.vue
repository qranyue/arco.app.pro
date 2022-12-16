<script setup lang="ts">
import locale from "@arco-design/web-vue/es/locale/lang/zh-cn";
</script>

<template>
  <AConfigProvider :locale="locale">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </AConfigProvider>
</template>

<style lang="less">
@import url("@arco-design/web-vue/es/message/style/index.less");
</style>
