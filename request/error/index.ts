import { defineStore } from 'pinia'
import { SwitchTarget } from './const'
import { ErrorTarget } from './types'
import { ErrorSwitcherState } from './state'

export const useErrorStore = defineStore('requesterror', {
  state: (): ErrorSwitcherState => ({
    ErrorTargets: [
      {
        ErrorCode: 403,
        Target: SwitchTarget.LOGIN
      }
    ],
    ErrorTrigger: undefined as unknown as ErrorTarget
  }),
  getters: {},
  actions: {}
})

export * from './const'
export * from './types'
