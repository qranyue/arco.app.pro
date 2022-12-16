<script lang="ts" setup>
import { shallowRef } from "vue";
import LayoutBreadcrumb from "./LayoutBreadcrumb.vue";
import LayoutFooter from "./LayoutFooter.vue";
import LayoutHeader from "./LayoutHeader.vue";
import LayoutLogo from "./LayoutLogo.vue";
import LayoutMenu from "./LayoutMenu.vue";

const collapsed = shallowRef<boolean>();
const onCollapse = (value: boolean) => {
  collapsed.value = value;
};
</script>

<template>
  <ALayout class="app-layout">
    <AAffix :offset-top="15">
      <ALayoutSider class="app-sider" breakpoint="lg" collapsible :collapsed="collapsed" @collapse="onCollapse">
        <LayoutLogo />
        <AScrollbar outer-class="app-menu">
          <LayoutMenu />
        </AScrollbar>
      </ALayoutSider>
    </AAffix>

    <ALayout>
      <AAffix :offset-top="15">
        <ALayoutHeader class="app-header">
          <LayoutHeader />
        </ALayoutHeader>
      </AAffix>
      <LayoutBreadcrumb class="app-breadcrumb" />
      <ALayoutContent>
        <RouterView v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </ALayoutContent>
      <LayoutFooter class="app-footer" />
    </ALayout>
  </ALayout>
</template>

<style lang="less" scoped>
@space: 15px;
@space-y: 8px;
@radius: 5px;

.app-layout {
  padding: @space;
  background: var(--color-fill-1);
}

.app-sider {
  margin-right: @space;
  height: calc(100vh - (@space * 2));
  border-radius: @radius;
  overflow: hidden;
}

.app-sider :deep(.arco-layout-sider-children) {
  display: flex;
  flex-direction: column;
}

.app-menu {
  flex: auto;
}

.app-header {
  background: var(--color-bg-2);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  border-radius: @radius;
}

.app-breadcrumb {
  padding: @space 0;
}

.app-footer {
  margin-top: @space;
  text-align: center;
  padding: @space-y 0;
}

.app-layout :deep(.arco-card) {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  border-radius: @radius;
}

.app-layout :deep(.arco-card-header) {
  border-bottom: none;
}
</style>
