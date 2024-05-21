import { doActionWithError } from '../../request'
import { defineStore } from 'pinia'
import { API } from './const'
import {
  FractionRule,
  AdminCreateFractionRuleRequest,
  AdminCreateFractionRuleResponse,
  AdminUpdateFractionRuleRequest,
  AdminUpdateFractionRuleResponse,
  AdminGetFractionRulesRequest,
  AdminGetFractionRulesResponse
} from './types'

export const useMiningpoolFractionRuleStore = defineStore('miningpool-fractionrules', {
  state: () => ({
    FractionRules: [] as Array<FractionRule>
  }),
  getters: {
    fractionrule (): (id: string) => FractionRule | undefined {
      return (id: string) => {
        return this.FractionRules.find((el: FractionRule) => el.EntID === id)
      }
    },
    fractionrules () {
      return () => {
        return this.FractionRules
      }
    }
  },
  actions: {
    addFractionRules (goods: Array<FractionRule>) {
      goods.forEach((good) => {
        const index = this.FractionRules.findIndex((el: FractionRule) => el.EntID === good.EntID)
        this.FractionRules.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, good)
      })
    },
    getFractionRules (req: AdminGetFractionRulesRequest, done: (error: boolean, row?: Array<FractionRule>) => void) {
      doActionWithError<AdminGetFractionRulesRequest, AdminGetFractionRulesResponse>(
        API.ADMIN_GET_FRACTIONRULES,
        req,
        req.Message,
        (resp: AdminGetFractionRulesResponse): void => {
          this.addFractionRules(resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateFractionRule (req: AdminUpdateFractionRuleRequest, done: (error: boolean, row?: FractionRule) => void) {
      doActionWithError<AdminUpdateFractionRuleRequest, AdminUpdateFractionRuleResponse>(
        API.ADMIN_UPDATE_FRACTIONRULE,
        req,
        req.Message,
        (resp: AdminUpdateFractionRuleResponse): void => {
          this.addFractionRules([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    createFractionRule (req: AdminCreateFractionRuleRequest, done: (error: boolean, row?: FractionRule) => void) {
      doActionWithError<AdminCreateFractionRuleRequest, AdminCreateFractionRuleResponse>(
        API.ADMIN_CREATE_FRACTIONRULE,
        req,
        req.Message,
        (resp: AdminCreateFractionRuleResponse): void => {
          this.addFractionRules([resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './const'
export * from './types'
