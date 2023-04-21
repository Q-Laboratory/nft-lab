import { ComputedRef, Ref } from 'vue'
import { TransactionRequest } from '@ethersproject/abstract-provider'
import { Deferrable } from '@ethersproject/properties'

import { ethers } from 'ethers'

import { PROVIDERS } from '@/enums'
import { EthereumProvider } from '@/types/ethereum.types'
/**
 * Non defined provider from browser
 */
export type ProviderInstance = EthereumProvider | unknown

/**
 * provider, which we've designated, it has a name and instance
 */
export type DesignatedProvider = {
  name: PROVIDERS
  instance: ProviderInstance
}

export type ChainId = string | number

export type NativeCurrency = {
  name: string
  symbol: string
  decimals: number
}

export type Chain = {
  chainId: ChainId
  chainName: string
  nativeCurrency: NativeCurrency
  rpcUrls: string[]
  blockExplorerUrls?: string[]
}

export type TxRequestBody = Deferrable<TransactionRequest> | string | unknown

export type EthTransactionResponse = ethers.providers.TransactionReceipt

export type TransactionResponse = EthTransactionResponse | unknown

/**
 * composable object of designated provider,
 * which we can use to solve user needs
 */
export interface ProviderWrapper {
  currentProvider?: ComputedRef<ethers.providers.Web3Provider>
  currentSigner?: ComputedRef<ethers.providers.JsonRpcSigner>

  chainId: Ref<ChainId>
  selectedAddress: Ref<string>
  isConnected: ComputedRef<boolean>

  init: () => Promise<void>
  connect: () => Promise<void>
  switchChain: (chainId: ChainId) => Promise<void>
  switchNetwork: (chainId: ChainId, chain: Chain) => Promise<void>
  addChain?: (chainId: Chain) => Promise<void>
  signAndSendTransaction: (
    txRequestBody: TxRequestBody,
  ) => Promise<TransactionResponse>
  getHashFromTxResponse: (txResponse: TransactionResponse) => string
  getTxUrl: (explorerUrl: string, txHash: string) => string
  getAddressUrl: (explorerUrl: string, address: string) => string
  disconnect?: () => Promise<void>
  signMessage?: (message: string) => Promise<string | undefined>
}

export type { UseProvider } from '@/composables'
