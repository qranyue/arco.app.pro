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
          <Suspense>
            <template #fallback>
              <ASpin :size="64" loading></ASpin>
            </template>
            <component :is="Component" />
          </Suspense>
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
  background: var(--color-fill-1);
  padding: @space;
}

.app-sider {
  margin-right: @space;
  border-radius: @radius;
  height: calc(100vh - (@space * 2));
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
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  border-radius: @radius;
  background: var(--color-bg-2);
}

.app-breadcrumb {
  padding: @space 0;
}

.app-footer {
  margin-top: @space;
  padding: @space-y 0;
  text-align: center;
}

.app-layout :deep(.arco-card) {
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
  border-radius: @radius;
}

.app-layout :deep(.arco-card-header) {
  border-bottom: none;
}
</style>
