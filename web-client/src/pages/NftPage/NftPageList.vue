<template>
  <div class="ntf-page-list">
    <div class="ntf-page-list__items">
      <nft-page-item v-for="{ a, index } in nfts" :key="index" :name="a" />
    </div>

    <app-button
      :text="$t('connect-page.connect-btn')"
      @click="provider.switchNetwork(config.SUPPORTED_CHAIN_ID, DEFAULT_CHAIN)"
    />
  </div>
</template>

<script lang="ts" setup>
import { AppButton } from '@/common'
import { useWeb3ProvidersStore } from '@/store'
import { DEFAULT_CHAIN, config } from '@/config'
import NftPageItem from '@/pages/NftPage/NftPageItem.vue'

const { provider } = useWeb3ProvidersStore()
const nfts = []
</script>

<style lang="scss" scoped>
.ntf-page-list {
  display: flex;
  gap: toRem(10);
}

.ntf-page-list__items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: toRem(20);

  @include respond-to(medium) {
    grid-template-columns: repeat(auto-fill, minmax(toRem(280), 1fr));
  }
}
</style>
