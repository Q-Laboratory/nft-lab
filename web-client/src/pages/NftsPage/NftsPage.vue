<template>
  <div class="nfts-page">
    <nfts-page-actions
      :owner="contractOwner"
      @save="loadNftData"
      @filter="filterNftList"
    />
    <nfts-page-list :nfts="nftList" />
  </div>
</template>

<script lang="ts" setup>
import NftsPageList from '@/pages/NftsPage/NftsPageList.vue'
import NftsPageActions from '@/pages/NftsPage/NftsPageActions.vue'
import { useErc721Store } from '@/store'
import { ErrorHandler } from '@/helpers'
import { ref } from 'vue'
import { NftItem } from '@/types'

const { erc721 } = useErc721Store()
const nftList = ref<NftItem[]>([])
const contractOwner = ref('')

const loadNftData = async () => {
  try {
    contractOwner.value = (await erc721.getOwner()) || ''
    const totalSupply = await erc721.getTotalSupply()
    const nftListId = await Promise.all(
      new Array(totalSupply?.toNumber()).fill(null).map(async (_, index) => {
        const nft = await erc721.getTokenByIndex(index)
        return nft?.toString() || ''
      }),
    )
    const tokenOwners = await Promise.all(
      nftListId.map(async id => {
        return erc721.getOwnerOfNft(id)
      }),
    )
    const tokensURIs = await erc721.getTokensURIs(nftListId)
    nftList.value = tokensURIs.map((item, index) => ({
      link: item,
      title: nftListId[index],
      owner: tokenOwners[index],
    }))
  } catch (error) {
    ErrorHandler.process(error)
  }
}

const filterNftList = async (address: string) => {
  try {
    await loadNftData()
    nftList.value = address
      ? nftList.value.filter(item => item.owner === address)
      : nftList.value
  } catch (error) {
    ErrorHandler.process(error)
  }
}

loadNftData()
</script>

<style lang="scss" scoped>
.nfts-page {
  display: flex;
  flex-direction: column;
  gap: toRem(50);
  padding-bottom: toRem(200);
}
</style>
