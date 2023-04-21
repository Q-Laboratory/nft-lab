<template>
  <div class="connect-page">
    <nft-page-search />
    <nft-page-list />
  </div>
</template>

<script lang="ts" setup>
import NftPageList from '@/pages/NftPage/NftPageList.vue'
import NftPageSearch from '@/pages/NftPage/NftPageSearch.vue'
</script>

<style lang="scss" scoped>
.connect-page {
  display: grid;
  grid-gap: toRem(50);
  padding-bottom: toRem(200);
}

.connect-page__info-title-wrapper,
.connect-page__title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(12);
}

.connect-page__title {
  font-size: toRem(48);
  color: var(--text-primary-main);
}

.connect-page__subtitle {
  font-size: toRem(16);
  font-weight: 400;
  color: var(--text-secondary-main);
  max-width: toRem(700);
  text-align: center;
}

.connect-page__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(24);
  background: var(--white);
  padding: toRem(32);
  box-shadow: 0 toRem(4) toRem(40) var(--shadow-primary);
  border-radius: toRem(16);
}

.connect-page__info-title {
  font-weight: 500;
  font-size: toRem(40);
}

.connect-page__info-subtitle {
  color: var(--text-secondary-main);
  font-size: toRem(16);
}
</style>
