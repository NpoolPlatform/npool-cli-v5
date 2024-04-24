import { defineStore } from 'pinia'
import { doActionWithError } from '../../../../request'
import { API } from './const'
import {
  GetSimulateStatementsRequest,
  GetSimulateStatementsResponse,
  GetSimulateMiningRewardsRequest,
  GetSimulateMiningRewardsResponse,
  MiningReward,
  Statement,
  GetAppSimulateStatementsRequest,
  GetAppSimulateStatementsResponse
} from './types'
import { formalizeAppID } from '../../../../appuser/app/local'

export const useStatementStore = defineStore('simulate-ledger-statements', {
  state: () => ({
    Statements: new Map<string, Array<Statement>>(),
    MiningRewards: new Map<string, Array<MiningReward>>()
  }),
  getters: {
    statements (): (appID?: string, userID?: string, coinTypeID?: string) => Array<Statement> {
      return (appID?: string, userID?: string, coinTypeID?: string) => {
        appID = formalizeAppID(appID)
        return this.Statements.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    miningRewards (): (appID?: string, userID?: string, coinTypeID?: string, appGoodID?: string, orderID?: string) => Array<MiningReward> {
      return (appID?: string, userID?: string, coinTypeID?: string, appGoodID?: string, orderID?: string) => {
        appID = formalizeAppID(appID)
        return this.MiningRewards.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (appGoodID) ok &&= el.AppGoodID === appGoodID
          if (orderID) ok &&= el.OrderID === orderID
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    miningRewardFloat (): (appID?: string, userID?: string, coinTypeID?: string, orderID?: string) => number {
      return (appID?: string, userID?: string, coinTypeID?: string, orderID?: string) => {
        appID = formalizeAppID(appID)
        let rewards = 0
        this.MiningRewards.get(appID)?.forEach((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (orderID) ok &&= el.OrderID === orderID
          if (ok) {
            rewards += Number(el.RewardAmount)
          }
        })
        return rewards
      }
    }
  },
  actions: {
    addStatements  (appID: string | undefined, statements: Array<Statement>) {
      appID = formalizeAppID(appID)
      let _statements = this.Statements.get(appID) as Array<Statement>
      if (!_statements) {
        _statements = []
      }
      statements.forEach((statement) => {
        const index = _statements.findIndex((el) => el.ID === statement.ID)
        _statements.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, statement)
      })
      this.Statements.set(appID, _statements)
    },
    addMiningRewards (appID: string | undefined, rewards: Array<MiningReward>) {
      appID = formalizeAppID(appID)
      let _rewards = this.MiningRewards.get(appID) as Array<MiningReward>
      if (!_rewards) {
        _rewards = []
      }
      rewards.forEach((reward) => {
        const index = _rewards.findIndex((el) => el.ID === reward.ID)
        _rewards.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, reward)
      })
      this.MiningRewards.set(appID, _rewards)
    },
    getStatements (req: GetSimulateStatementsRequest, done: (error: boolean, rows: Array<Statement>) => void) {
      doActionWithError<GetSimulateStatementsRequest, GetSimulateStatementsResponse>(
        API.GET_SIMULATE_STATEMENTS,
        req,
        req.Message,
        (resp: GetSimulateStatementsResponse): void => {
          this.addStatements(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Statement>)
        }
      )
    },
    getMiningRewards (req: GetSimulateMiningRewardsRequest, done: (error: boolean, rows: Array<MiningReward>) => void) {
      doActionWithError<GetSimulateMiningRewardsRequest, GetSimulateMiningRewardsResponse>(
        API.GET_SIMULATE_MININGREWARDS,
        req,
        req.Message,
        (resp: GetSimulateMiningRewardsResponse): void => {
          this.addMiningRewards(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<MiningReward>)
        }
      )
    },
    getAppStatements (req: GetAppSimulateStatementsRequest, done: (error: boolean, rows?: Array<Statement>) => void) {
      doActionWithError<GetAppSimulateStatementsRequest, GetAppSimulateStatementsResponse>(
        API.GET_APP_SIMULATE_STATEMENTS,
        req,
        req.Message,
        (resp: GetAppSimulateStatementsResponse): void => {
          this.addStatements(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'
