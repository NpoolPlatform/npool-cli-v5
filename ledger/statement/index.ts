import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API, IOSubType, IOType } from './const'
import {
  GetStatementsRequest,
  GetStatementsResponse,
  GetMiningRewardsRequest,
  GetMiningRewardsResponse,
  MiningReward,
  Statement,
  GetAppStatementsRequest,
  GetAppStatementsResponse,
  CreateAppUserDepositRequest,
  CreateAppUserDepositResponse
} from './types'
import { formalizeAppID } from '../../appuser/app/local'

export const useStatementStore = defineStore('ledger-statements', {
  state: () => ({
    Statements: new Map<string, Array<Statement>>(),
    MiningRewards: new Map<string, Array<MiningReward>>()
  }),
  getters: {
    statements (): (appID?: string, userID?: string, coinTypeID?: string, ioType?: IOType, ioSubType?: IOSubType) => Array<Statement> {
      return (appID?: string, userID?: string, coinTypeID?: string, ioType?: IOType, ioSubType?: IOSubType) => {
        appID = formalizeAppID(appID)
        return this.Statements.get(appID)?.filter((el) => {
          let ok = true
          if (userID) ok &&= el.UserID === userID
          if (coinTypeID) ok &&= el.CoinTypeID === coinTypeID
          if (ioType) ok &&= el.IOType === ioType
          if (ioSubType) ok &&= el.IOSubType === ioSubType
          return ok
        }).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1) || []
      }
    },
    statement (): (appID: string | undefined, statementID: string) => Statement | undefined {
      return (appID: string | undefined, statementID: string) => {
        appID = formalizeAppID(appID)
        return this.Statements.get(appID)?.find((el) => el.EntID === statementID)
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
    getStatements (req: GetStatementsRequest, done: (error: boolean, rows: Array<Statement>) => void) {
      doActionWithError<GetStatementsRequest, GetStatementsResponse>(
        API.GET_STATEMENTS,
        req,
        req.Message,
        (resp: GetStatementsResponse): void => {
          this.addStatements(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Statement>)
        }
      )
    },
    getMiningRewards (req: GetMiningRewardsRequest, done: (error: boolean, rows: Array<MiningReward>) => void) {
      doActionWithError<GetMiningRewardsRequest, GetMiningRewardsResponse>(
        API.GET_MININGREWARDS,
        req,
        req.Message,
        (resp: GetMiningRewardsResponse): void => {
          this.addMiningRewards(undefined, resp.Infos)
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<MiningReward>)
        }
      )
    },
    getAppStatements (req: GetAppStatementsRequest, done: (error: boolean, rows?: Array<Statement>) => void) {
      doActionWithError<GetAppStatementsRequest, GetAppStatementsResponse>(
        API.GET_APP_STATEMENTS,
        req,
        req.Message,
        (resp: GetAppStatementsResponse): void => {
          this.addStatements(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    createAppUserDeposit (req: CreateAppUserDepositRequest, done: (error: boolean, row?: Statement) => void) {
      doActionWithError<CreateAppUserDepositRequest, CreateAppUserDepositResponse>(
        API.CREATE_APP_USER_DEPOSIT,
        req,
        req.Message,
        (resp: CreateAppUserDepositResponse): void => {
          this.addStatements(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'
