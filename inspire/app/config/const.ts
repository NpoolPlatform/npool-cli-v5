export enum API {
  UPDATE_APP_CONFIG = '/inspire/v1/update/app/config',
  UPDATE_N_APP_CONFIG = '/inspire/v1/update/n/app/config',
  CREATE_APP_CONFIG = '/inspire/v1/create/app/config',
  GET_APP_CONFIGS = '/inspire/v1/get/app/configs',
  CREATE_N_APP_CONFIG = '/inspire/v1/create/n/app/config',
  GET_N_APP_CONFIGS = '/inspire/v1/get/n/app/configs'
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
