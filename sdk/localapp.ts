import { localapp } from '..'
import { computed } from 'vue'
import { NIL as NIL_UUID } from 'uuid'

const myApp = localapp.useLocalApplicationStore()
export const AppID = computed(() => myApp.currentAppID || myApp.myAppID || NIL_UUID)
export const CurrentAppID = computed(() => myApp.currentAppID)
export const MyAppID = computed(() => myApp.myAppID)
export const initMyAppID = (appID: string) => { myApp.MyAppID = appID }
export const setCurrentAppID = (appID: string) => { myApp.CurrentAppID = appID }
