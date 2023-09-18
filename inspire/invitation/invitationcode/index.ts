import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse,
  GetInvitationCodesRequest,
  GetInvitationCodesResponse,
  InvitationCode,
  GetAppInvitationCodesRequest,
  GetAppInvitationCodesResponse
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useInvitationCodeStore = defineStore('invitation-codes', {
  state: () => ({
    InvitationCodes: new Map<string, Array<InvitationCode>>()
  }),
  getters: {
    invitationCodes (): (appID?: string) => Array<InvitationCode> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.InvitationCodes.get(appID) || []
      }
    },
    invitationCode (): (appID: string | undefined, userID: string) => InvitationCode | undefined {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.InvitationCodes.get(appID)?.find((el) => el.UserID === userID)
      }
    },
    addInvitationCodes (): (appID: string | undefined, codes: Array<InvitationCode>) => void {
      return (appID: string | undefined, codes: Array<InvitationCode>) => {
        appID = formalizeAppID(appID)
        let _codes = this.InvitationCodes.get(appID) as Array<InvitationCode>
        if (!_codes) {
          _codes = []
        }
        codes.forEach((code) => {
          const index = _codes.findIndex((el) => el.AppID === code.AppID && el.UserID === code.UserID)
          _codes.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, code)
        })
        this.InvitationCodes.set(appID, _codes)
      }
    }
  },
  actions: {
    getInvitationCodes (req: GetInvitationCodesRequest, done: (error: boolean, rows: Array<InvitationCode>) => void) {
      doActionWithError<GetInvitationCodesRequest, GetInvitationCodesResponse>(
        API.GET_INVITATIONCODES,
        req,
        req.Message,
        (resp: GetInvitationCodesResponse): void => {
          this.addInvitationCodes(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<InvitationCode>)
        }
      )
    },
    createInvitationCode (req: CreateInvitationCodeRequest, done: (error: boolean, row: InvitationCode) => void) {
      doActionWithError<CreateInvitationCodeRequest, CreateInvitationCodeResponse>(
        API.CREATE_INVITATIONCODE,
        req,
        req.Message,
        (resp: CreateInvitationCodeResponse): void => {
          this.addInvitationCodes(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as InvitationCode)
        }
      )
    },

    getAppInvitationCodes (req: GetAppInvitationCodesRequest, done: (error: boolean, rows: Array<InvitationCode>) => void) {
      doActionWithError<GetAppInvitationCodesRequest, GetAppInvitationCodesResponse>(
        API.GET_APP_INVITATIONCODES,
        req,
        req.Message,
        (resp: GetAppInvitationCodesResponse): void => {
          this.addInvitationCodes(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<InvitationCode>)
        }
      )
    }
  }
})

export * from './types'
export * from './const'
