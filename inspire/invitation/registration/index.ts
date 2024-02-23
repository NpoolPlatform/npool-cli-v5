import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetUserRegistrationsRequest,
  GetUserRegistrationsResponse,
  GetRegistrationsRequest,
  GetRegistrationsResponse,
  Registration,
  UpdateRegistrationRequest,
  UpdateRegistrationResponse,
  GetAppRegistrationsRequest,
  GetAppRegistrationsResponse
} from './types'
import { doActionWithError } from '../../../request'
import { formalizeAppID } from '../../../appuser/app/local'

export const useRegistrationStore = defineStore('registrations', {
  state: () => ({
    Registrations: new Map<string, Array<Registration>>()
  }),
  getters: {
    registrations (): (appID?: string, userID?: string) => Array<Registration> {
      return (appID?: string, userID?: string) => {
        appID = formalizeAppID(appID)
        return this.Registrations.get(appID)?.filter((el) => !userID || el.InviterID === userID || el.InviteeID === userID) || []
      }
    },
    inviter (): (appID: string | undefined, userID: string) => Registration | undefined {
      return (appID?: string, userID?: string) => {
        appID = formalizeAppID(appID)
        return this.Registrations.get(appID)?.find((el) => el.InviteeID === userID)
      }
    },
    invitees (): (appID: string | undefined, userID: string) => Array<Registration> {
      return (appID: string | undefined, userID: string) => {
        appID = formalizeAppID(appID)
        return this.Registrations.get(appID)?.filter((el) => el.InviterID === userID) || []
      }
    },
    addRegistrations (): (appID: string | undefined, registrations: Array<Registration>) => void {
      return (appID: string | undefined, registrations: Array<Registration>) => {
        appID = formalizeAppID(appID)
        let _registrations = this.Registrations.get(appID) as Array<Registration>
        if (!_registrations) {
          _registrations = []
        }
        registrations.forEach((registration) => {
          const index = _registrations.findIndex((el) => el.ID === registration.ID)
          _registrations.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, registration)
        })
        this.Registrations.set(appID, _registrations)
      }
    }
  },
  actions: {
    getRegistrations (req: GetRegistrationsRequest, done: (error: boolean, rows: Array<Registration>) => void) {
      doActionWithError<GetRegistrationsRequest, GetRegistrationsResponse>(
        API.GET_REGISTRATIONINVITATIONS,
        req,
        req.Message,
        (resp: GetRegistrationsResponse): void => {
          this.addRegistrations(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Registration>)
        }
      )
    },
    getUserRegistrations (req: GetUserRegistrationsRequest, done: (error: boolean, rows: Array<Registration>) => void) {
      doActionWithError<GetUserRegistrationsRequest, GetUserRegistrationsResponse>(
        API.GET_USER_REGISTRATIONINVITATIONS,
        req,
        req.Message,
        (resp: GetUserRegistrationsResponse): void => {
          this.addRegistrations(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Registration>)
        }
      )
    },
    updateRegistration (req: UpdateRegistrationRequest, done: (error: boolean, row: Registration) => void) {
      doActionWithError<UpdateRegistrationRequest, UpdateRegistrationResponse>(
        API.UPDATE_REGISTRATIONINVITATION,
        req,
        req.Message,
        (resp: UpdateRegistrationResponse): void => {
          this.addRegistrations(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Registration)
        }
      )
    },
    getAppRegistrations (req: GetAppRegistrationsRequest, done: (error: boolean, rows: Array<Registration>) => void) {
      doActionWithError<GetAppRegistrationsRequest, GetAppRegistrationsResponse>(
        API.GET_APP_REGISTRATIONINVITATIONS,
        req,
        req.Message,
        (resp: GetAppRegistrationsResponse): void => {
          this.addRegistrations(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Registration>)
        }
      )
    }
  }
})

export * from './types'
export * from './const'
