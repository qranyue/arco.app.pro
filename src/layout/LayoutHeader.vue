<template>
  <APageHeader :show-back="false">
    <template #extra>
      <ADropdown position="br">
        <template #content>
          <ADoption>
            <template #icon><IconPoweroff /></template>
            <ATypographyText>退出登录</ATypographyText>
          </ADoption>
        </template>
        <AButton shape="circle"><IconUser /></AButton>
      </ADropdown>
    </template>
  </APageHeader>
</template>
