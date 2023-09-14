import { ErrorTarget } from './types'

export interface ErrorSwitcherState {
  ErrorTargets: Array<ErrorTarget>
  ErrorTrigger: ErrorTarget
}
