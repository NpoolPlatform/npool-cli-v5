import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'
import { AppLang, Message } from '../base'

export const useLocaleStore = defineStore('locale-lang', {
  state: () => ({
    AppLang: undefined as unknown as AppLang,
    I18n: useI18n()
  }),
  getters: {
    langID () {
      return () => this.AppLang?.LangID
    },
    locale () {
      return () => this.AppLang?.Short
    },
    lang () {
      return () => this.AppLang.Lang
    }
  },
  actions: {
    setLang (lang: AppLang) {
      if (!lang) {
        return
      }
      this.AppLang = lang
      Cookies.set('X-Lang-ID', lang.LangID, { expires: '4h', secure: true })
      this.I18n.locale = lang.Lang
    },
    setLangs (langs: Array<AppLang>) {
      const langID = Cookies.get('X-Lang-ID')
      const userID = Cookies.get('X-User-ID')
      if (langs.length > 0) {
        if (!userID && langID && langID?.length > 0) {
          const _lang = langs.find((el) => el.LangID === langID)
          if (_lang) {
            this.setLang(_lang)
            return
          }
        }
        let flag = false
        langs.forEach((el) => {
          if (el.Main) {
            flag = true
            this.setLang(el)
          }
        })
        if (!flag && langs.length > 0) {
          this.setLang(langs[0])
        }
      }
    },
    setLocaleMessages (messages: Array<Message>) {
      const olds = this.I18n.getLocaleMessage(this.AppLang?.Lang)
      messages.forEach((el) => {
        olds[el.MessageID] = el.Message
      })
      this.I18n.setLocaleMessage(this.AppLang?.Lang, olds)
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
