import { goodbase } from '..'

export const durationUnit = (durationType: goodbase.GoodDurationType) => {
  switch (durationType) {
    case goodbase.GoodDurationType.GoodDurationByHour:
      return 'MSG_HOUR'
    case goodbase.GoodDurationType.GoodDurationByDay:
      return 'MSG_DAY'
    case goodbase.GoodDurationType.GoodDurationByMonth:
      return 'MSG_MONTH'
    case goodbase.GoodDurationType.GoodDurationByYear:
      return 'MSG_YEAR'
  }
}
