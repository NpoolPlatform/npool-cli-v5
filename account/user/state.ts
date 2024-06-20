import { Pager } from '../../request'
import { Account } from './base'

export class UserAccounts extends Pager {
  Accounts: Array<Account> = []
}
