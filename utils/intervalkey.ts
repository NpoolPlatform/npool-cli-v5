export enum IntervalKey {
  All = 'All',
  LastDay = 'LastDay',
  LastMonth = 'LastMonth'
}

export const intervalStartAt = (key: IntervalKey) => {
  switch (key) {
    case IntervalKey.All:
      return 0
    case IntervalKey.LastDay:
      return Math.ceil(new Date().getTime() / 1000) - 24 * 60 * 60
    case IntervalKey.LastMonth:
      return Math.ceil(new Date().getTime() / 1000) - 24 * 60 * 60 * 30
  }
}
