export enum API {
  UPDATE_COMMISSION = '/inspire/v1/update/commission',
  CLONE_COMMISSIONS = '/inspire/v1/clone/commissions',
  CREATE_USER_COMMISSION = '/inspire/v1/create/user/commission',
  GET_APP_COMMISSIONS = '/inspire/v1/get/app/commissions',
  CLONE_APP_COMMISSIONS = '/inspire/v1/clone/app/commissions',
  CREATE_COMMISSION = '/inspire/v1/create/commission',
  GET_COMMISSION_HISTORIES = '/inspire/v1/get/commissionhistories'
}

export enum SettleType {
  GoodOrderPayment = 'GoodOrderPayment',
  TechniqueServiceFee = 'TechniqueServiceFee'
}
export const SettleTypes = Object.values(SettleType)

export enum SettleMode {
  SettleWithGoodValue = 'SettleWithGoodValue',
  SettleWithPaymentAmount = 'SettleWithPaymentAmount'
}
export const SettleModes = Object.values(SettleMode)

export enum SettleAmountType {
  SettleByPercent = 'SettleByPercent',
  SettleByAmount = 'SettleByAmount'
}
export const SettleAmountTypes = Object.values(SettleAmountType)

export enum SettleInterval {
  SettleAggregate = 'SettleAggregate',
  SettleMonthly = 'SettleMonthly',
  SettleYearly = 'SettleYearly',
  SettleEveryOrder = 'SettleEveryOrder'
}
export const SettleIntervals = Object.values(SettleInterval)
