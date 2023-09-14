import { Notification } from '../../notify'
import { SwitchTarget } from './const'

export interface ErrorTarget {
  ErrorCode: number
  Target: SwitchTarget
  Error?: Notification
}
