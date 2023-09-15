import { defineStore } from 'pinia'
import { App } from '../base'

export const useMyApplicationStore = defineStore('my-application', {
  state: () => ({
    App: undefined as unknown as App,
    AppID: undefined as unknown as string
  }),
  getters: {
    getAppID (): string | undefined {
      return this.App?.ID ? this.App?.ID : this.AppID
    }
  },
  actions: {}
})

export const formalizeAppID = (appID?: string) => {
  if (appID) {
    return appID
  }
  const myApp = useMyApplicationStore()
  return myApp.AppID
}
