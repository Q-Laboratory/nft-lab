<template>
  <div class="app-navbar">
    <app-logo class="app-navbar__logo" />
    <span class="app-navbar__name">{{ $config.APP_NAME }}</span>
  </div>
</template>

<script lang="ts" setup>
import { AppLogo } from '@/common'
</script>

<style lang="scss" scoped>
.app-navbar {
  display: flex;
  align-items: center;
  gap: toRem(10);
  padding: toRem(24) var(--app-padding-right) toRem(24) var(--app-padding-left);
  background: var(--app-bg);
  border-bottom: var(--border-primary-main);
}

.app-navbar__name {
  font-weight: 600;
  font-size: toRem(30);
}

.app-navbar__logo {
  width: toRem(40);
}
</style>
