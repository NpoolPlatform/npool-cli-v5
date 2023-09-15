export enum AccountUsedFor {
  DefaultAccountUsedFor = 'DefaultAccountUsedFor',
  GoodBenefit = 'GoodBenefit',
  UserBenefitHot = 'UserBenefitHot',
  UserBenefitCold = 'UserBenefitCold',
  PlatformBenefitCold = 'PlatformBenefitCold',
  GasProvider = 'GasProvider',
  UserWithdraw = 'UserWithdraw',
  UserDeposit = 'UserDeposit',
  GoodPayment = 'GoodPayment',
  PaymentCollector = 'PaymentCollector',
  UserDirectBenefit = 'UserDirectBenefit',
}

export const AccountUsedFors = Object.values(AccountUsedFor)

export enum AccountLockedBy {
  DefaultLockedBy = 'DefaultLockedBy',
  Payment = 'Payment',
  Collecting = 'Collecting',
}
