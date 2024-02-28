export enum API {
  GET_SIMULATE_STATEMENTS = '/ledger/v1/get/simulate/details',
  GET_APP_SIMULATE_STATEMENTS = '/ledger/v1/get/app/simulate/details',
  GET_SIMULATE_MININGREWARDS = '/ledger/v1/get/simulate/miningrewards',
}

export enum IOType {
  Incoming = 'Incoming',
  Outcoming = 'Outcoming'
}

export enum IOSubType {
  Payment = 'Payment',
  MiningBenefit = 'MiningBenefit',
  Commission = 'Commission',
  TechniqueFeeCommission = 'TechniqueFeeCommission',
  Deposit = 'Deposit',
  Withdrawal = 'Withdrawal',
  Transfer = 'Transfer',
  CommissionRevoke = 'CommissionRevoke',
  OrderRevoke = 'OrderRevoke',
  RandomCouponCash = 'RandomCouponCash'
}
