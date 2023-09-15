import { useMyApplicationStore } from './local'

export const formalizeAppID = (appID?: string) => {
  if (appID) {
    return appID
  }
  const myApp = useMyApplicationStore()
  return myApp.AppID
}
