const NotSet = 'NOT SET'

const VerificationCodeLength = 6
const MinPasswordLength = 8
const MaxPasswordLength = 32
const SecondsEachDay = 24 * 60 * 60

const InvalidID = '00000000-0000-0000-0000-000000000000'

const GoogleRecaptchaKey = '6Lcg4yIeAAAAANIyLz_mbENlYRSkK1C_aQkejb_4'

enum GoogleTokenType {
  Login = 'login'
}

export const PriceCoinName = 'USDT'
export const DefaultPageSize = 100

export {
  NotSet,
  VerificationCodeLength,
  MinPasswordLength,
  MaxPasswordLength,
  InvalidID,
  GoogleRecaptchaKey,
  GoogleTokenType,
  SecondsEachDay
}
