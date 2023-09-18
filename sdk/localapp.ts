import { localapp } from '..'
import { computed } from 'vue'
import { NIL as NIL_UUID } from 'uuid'

const myApp = localapp.useLocalApplicationStore()
export const AppID = computed(() => myApp.currentAppID || myApp.myAppID || NIL_UUID)
export const CurrentAppID = computed({
  get: () => myApp.currentAppID,
  set: value => { myApp.CurrentAppID = value as string }
})
export const MyAppID = computed({
  get: () => myApp.myAppID,
  set: value => { myApp.MyAppID = value as string }
})
