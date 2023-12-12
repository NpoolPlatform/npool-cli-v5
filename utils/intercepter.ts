import { AxiosInstance, AxiosResponse } from 'axios'
import { Cookies } from 'quasar'
import { useLocalUserStore } from '../appuser/user/local'
import {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import { createAPI } from '../request/axiosapi'
import { User } from '../appuser/user/base'

interface RouteMetaImpl {
  ShowHeaderAnnouncement: boolean
  ShowMainHeader: boolean
  ShowBigLogo: boolean
  ShowSignHelper: boolean
  ShowFooterTop: boolean
  ShowTopTip: boolean
  NeedLogined: boolean
}

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends RouteMetaImpl {
  }
}

interface LoginedResponse {
  Info: User
}

const loginInterceptor = (signInPath: string, to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const user = useLocalUserStore()
  console.log('user.logined: ', user.logined)
  if (user.logined) {
    next()
    return
  }

  const userID = Cookies.get('X-User-ID')
  console.log('UserID__: ', userID)
  const token = Cookies.get('X-App-Login-Token')
  if (!userID || !token || userID.length === 0 || token.length === 0) {
    if (to.meta && to.meta.NeedLogined) {
      next({ path: signInPath, replace: true })
    } else {
      next()
    }
    return
  }

  const api = createAPI() as AxiosInstance

  const headers = api.defaults.headers as unknown as Record<string, string>
  headers['X-User-ID'] = userID
  headers['X-App-Login-Token'] = token
  console.log('X-User-ID: ', headers['X-User-ID'])
  api.post<unknown, AxiosResponse<LoginedResponse>>('/appuser/v1/logined')
    .then((resp: AxiosResponse<LoginedResponse>) => {
      console.log('resp.Info: ', resp.data.Info)
      if (resp.data.Info) {
        user.setUser(resp.data.Info)
      }
      if (!user.User && to.meta && to.meta.NeedLogined) {
        next({ path: signInPath, replace: true })
        return
      }
      console.log('^^^^^^^^^^^^^')
      next()
    }).catch(() => {
      console.log('catch: ....')
      user.restUser()
      if (to.meta && to.meta.NeedLogined) {
        next({ path: signInPath, replace: true })
      } else {
        next()
      }
    })
}

export {
  loginInterceptor,
  RouteMetaImpl
}
