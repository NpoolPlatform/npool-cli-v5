export enum ReviewState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'Approved',
  Wait = 'Wait',
  Rejected ='Rejected'
}

export enum ReviewTriggerType {
  DefaultTriggerType = 'DefaultTriggerType',
  AutoReviewed = 'AutoReviewed',
  LargeAmount = 'LargeAmount',
  InsufficientFunds = 'InsufficientFunds',
  InsufficientGas = 'InsufficientGas',
  InsufficientFundsGas = 'InsufficientFundsGas',
}

export enum ReviewObjectType {
  DefaultObjectType = 'DefaultObjectType',
  ObjectKyc = 'ObjectKyc',
  ObjectWithdrawal = 'ObjectWithdrawal',
  ObjectRandomCouponCash = 'ObjectRandomCouponCash',
}

export enum KycState {
  Approved = 'Approved',
  Reviewing = 'Reviewing',
  Rejected = 'Rejected',
}
