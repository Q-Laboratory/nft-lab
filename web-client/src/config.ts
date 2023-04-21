import packageJson from '../package.json'
import { LogLevelDesc } from 'loglevel'
import { pickBy, mapKeys } from 'lodash-es'
import { utils } from 'ethers'

export const config = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  LOG_LEVEL: 'trace' as LogLevelDesc,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_APP_BUILD_VERSION,
  SUPPORTED_CHAIN_ID: import.meta.env.VITE_SUPPORTED_CHAIN_ID,
} as const

Object.assign(config, _mapEnvCfg(import.meta.env))
Object.assign(config, _mapEnvCfg(document.ENV))

function _mapEnvCfg(env: ImportMetaEnv | typeof document.ENV): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (v, k) => k.startsWith('VITE_APP_')),
    (v, k) => k.replace(/^VITE_APP_/, ''),
  )
}

export const DEFAULT_CHAIN = {
  chainId: utils.hexlify(35443),
  chainName: 'Q Testnet',
  rpcUrls: ['https://rpc.qtestnet.org'],
  blockExplorerUrls: ['https://explorer.qtestnet.org'],
  nativeCurrency: {
    name: 'Q',
    symbol: 'Q ',
    decimals: 18,
  },
}
