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

export const useFrontendContactStore = defineStore('contacts', {
  state: () => ({
    Contacts: new Map<string, Array<Contact>>()
  }),
  getters: {
    contacts (): (appID?: string) => Array<Contact> {
      return (appID?: string) => {
        appID = formalizeAppID(appID)
        return this.Contacts.get(appID) || []
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

    createContact (req: CreateContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<CreateContactRequest, CreateContactResponse>(
        API.CREATE_CONTACT,
        req,
        req.Message,
        (resp: CreateContactResponse): void => {
          this.addContacts(undefined, [resp.Info])
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
        })
    },
    getContacts (req: GetContactsRequest, done: (contacts: Array<Contact>, error: boolean) => void) {
      doActionWithError<GetContactsRequest, GetContactsResponse>(
        API.GET_CONTACTS,
        req,
        req.Message,
        (resp: GetContactsResponse): void => {
          this.addContacts(undefined, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateContact (req: UpdateContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<UpdateContactRequest, UpdateContactResponse>(
        API.UPDATE_CONTACT,
        req,
        req.Message,
        (resp: UpdateContactResponse): void => {
          this.addContacts(undefined, [resp.Info])
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
        })
    },

    createAppContact (req: CreateAppContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<CreateAppContactRequest, CreateAppContactResponse>(
        API.CREATE_APP_CONTACT,
        req,
        req.Message,
        (resp: CreateAppContactResponse): void => {
          this.addContacts(req.TargetAppID, [resp.Info])
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
        })
    },
    getAppContacts (req: GetAppContactsRequest, done: (contacts: Array<Contact>, error: boolean) => void) {
      doActionWithError<GetAppContactsRequest, GetAppContactsResponse>(
        API.GET_APP_CONTACTS,
        req,
        req.Message,
        (resp: GetAppContactsResponse): void => {
          this.addContacts(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppContact (req: UpdateAppContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<UpdateAppContactRequest, UpdateAppContactResponse>(
        API.UPDATE_APP_CONTACT,
        req,
        req.Message,
        (resp: UpdateAppContactResponse): void => {
          this.addContacts(req.TargetAppID, [resp.Info])
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
        })
    }
  }
})
