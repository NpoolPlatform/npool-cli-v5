import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { User } from '../base'

export const useLocalUserStore = defineStore('local-user', {
  state: () => ({
    User: undefined as unknown as User
  }),
  getters: {
    user () {
      return () => this.User
    },
    selectedLangID (): string {
      return this.User?.SelectedLangID
    },
    logined (): boolean {
      return this.User && this.User.Logined && this.User.LoginVerified
    },
    loginedUserID (): string | undefined {
      return this.User?.EntID
    },
    findInvitationCode () : boolean {
      return this.User && this.User.InvitationCode?.length > 0
    },
    findEmailAddress () : boolean {
      return this.User && this.User.EmailAddress?.length > 0
    },
    findPhoneNO () : boolean {
      return this.User && this.User.PhoneNO?.length > 0
    },
    isKol () : boolean {
      return this.User && this.User?.Kol
    },
    username (): string {
      return this.User?.Username
    },
    gender (): string {
      return this.User?.Gender
    },
    postalCode (): string {
      return this.User?.PostalCode
    },
    firstName (): string {
      return this.User?.FirstName
    },
    lastName (): string {
      return this.User?.LastName
    },
    addressFields (): Array<string> | [] {
      return this.User?.AddressFields || []
    }
  },
  actions: {
    setUser (user: User) {
      this.User = user
      if (user) {
        Cookies.set('X-User-ID', user.EntID, { expires: '4h', secure: true, path: '/' })
        Cookies.set('X-App-Login-Token', user.LoginToken, { expires: '4h', secure: true, path: '/' })
      }
    },
    restUser () {
      Cookies.remove('X-User-ID')
      Cookies.remove('X-App-Login-Token')
      this.User = undefined as unknown as User
    }
  }
})

export const formalizeUserID = (userID?: string) => {
  if (userID) return userID
  const user = useLocalUserStore()
  return user.User?.EntID
}

export const formalizeUserUintID = (id?: number) => {
  if (id) return id
  const user = useLocalUserStore()
  return user.User?.ID
}
