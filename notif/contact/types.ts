import { SignMethodType } from '../../appuser/base'
import { EventType } from '../../base'
import { BaseRequest } from '../../request'

export interface Contact {
  ID: number
  EntID: string
  AppID: string
  Account: string
  AccountType: SignMethodType
  UsedFor: EventType
  Sender: string
  CreatedAt: number
  UpdatedAt: number
}

export interface ContactViaEmailRequest extends BaseRequest {
  UsedFor: EventType
  Sender: string
  Subject: string
  Body: string
  SenderName: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ContactViaEmailResponse {
}

export interface CreateContactRequest extends BaseRequest {
  UsedFor: EventType
  Account: string
  AccountType: SignMethodType
  Sender: string
}

export interface CreateContactResponse {
  Info: Contact
}

export interface GetContactRequest extends BaseRequest {
  ID: number
}

export interface GetContactResponse {
  Info: Contact
}

export interface GetContactsRequest extends BaseRequest {
  Offset: number
  Limit: number
}

export interface GetContactsResponse {
  Infos: Array<Contact>
  Total: number
}

export interface UpdateContactRequest extends BaseRequest {
  ID: number
  Account: string
  AccountType: SignMethodType
  Sender: string
}

export interface UpdateContactResponse {
  Info: Contact
}

export interface CreateAppContactRequest extends BaseRequest {
  TargetAppID: string
  UsedFor: EventType
  Account: string
  AccountType: SignMethodType
  Sender: string
}

export interface CreateAppContactResponse {
  Info: Contact
}

export interface GetAppContactsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppContactsResponse {
  Infos: Array<Contact>
  Total: number
}

export interface UpdateAppContactRequest extends BaseRequest {
  TargetAppID: string
  ID: number
  UsedFor: EventType
  Account: string
  AccountType: SignMethodType
  Sender: string
  AppID: string
}

export interface UpdateAppContactResponse {
  Info: Contact
}
