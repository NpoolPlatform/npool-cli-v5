import { notify, oauth, appuserbase, appuser } from '..'

const _oauth = oauth.useOAuthStore()

export const getOAuthLoginURL = (clientName: appuserbase.SignMethodType, done?: (error: boolean, url?: string) => void) => {
  _oauth.getOAuthLoginURL({
    ClientName: clientName,
    Message: {
      Error: {
        Title: 'MSG_GET_OAUTH_LOGIN_URL',
        Message: 'MSG_GET_OAUTH_LOGIN_URL_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const oauthLogin = (code: string, state: string, done?: (error: boolean, user?: appuser.User) => void) => {
  _oauth.oauthLogin({
    Code: code,
    State: state,
    Message: {
      Error: {
        Title: 'MSG_OAUTH_LOGIN',
        Message: 'MSG_OAUTH_LOGIN_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}
