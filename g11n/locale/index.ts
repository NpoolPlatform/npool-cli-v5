import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { AppLang } from '../base'

export const useLocaleStore = defineStore('locale-lang', {
  state: () => ({
    AppLang: undefined as unknown as AppLang
  }),
  getters: {
    langID () {
      return () => this.AppLang?.LangID
    },
    locale () {
      return () => this.AppLang?.Short
    },
    lang () {
      return () => this.AppLang?.Lang
    }
  },
  actions: {
    setLang (lang: AppLang) {
      if (!lang) {
        return
      }
      this.AppLang = lang
      Cookies.set('X-Lang-ID', lang.LangID, { expires: '4h', secure: true })
    }
  }
})

export const formalizeLangID = (langID?: string) => {
  if (langID) {
    return langID
  }
  const _locale = useLocaleStore()
  return _locale.AppLang?.LangID
}
