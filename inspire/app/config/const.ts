export enum API {
  UPDATE_APP_CONFIG = '/inspire/v1/update/appconfig',
  ADMIN_UPDATE_APP_CONFIG = '/inspire/v1/admin/update/appconfig',
  CREATE_APP_CONFIG = '/inspire/v1/create/appconfig',
  GET_APP_CONFIGS = '/inspire/v1/get/appconfigs',
  ADMIN_CREATE_APP_CONFIG = '/inspire/v1/admin/create/appconfig',
  ADMIN_GET_APP_CONFIGS = '/inspire/v1/admin/get/appconfigs'
}

export enum CommissionType {
  LayeredCommission = 'LayeredCommission',
  DirectCommission = 'DirectCommission',
  LegacyCommission = 'LegacyCommission'
}
export const CommissionTypes = Object.values(CommissionType)

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
