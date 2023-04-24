import { computed, ref } from 'vue'
import { EthProviderRpcError } from '@/types'
import { handleEthError, sleep } from '@/helpers'
import { BigNumber } from 'ethers'
import { ABaseNFT__factory } from '@contracts/generated-types/ethers/factories/contracts/token/ABaseNFT__factory'
import { useWeb3ProvidersStore } from '@/store'

export const useErc721 = (address?: string) => {
  const webProvider = useWeb3ProvidersStore()
  const provider = computed(() => webProvider.provider)

  const contractInstance = computed(
    () =>
      (!!provider.value &&
        !!provider.value.currentSigner &&
        !!address &&
        ABaseNFT__factory.connect(address, provider.value.currentSigner)) ||
      undefined,
  )

  const contractInterface = ABaseNFT__factory.createInterface()

  const allowance = ref<BigNumber>()
  const decimals = ref(0)
  const name = ref('')
  const owner = ref('')
  const symbol = ref('')
  const totalSupply = ref<BigNumber>()
  const balance = ref<BigNumber>()

  const loadDetails = async () => {
    try {
      const [_name, _owner, _symbol, _totalSupply, _balance] =
        await Promise.all([
          getName(),
          getOwner(),
          getSymbol(),
          getTotalSupply(),
          getBalanceOf(provider!.value.selectedAddress!),
        ])

      name.value = _name!
      owner.value = _owner!
      symbol.value = _symbol!
      totalSupply.value = _totalSupply!
      balance.value = _balance!
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const approve = async (spender: string, amount: number) => {
    if (!provider.value) return

    try {
      const data = contractInterface.encodeFunctionData('approve', [
        spender,
        amount,
      ])

      const receipt = await provider.value.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const mint = async (to: string, nftId: number, tokenUri: string) => {
    if (!provider.value) return

    try {
      const receipt = await contractInstance.value?.mintTo(to, nftId, tokenUri)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const transfer = async (from: string, to: string, nftId: number | string) => {
    if (!provider.value) return

    try {
      const receipt = await contractInstance.value?.transferFrom(
        from,
        to,
        nftId,
      )
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getTokenOfOwnerByIndex = async (index: string | number) => {
    if (!provider.value) return '0'
    try {
      const a = await contractInstance.value?.getTokenInfo(index)
      return a
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
      return '0'
    }
  }

  const getTokensURIs = async (index: (string | number)[]) => {
    if (!provider.value) return []
    try {
      return contractInstance.value?.getTokensURIs(index) || []
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
      return []
    }
  }

  const getOwnerOfNft = async (index: string | number) => {
    if (!provider.value) return ''
    try {
      return contractInstance.value?.ownerOf(index) || ''
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
      return ''
    }
  }

  const getTokenByIndex = async (index: string | number) => {
    if (!provider.value) return '0'
    try {
      return contractInstance.value?.tokenByIndex(index)
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
      return '0'
    }
  }
  const getApproved = async (index: string | number) => {
    if (!provider.value) return false
    try {
      return contractInstance.value?.getApproved(index)
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
      return false
    }
  }

  const renounceOwnership = async () => {
    if (!provider.value) return

    try {
      const data = contractInterface.encodeFunctionData('renounceOwnership')

      const receipt = await provider.value.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getBalanceOf = async (address: string) => {
    if (!contractInstance.value) return

    try {
      return contractInstance.value?.balanceOf(address)
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getName = async () => {
    if (!contractInstance.value) return

    try {
      return contractInstance.value?.name()
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getOwner = async () => {
    if (!contractInstance.value) return

    try {
      return contractInstance.value?.owner()
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getSymbol = async () => {
    if (!contractInstance.value) return

    try {
      return contractInstance.value?.symbol()
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getTotalSupply = async () => {
    if (!contractInstance.value) return
    try {
      return contractInstance.value?.totalSupply()
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  return {
    allowance,
    decimals,
    name,
    owner,
    symbol,
    totalSupply,
    balance,
    getTokenOfOwnerByIndex,

    loadDetails,

    useErc721,
    approve,

    mint,
    renounceOwnership,
    getTokenByIndex,
    getTokensURIs,
    transfer,
    getApproved,
    getOwnerOfNft,
    getBalanceOf,
    getName,
    getOwner,
    getSymbol,
    getTotalSupply,
  }
}
