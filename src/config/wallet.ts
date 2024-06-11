import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { polygon, sepolia } from 'wagmi/chains'
import { DEV_MODE, PROJECT_ID } from './env'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

export const chains = DEV_MODE
  ? ([sepolia] as const)
  : ([polygon] as const)

export const config = defaultWagmiConfig({
  chains,
  projectId: PROJECT_ID,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
