export enum EventType {
  Signup = 'Signup',
  Signin = 'Signin',
  Update = 'Update',
  Contact = 'Contact',
  SetWithdrawAddress = 'SetWithdrawAddress',
  Withdraw = 'Withdraw',
  CreateInvitationCode = 'CreateInvitationCode',
  SetCommission = 'SetCommission',
  SetTransferTargetUser = 'SetTransferTargetUser',
  Transfer = 'Transfer',
  WithdrawalRequest = 'WithdrawalRequest',
  WithdrawalCompleted = 'WithdrawalCompleted',
  DepositReceived = 'DepositReceived',
  KYCApproved = 'KYCApproved',
  KYCRejected = 'KYCRejected',
  Purchase = 'Purchase',
  AffiliatePurchase = 'AffiliatePurchase',
  Announcement = 'Announcement',
  AffiliateSignup = 'AffiliateSignup',
}

export const EventTypes = Object.values(EventType)
