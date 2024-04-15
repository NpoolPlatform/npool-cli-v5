export enum API {
  UPDATE_APP_COMMISSION_CONFIG = '/inspire/v1/update/app/commission/config',
  ADMIN_UPDATE_APP_COMMISSION_CONFIG = '/inspire/v1/admin/update/app/commission/config',
  CREATE_APP_COMMISSION_CONFIG = '/inspire/v1/create/app/commission/config',
  GET_APP_COMMISSION_CONFIGS = '/inspire/v1/get/app/commission/configs',
  ADMIN_CREATE_APP_COMMISSION_CONFIG = '/inspire/v1/admin/create/app/commission/config',
  ADMIN_GET_APP_COMMISSION_CONFIGS = '/inspire/v1/admin/get/app/commission/configs'
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
