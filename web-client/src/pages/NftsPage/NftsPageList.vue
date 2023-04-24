<template>
  <div class="nfts-page-list">
    <nfts-page-item
      v-for="(nft, index) of props.nfts"
      :key="index"
      :link="nft.link"
      :title="nft.title"
    />
  </div>
</template>

<script lang="ts" setup>
import NftsPageItem from '@/pages/NftsPage/NftsPageItem.vue'
import { NftItem } from '@/types'

const props = defineProps<{
  nfts: NftItem[]
}>()
</script>

<style lang="scss" scoped>
.nfts-page-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(toRem(300), 1fr));
  gap: toRem(20);

  @include respond-to(tablet) {
    grid-template-columns: 1fr;
  }
}
</style>
