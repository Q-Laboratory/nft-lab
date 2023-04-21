import { defineStore } from 'pinia'
import { useWeb3, useProvider } from '@/composables'
import { DesignatedProvider } from '@/types'
import { config } from '@/config'

export const useWeb3ProvidersStore = defineStore('web3-providers-store', {
  state: () => ({
    providers: [] as DesignatedProvider[],
    provider: useProvider(),
  }),
  actions: {
    async detectProviders() {
      const web3 = useWeb3()
      await web3.init()
      this.providers = web3.providers.value
    },
  },
  getters: {
    isValidChain: state => {
      return (
        String(state.provider.chainId).toLowerCase() ===
        config.SUPPORTED_CHAIN_ID.toLowerCase()
      )
    },
  },
})
