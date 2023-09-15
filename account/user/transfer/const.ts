export enum API {
  CREATE_TRANSFER = '/account/v1/create/transfer',
  DELETE_TRANSFER = '/account/v1/delete/transfer',
  GET_TRANSFERS = '/account/v1/get/transfers',
  GET_APP_TRANSFERS = '/account/v1/get/app/transfers'
}

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
