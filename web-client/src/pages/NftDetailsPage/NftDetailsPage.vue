<template>
  <div class="nft-details-page">
    <app-button
      scheme="default"
      size="large"
      :route="{ name: $routes.nfts }"
      :icon-left="$icons.chevronLeft"
      :text="$t('nft-details-page.back-btn')"
    />
    <nft-details-page-description :nft="nftDetails" @save="init" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AppButton } from '@/common'
import { useErc721Store } from '@/store'
import { ErrorHandler } from '@/helpers'
import { NftDetails } from '@/types'
import { useRoute } from 'vue-router'
import { config } from '@config'
import NftDetailsPageDescription from './NftDetailsPageDescription.vue'

const route = useRoute()
const { erc721 } = useErc721Store()
const nftDetails = ref<NftDetails | undefined>()

const init = async () => {
  try {
    if (!route.params.id) {
      throw new TypeError('User not found')
    }

    const nftId = route.params.id as string
    const [tokensURIs, owner, tokenName] = await Promise.all([
      erc721.getTokensURIs([nftId]),
      erc721.getOwnerOfNft(nftId),
      erc721.getName(),
    ])

    nftDetails.value = {
      owner,
      id: nftId,
      link: tokensURIs[0],
      address: config.ERC721_ADDRESS,
      name: tokenName!,
    }
  } catch (error) {
    ErrorHandler.process(error)
  }
}

init()
</script>

<style lang="scss" scoped>
.nft-details-page {
  display: grid;
  grid-gap: toRem(50);
  padding-bottom: toRem(200);
}
</style>
