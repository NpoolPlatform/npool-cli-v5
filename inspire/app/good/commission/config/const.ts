export enum API {
  UPDATE_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/update/appgoodcommissionconfig',
  ADMIN_UPDATE_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/admin/update/appgoodcommissionconfig',
  CREATE_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/create/appgoodcommissionconfig',
  GET_APP_GOOD_COMMISSION_CONFIGS = '/inspire/v1/get/appgoodcommissionconfigs',
  ADMIN_CREATE_APP_GOOD_COMMISSION_CONFIG = '/inspire/v1/admin/create/appgoodcommissionconfig',
  ADMIN_GET_APP_GOOD_COMMISSION_CONFIGS = '/inspire/v1/admin/get/appgoodcommissionconfigs'
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
