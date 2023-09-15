export enum API {
  GET_WITHDRAWS = '/ledger/v1/get/withdraws',
  CREATE_WITHDRAW = '/ledger/v1/create/withdraw',
  GET_APP_WITHDRAWS = '/ledger/v1/get/app/withdraws',
  GET_N_APP_WITHDRAWS = '/ledger/v1/get/n/app/withdraws'
}

export enum WithdrawState {
  DefaultWithdrawReviewState = 'DefaultWithdrawReviewState',
  Reviewing = 'Reviewing',
  Transferring = 'Transferring',
  Rejected = 'Rejected',
  TransactionFail = 'TransactionFail',
  Successful = 'Successful',
}
