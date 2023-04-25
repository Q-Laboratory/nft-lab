import { defineStore } from 'pinia'
import { useErc721 } from '@/composables'
import { config } from '@config'

export const useErc721Store = defineStore('web3-erc20-store', () => {
  const erc721 = useErc721(config.ERC721_ADDRESS)
  return { erc721 }
})
