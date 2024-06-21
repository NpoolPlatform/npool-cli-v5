import { computed } from 'vue'
import { language, constant, notify } from '..'

const _language = language.useLangStore()

const adminGetPageLangs = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _language.getLangs({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_LANGS',
        Message: 'MSG_GET_LANGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<language.Lang>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    adminGetPageLangs(++pageIndex, pageEnd, done)
  })
}

export const adminGetLangs = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  adminGetPageLangs(pageStart, pages ? pageStart + pages : pages, done)
}

export const languages = computed(() => _language.langs)

export const adminCreateLang = (language: language.Lang, done?: (error: boolean, language?: language.Lang) => void) => {
  _language.createLang({
    ...language,
    Message: {
      Error: {
        Title: 'MSG_CREATE_LANG',
        Message: 'MSG_CREATE_LANG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminCreateLangs = (languages: language.Lang[], done?: (error: boolean, language?: language.Lang[]) => void) => {
  _language.createLangs({
    Infos: languages,
    Message: {
      Error: {
        Title: 'MSG_CREATE_LANG',
        Message: 'MSG_CREATE_LANG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateLang = (language: language.Lang, done?: (error: boolean, language?: language.Lang) => void) => {
  _language.updateLang({
    ...language,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_LANG',
        Message: 'MSG_UPDATE_LANG_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}
