import { computed } from 'vue'
import { oauththirdparty, oauthbase, constant, notify } from '..'

const _oauthThirdParty = oauththirdparty.useOAuthThirdPartyStore()

const getPageOAuthThirdPartys = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _oauthThirdParty.getOAuthThirdParties({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_OAUTH_THIRD_PARTIES',
        Message: 'MSG_GET_OAUTH_THIRD_PARTIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<oauthbase.OAuthThirdParty>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageOAuthThirdPartys(++pageIndex, pageEnd, done)
  })
}

export const getOAuthThirdPartys = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageOAuthThirdPartys(pageStart, pages ? pageStart + pages : pages, done)
}

export const oauthThirdParties = computed(() => _oauthThirdParty.oauthThirdParties)

export const adminCreateOAuthThirdParty = (oauthThirdParty: oauthbase.OAuthThirdParty, done?: (error: boolean, oauthThirdParty?: oauthbase.OAuthThirdParty) => void) => {
  _oauthThirdParty.adminCreateOAuthThirdParty({
    ...oauthThirdParty,
    Message: {
      Error: {
        Title: 'MSG_CREATE_OAUTH_THIRD_PARTIES',
        Message: 'MSG_CREATE_OAUTH_THIRD_PARTIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateOAuthThirdParty = (oauthThirdParty: oauthbase.OAuthThirdParty, done?: (error: boolean, oauthThirdParty?: oauthbase.OAuthThirdParty) => void) => {
  _oauthThirdParty.adminUpdateOAuthThirdParty({
    ...oauthThirdParty,
    Message: {
      Error: {
        Title: 'MSG_UPDATE_OAUTH_THIRD_PARTIES',
        Message: 'MSG_UPDATE_OAUTH_THIRD_PARTIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteOAuthThirdParty = (oauthThirdParty: oauthbase.OAuthThirdParty, done?: (error: boolean, oauthThirdParty?: oauthbase.OAuthThirdParty) => void) => {
  _oauthThirdParty.adminDeleteOAuthThirdParty({
    ...oauthThirdParty,
    Message: {
      Error: {
        Title: 'MSG_DELETE_OAUTH_THIRD_PARTIES',
        Message: 'MSG_DELETE_OAUTH_THIRD_PARTIES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}
