<template>
  <div class="nfts-page-list">
    <div v-if="props.nfts.length" class="nfts-page-list__items">
      <nfts-page-item
        v-for="(nft, index) of props.nfts"
        :key="index"
        :link="nft.link"
        :title="nft.title"
      />
    </div>
    <no-data-message
      v-else
      message="Any NFT didn't found"
      :icon-name="$icons.noData"
    />
  </div>
</template>

<script lang="ts" setup>
import { NoDataMessage } from '@/common'
import NftsPageItem from '@/pages/NftsPage/NftsPageItem.vue'
import { NftItem } from '@/types'

const props = defineProps<{
  nfts: NftItem[]
}>()
</script>

<style lang="scss" scoped>
.nfts-page-list {
  position: relative;
  min-height: toRem(540);
  padding: 0 toRem(30);
}

.nfts-page-list__items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: toRem(20);

  @include respond-to(medium) {
    grid-template-columns: repeat(auto-fill, minmax(toRem(280), 1fr));
  }
}
</style>
