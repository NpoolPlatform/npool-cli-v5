import { SignMethodType } from '../appuser/base'

export const shadowEntID = (entID: string) => {
  return entID.slice(0, 5) + '***-*****-***' + entID.slice(-6, -1)
}

export const shadowAccount = (account: string, accountType: SignMethodType) => {
  let suffix = ''
  let prefix = ''
  if (accountType === SignMethodType.Email) {
    suffix = account.split('@')[1]
  }
  [...account.split('@')[0]].forEach((c, i) => {
    prefix += i <= 3 ? c : '*'
  })
  return prefix + '@' + suffix
}
