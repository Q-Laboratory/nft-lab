import { PROVIDERS } from '@/enums'
import { computed, ComputedRef, Ref, ref } from 'vue'
import { useMetamask } from '@/composables'
import {
  DesignatedProvider,
  ChainId,
  ProviderWrapper,
  TransactionResponse,
  TxRequestBody,
  Chain,
} from '@/types'
import { errors } from '@/errors'
import { ethers } from 'ethers'

export interface UseProvider {
  currentProvider: ComputedRef<ethers.providers.Web3Provider | undefined>
  currentSigner: ComputedRef<ethers.providers.JsonRpcSigner | undefined>

  selectedProvider: Ref<PROVIDERS | undefined>
  chainId: ComputedRef<ChainId | undefined>
  selectedAddress: ComputedRef<string | undefined>
  isConnected: ComputedRef<boolean>

  init: (provider: DesignatedProvider) => Promise<void>
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  switchNetwork: (chainId: ChainId, chain: Chain) => Promise<void>
  switchChain: (chainId: ChainId) => Promise<void>
  addChain: (chain: Chain) => Promise<void>
  signAndSendTx: (txRequestBody: TxRequestBody) => Promise<TransactionResponse>
  getHashFromTxResponse: (txResponse: TransactionResponse) => string
  getTxUrl: (explorerUrl: string, txHash: string) => string
  getAddressUrl: (explorerUrl: string, address: string) => string
  signMessage: (message: string) => Promise<string | undefined>
}

export const useProvider = (): UseProvider => {
  const providerWrp = ref<ProviderWrapper | undefined>()

  const currentProvider = computed(
    () =>
      providerWrp.value
        ?.currentProvider as unknown as ethers.providers.Web3Provider,
  )
  const currentSigner = computed(
    () =>
      providerWrp.value
        ?.currentSigner as unknown as ethers.providers.JsonRpcSigner,
  )

  const selectedProvider = ref<PROVIDERS | undefined>()
  const chainId = computed(
    () => providerWrp.value?.chainId as ChainId | undefined,
  )
  const selectedAddress = computed(
    () => providerWrp.value?.selectedAddress as string | undefined,
  )
  const isConnected = computed(() =>
    Boolean(chainId.value && selectedAddress.value),
  )

  const init = async (provider: DesignatedProvider) => {
    switch (provider.name as PROVIDERS) {
      case PROVIDERS.metamask:
        providerWrp.value = useMetamask(provider.instance)
        break
      default:
        throw new Error('Invalid Provider')
    }
    selectedProvider.value = provider.name
    await providerWrp.value.init()
  }

  const connect = async () => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()
    await providerWrp.value.connect()
  }

  const disconnect = async () => {
    if (providerWrp.value?.disconnect) {
      await providerWrp.value.disconnect()
    } else {
      providerWrp.value = undefined
    }
  }

  const switchChain = async (chainId: ChainId) => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    await providerWrp.value.switchChain(chainId)
  }

  const switchNetwork = async (chainId: ChainId, chain: Chain) => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    await providerWrp.value.switchNetwork(chainId, chain)
  }
  const addChain = async (chain: Chain) => {
    if (!providerWrp.value || !providerWrp.value?.addChain)
      throw new errors.ProviderWrapperMethodNotFoundError()

    await providerWrp.value.addChain(chain)
  }

  const signAndSendTx = async (
    txRequestBody: TxRequestBody,
  ): Promise<TransactionResponse> => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.signAndSendTransaction(txRequestBody)
  }

  const getHashFromTxResponse = (txResponse: TransactionResponse): string => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.getHashFromTxResponse(txResponse)
  }

  const getTxUrl = (explorerUrl: string, txHash: string): string => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.getTxUrl(explorerUrl, txHash)
  }

  const getAddressUrl = (explorerUrl: string, address: string): string => {
    if (!providerWrp.value)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.getAddressUrl(explorerUrl, address)
  }

  const signMessage = async (message: string) => {
    if (!providerWrp.value?.signMessage)
      throw new errors.ProviderWrapperMethodNotFoundError()

    return providerWrp.value.signMessage(message)
  }

  return {
    currentProvider,
    currentSigner,

    selectedProvider,
    chainId,
    selectedAddress,
    isConnected,

    init,
    connect,
    disconnect,
    switchChain,
    switchNetwork,
    addChain,
    signAndSendTx,
    getHashFromTxResponse,
    getTxUrl,
    getAddressUrl,
    signMessage,
  }
}
