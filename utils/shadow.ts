import { SignMethodType } from '../appuser/base'

export const shadowEntID = (entID: string) => {
  if (!entID) {
    return ''
  }
  return entID.slice(0, 5) + '***-*****-***' + entID.slice(-6, -1)
}

export const shortEntID = (entID: string) => {
  if (!entID) {
    return ''
  }
  return entID.slice(-12, -1)
}

export const shadowAccount = (account: string, accountType: SignMethodType) => {
  if (!account) {
    return ''
  }
  let suffix = ''
  let prefix = ''
  if (accountType === SignMethodType.Email) {
    suffix = account.split('@')[1]
  }
  [...account?.split('@')[0]].forEach((c, i) => {
    prefix += i <= 3 ? c : '*'
  })
  return prefix + '@' + suffix
}
