export enum API {
  GET_WITHDRAWS = '/ledger/v1/get/withdraws',
  CREATE_WITHDRAW = '/ledger/v1/create/withdraw',
  GET_APP_WITHDRAWS = '/ledger/v1/get/app/withdraws',
  GET_N_APP_WITHDRAWS = '/ledger/v1/get/n/app/withdraws'
}

export enum WithdrawState {
  Created = 'Created',
  Reviewing = 'Reviewing',
  Approved = 'Approved',
  Transferring = 'Transferring',
  PreRejected = 'PreRejected',
  ReturnRejectedBalance = 'ReturnRejectedBalance',
  Rejected = 'Rejected',
  PreFail = 'PreFail',
  ReturnFailBalance = 'ReturnFailBalance',
  TransactionFail = 'TransactionFail',
  PreSuccessful = 'PreSuccessful',
  SpendSuccessfulBalance = 'SpendSuccessfulBalance',
  Successful = 'Successful',
}
