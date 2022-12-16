<script lang="ts" setup>
import { useMenu } from "@/stores/menu";

const menu = useMenu();
</script>

<template>
  <AMenu>
    <template v-for="item in menu.menu" :key="item.path">
      <AMenuItem>{{ item.title }}</AMenuItem>
    </template>
  </AMenu>
</template>
