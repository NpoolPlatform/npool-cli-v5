import { BasePager } from '../../request'
import { Notif } from './types'

export interface AppNotifs extends BasePager {
  Notifs: Array<Notif>
}
