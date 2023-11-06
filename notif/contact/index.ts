import { defineStore } from 'pinia'
import { doActionWithError } from '../../request'
import { API } from './const'
import {
  Contact,
  ContactViaEmailRequest,
  ContactViaEmailResponse,
  CreateContactRequest,
  CreateContactResponse,
  GetContactsRequest,
  GetContactsResponse,
  UpdateContactRequest,
  UpdateContactResponse,
  CreateAppContactRequest,
  CreateAppContactResponse,
  GetAppContactsRequest,
  GetAppContactsResponse,
  UpdateAppContactRequest,
  UpdateAppContactResponse
} from './types'
import { formalizeAppID } from '../../appuser/app/local'

export const useContactStore = defineStore('contacts', {
  state: () => ({
    Contacts: new Map<string, Array<Contact>>()
  }),
  getters: {
    contacts (): (appID?: string) => Array<Contact> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Contacts.get(appID)?.sort((a, b) => a.UsedFor.localeCompare(b.UsedFor, 'zh-CN')) || []
      }
    },
    addContacts (): (appID: string | undefined, contacts: Array<Contact>) => void {
      return (appID: string | undefined, contacts: Array<Contact>) => {
        appID = formalizeAppID(appID)
        let _contacts = this.Contacts.get(appID) as Array<Contact>
        if (!_contacts) {
          _contacts = []
        }
        contacts.forEach((contact) => {
          const index = _contacts.findIndex((el) => el.ID === contact.ID)
          _contacts.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0, contact)
        })
        this.Contacts.set(appID, _contacts)
      }
    }
  },
  actions: {
    contactVIAEmail (req: ContactViaEmailRequest, done: (error: boolean) => void) {
      doActionWithError<ContactViaEmailRequest, ContactViaEmailResponse>(
        API.CONTACT_VIAEMAIL,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        })
    },

    createContact (req: CreateContactRequest, done: (error: boolean, contact?: Contact) => void) {
      doActionWithError<CreateContactRequest, CreateContactResponse>(
        API.CREATE_CONTACT,
        req,
        req.Message,
        (resp: CreateContactResponse): void => {
          this.addContacts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getContacts (req: GetContactsRequest, done: (error: boolean, contacts?: Array<Contact>) => void) {
      doActionWithError<GetContactsRequest, GetContactsResponse>(
        API.GET_CONTACTS,
        req,
        req.Message,
        (resp: GetContactsResponse): void => {
          this.addContacts(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateContact (req: UpdateContactRequest, done: (error: boolean, contact?: Contact) => void) {
      doActionWithError<UpdateContactRequest, UpdateContactResponse>(
        API.UPDATE_CONTACT,
        req,
        req.Message,
        (resp: UpdateContactResponse): void => {
          this.addContacts(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },

    createAppContact (req: CreateAppContactRequest, done: (error: boolean, contact?: Contact) => void) {
      doActionWithError<CreateAppContactRequest, CreateAppContactResponse>(
        API.CREATE_APP_CONTACT,
        req,
        req.Message,
        (resp: CreateAppContactResponse): void => {
          this.addContacts(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    },
    getAppContacts (req: GetAppContactsRequest, done: (error: boolean, contacts?: Array<Contact>) => void) {
      doActionWithError<GetAppContactsRequest, GetAppContactsResponse>(
        API.GET_APP_CONTACTS,
        req,
        req.Message,
        (resp: GetAppContactsResponse): void => {
          this.addContacts(req.TargetAppID, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true)
        })
    },
    updateAppContact (req: UpdateAppContactRequest, done: (error: boolean, contact?: Contact) => void) {
      doActionWithError<UpdateAppContactRequest, UpdateAppContactResponse>(
        API.UPDATE_APP_CONTACT,
        req,
        req.Message,
        (resp: UpdateAppContactResponse): void => {
          this.addContacts(req.TargetAppID, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
export * from './const'
