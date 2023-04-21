import { computed, ref } from 'vue'
import { UseProvider, Erc20__factory, EthProviderRpcError } from '@/types'
import { handleEthError, sleep } from '@/helpers'
import { BigNumber } from 'ethers'

export const useErc20 = (provider?: UseProvider, address?: string) => {
  const contractInstance = computed(
    () =>
      (!!provider &&
        !!provider.currentProvider.value &&
        !!address &&
        Erc20__factory.connect(address, provider.currentProvider.value)) ||
      undefined,
  )

  const contractInterface = Erc20__factory.createInterface()

  const allowance = ref<BigNumber>()
  const decimals = ref(0)
  const name = ref('')
  const owner = ref('')
  const symbol = ref('')
  const totalSupply = ref<BigNumber>()
  const balance = ref<BigNumber>()

  const loadDetails = async () => {
    try {
      const [_decimals, _name, _owner, _symbol, _totalSupply, _balance] =
        await Promise.all([
          getDecimals(),
          getName(),
          getOwner(),
          getSymbol(),
          getTotalSupply(),
          getBalanceOf(provider!.selectedAddress.value!),
        ])

      decimals.value = _decimals!
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
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('approve', [
        spender,
        amount,
      ])

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const decreaseAllowance = async (
    spender: string,
    subtractedValue: number,
  ) => {
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('decreaseAllowance', [
        spender,
        subtractedValue,
      ])

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const increaseAllowance = async (spender: string, addedValue: number) => {
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('increaseAllowance', [
        spender,
        addedValue,
      ])

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const mint = async (to: string, amount: number) => {
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('mint', [to, amount])

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const renounceOwnership = async () => {
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('renounceOwnership')

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const transfer = async (address: string, amount: number) => {
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('transfer', [
        address,
        amount,
      ])

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const transferFrom = async (from: string, to: string, amount: number) => {
    if (!provider) return

    try {
      const data = contractInterface.encodeFunctionData('transferFrom', [
        from,
        to,
        amount,
      ])

      const receipt = await provider.signAndSendTx({
        to: address,
        data,
      })

      await sleep(1000)
      return receipt
    } catch (error) {
      handleEthError(error as EthProviderRpcError)
    }
  }

  const getAllowance = async (owner: string, spender: string) => {
    if (!contractInstance.value) return

    try {
      return contractInstance.value?.allowance(owner, spender)
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

  const getDecimals = async () => {
    if (!contractInstance.value) return

    try {
      return contractInstance.value?.decimals()
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

    loadDetails,

    useErc20,
    approve,
    decreaseAllowance,
    increaseAllowance,
    mint,
    renounceOwnership,
    transfer,
    transferFrom,

    getAllowance,
    getBalanceOf,
    getDecimals,
    getName,
    getOwner,
    getSymbol,
    getTotalSupply,
  }
}
