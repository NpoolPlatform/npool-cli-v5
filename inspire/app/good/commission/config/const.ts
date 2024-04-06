export enum API {
  UPDATE_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/update/app/good/commission/config',
  UPDATE_N_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/update/n/app/good/commission/config',
  CLONE_APP_GOOD_COMMISSION_CONFIGS = '/inspire/v1/clone/good/commissions',
  CREATE_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/create/app/good/commission/config',
  GET_APP_GOOD_COMMISSION_CONFIGS = '/inspire/v1/get/app/good/commission/configs',
  CLONE_N_APP_GOOD_COMMISSION_CONFIGS = '/inspire/v1/clone/app/good/commissions',
  CREATE_N_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/create/n/app/good/commission/config',
  GET_N_APP_GOOD_COMMISSION_CONFIGS = '/inspire/v1/get/n/app/good/commission/configs'
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
