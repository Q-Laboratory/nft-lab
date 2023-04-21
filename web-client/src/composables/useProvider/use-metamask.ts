import { ethers } from 'ethers'
import {
  connectEthAccounts,
  getEthExplorerAddressUrl,
  getEthExplorerTxUrl,
  handleEthError,
  requestAddEthChain,
  requestSwitchEthChain,
  isMobileCheck,
} from '@/helpers'
import { computed, ref } from 'vue'
import {
  EthProviderRpcError,
  EthTransactionResponse,
  ChainId,
  ProviderInstance,
  ProviderWrapper,
  TransactionResponse,
  TxRequestBody,
  Chain,
} from '@/types'
import { Deferrable } from '@ethersproject/properties'
import { TransactionRequest } from '@ethersproject/abstract-provider'

export const useMetamask = (provider: ProviderInstance): ProviderWrapper => {
  const chainId = ref<ChainId>('')
  const selectedAddress = ref('')

  const currentProvider = computed(
    () =>
      new ethers.providers.Web3Provider(
        provider as ethers.providers.ExternalProvider,
        'any',
      ),
  )
  const currentSigner = computed(() => currentProvider.value.getSigner())

  const isConnected = computed(() =>
    Boolean(selectedAddress.value && chainId.value),
  )

  const init = async () => {
    _setListeners()
    await _updateProviderState()
  }

  const _setListeners = () => {
    const tempProviderStub = currentProvider.value.provider as {
      on: (eventName: string, cb: () => void) => void
    }

    tempProviderStub.on('accountsChanged', () => {
      _updateProviderState()
    })
    tempProviderStub.on('chainChanged', () => {
      _updateProviderState()
    })
    tempProviderStub.on('disconnect', () => {
      selectedAddress.value = ''
    })
  }

  const _updateProviderState = async () => {
    try {
      const network = await currentProvider.value.detectNetwork()
      chainId.value = network.chainId

      const currentAccounts = await currentProvider.value.listAccounts()
      selectedAddress.value = currentAccounts[0]
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const APP_URL = `https://metamask.app.link/dapp/${window.location.host}`

  const redirect = () => {
    try {
      window.open(APP_URL)
    } catch (error) {
      window.location.reload()
    }
  }
  const connect = async () => {
    try {
      if (isMobileCheck() && !navigator.userAgent.includes('MetaMask')) {
        redirect()
        return
      }
      await connectEthAccounts(currentProvider.value)
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const switchChain = async (chainId: ChainId) => {
    try {
      await requestSwitchEthChain(currentProvider.value, Number(chainId))
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const switchNetwork = async (chainId: ChainId, chain: Chain) => {
    try {
      try {
        await switchChain(Number(chainId))
      } catch (error) {
        if ((error as EthProviderRpcError).code === 4902) {
          try {
            await addChain(chain)
          } catch (error) {
            throw error as EthProviderRpcError
          }
        }
      }
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }
  const addChain = async (chain: Chain) => {
    try {
      await requestAddEthChain(currentProvider.value, chain)
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const signAndSendTransaction = async (txRequestBody: TxRequestBody) => {
    try {
      const transactionResponse = await currentSigner.value.sendTransaction(
        txRequestBody as Deferrable<TransactionRequest>,
      )
      return transactionResponse.wait()
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getHashFromTxResponse = (txResponse: TransactionResponse) => {
    const transactionResponse = txResponse as EthTransactionResponse

    return transactionResponse.transactionHash
  }

  const getTxUrl = (explorerUrl: string, txHash: string) => {
    return getEthExplorerTxUrl(explorerUrl, txHash)
  }

  const getAddressUrl = (explorerUrl: string, address: string) => {
    return getEthExplorerAddressUrl(explorerUrl, address)
  }

  const signMessage = async (message: string) => {
    try {
      const signer = currentProvider.value.getSigner()
      const msg = await signer.signMessage(message)
      return msg
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }
  return {
    currentProvider,
    currentSigner,

    chainId,
    selectedAddress,
    isConnected,

    init,
    connect,
    switchChain,
    addChain,
    switchNetwork,
    signAndSendTransaction,
    getHashFromTxResponse,
    getTxUrl,
    getAddressUrl,
    signMessage,
  }
}
