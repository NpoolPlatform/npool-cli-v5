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
  if (user.logined) {
    next()
    return
  }

  const userID = Cookies.get('X-User-ID')
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

  api.post<unknown, AxiosResponse<LoginedResponse>>('/appuser/v1/logined')
    .then((resp: AxiosResponse<LoginedResponse>) => {
      if (resp.data.Info) {
        user.setUser(resp.data.Info)
      }
      if (!user.User && to.meta && to.meta.NeedLogined) {
        next({ path: signInPath, replace: true })
        return
      }
      next()
    }).catch(() => {
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
