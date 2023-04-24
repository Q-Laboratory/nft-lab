<template>
  <div class="nft-details-page">
    <app-button
      scheme="default"
      class="nft-details-page__back-btn"
      :route="{ name: $routes.nfts }"
      :icon-left="$icons.chevronLeft"
      :text="$t('nft-details-page.back-btn')"
    />
    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message
          class="app__page-error-message"
          :message="$t('nft-details-page.loading-error-msg')"
        />
      </template>
      <template v-else-if="nftDetails">
        <nft-details-page-description :nft="nftDetails" @save="init" />
      </template>
      <template v-else>
        <no-data-message
          class="app__page-no-data-message"
          :message="$t('nft-details-page.no-data-msg')"
          :icon-name="$icons.noData"
        />
      </template>
    </template>
    <template v-else>
      <loader class="app__page-loader" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NoDataMessage, Loader, ErrorMessage, AppButton } from '@/common'
import { useErc721Store } from '@/store'
import { ErrorHandler } from '@/helpers'
import { NftDetails } from '@/types'
import { useRoute } from 'vue-router'
import { config } from '@config'
import NftDetailsPageDescription from './NftDetailsPageDescription.vue'

const route = useRoute()
const { erc721 } = useErc721Store()
const nftDetails = ref<NftDetails | undefined>()
const isLoaded = ref(false)
const isLoadFailed = ref(false)

const init = async () => {
  isLoaded.value = false
  isLoadFailed.value = false
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
    isLoadFailed.value = true
  }
  isLoaded.value = true
}

init()
</script>

<style lang="scss" scoped>
.nft-details-page {
  display: flex;
  flex-direction: column;
  gap: toRem(20);
}

.nft-details-page__back-btn {
  max-height: toRem(30);
}
</style>
