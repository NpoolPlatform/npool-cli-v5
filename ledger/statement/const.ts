export enum API {
  GET_STATEMENTS = '/ledger/v1/get/detailedgerstatementsls',
  GET_APP_STATEMENTS = '/ledger/v1/get/app/ledgerstatements',
  GET_MININGREWARDS = '/ledger/v1/get/miningrewards',
  CREATE_APP_USER_DEPOSIT = '/ledger/v1/create/app/user/deposit',
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
  RandomCouponCash = 'RandomCouponCash',
  RandomCashableSimulateProfit = 'RandomCashableSimulateProfit'
}
