import { defineStore } from 'pinia'
import { App } from '../base'

export const useLocalApplicationStore = defineStore('local-application', {
  state: () => ({
    MyApp: undefined as unknown as App,
    MyAppID: undefined as unknown as string,
    CurrentApp: undefined as unknown as App,
    CurrentAppID: undefined as unknown as string
  }),
  getters: {
    myAppID (): string | undefined {
      return this.MyAppID
    },
    myApp (): App | undefined {
      return this.MyApp
    },
    currentAppID (): string | undefined {
      return this.CurrentAppID
    },
    currentApp (): App | undefined {
      return this.currentApp
    }
  },
  actions: {}
})

export const formalizeAppID = (appID?: string) => {
  if (appID) {
    return appID
  }
  const myApp = useLocalApplicationStore()
  return myApp.CurrentAppID || myApp.MyAppID
}
