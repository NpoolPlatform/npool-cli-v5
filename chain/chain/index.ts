import { defineStore } from 'pinia'
import { API } from './const'
import {
  Chain,
  GetChainsRequest,
  GetChainsResponse
} from './types'
import { doActionWithError } from '../../request'

export const useChainStore = defineStore('chains', {
  state: () => ({
    Chains: [] as Array<Chain>
  }),
  getters: {
    chain (): (id: number) => Chain | undefined {
      return (id: number) => {
        return this.Chains.find((el) => el.ID === id)
      }
    },
    getChainByChainID (): (chainID: string) => Chain | undefined {
      return (chainID: string) => {
        return this.Chains.find((el) => el.ChainID === chainID)
      }
    },
    chains () {
      return () => {
        return this.Chains
      }
    },
    addChains (): (chains: Array<Chain>) => void {
      return (chains: Array<Chain>) => {
        chains.forEach((chain) => {
          const index = this.Chains.findIndex((el) => el.ID === chain.ID)
          this.Chains.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, chain)
        })
      }
    }
  },
  actions: {
    getChains (req: GetChainsRequest, done: (error: boolean, chains?: Array<Chain>) => void) {
      doActionWithError<GetChainsRequest, GetChainsResponse>(
        API.GET_CHAINS,
        req,
        req.Message,
        (resp: GetChainsResponse): void => {
          this.addChains(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
