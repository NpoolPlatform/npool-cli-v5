export enum API {
  GET_ORDERS = '/order/v1/get/orders',
  GET_MY_ORDERS = '/order/v1/get/my/orders',
  ADMIN_GET_ORDERS = '/order/v1/admin/get/orders'
}

export enum OrderState {
  CREATED = 'OrderStateCreated',
  WAIT_PAYMENT = 'OrderStateWaitPayment',
  PAID = 'OrderStatePaid',
  PAYMENT_TIMEOUT = 'OrderStatePaymentTimeout',
  CANCELED = 'OrderStateCanceled',
  IN_SERVICE = 'OrderStateInService',
  EXPIRED = 'OrderStateExpired',
  WAIT_START = 'OrderStateWaitStart',
}

export enum PaymentState {
  WAIT = 'PaymentStateWait',
  DONE = 'PaymentStateDone',
  CANCELED = 'PaymentStateCanceled',
  TIMEOUT = 'PaymentStateTimeout',
  NO_PAYMENT = 'PaymentStateNoPayment'
}

export const OrderTimeoutSeconds = 6 * 60 * 60
export const RemainMax = '06:00:00'

export enum OrderType {
  Normal = 'Normal',
  Offline = 'Offline',
  Airdrop = 'Airdrop',
}

export const OrderTypes = Object.values(OrderType)

export enum PaymentType {
  PayWithBalanceOnly = 'PayWithBalanceOnly',
  PayWithTransferOnly = 'PayWithTransferOnly',
  PayWithTransferAndBalance = 'PayWithTransferAndBalance',
  PayWithParentOrder = 'PayWithParentOrder',
  PayWithOtherOrder = 'PayWithOtherOrder',
  PayWithOffline = 'PayWithOffline',
  PayWithNoPayment = 'PayWithNoPayment'
}

export enum InvestmentType {
  UnionMining = 'UnionMining',
  FullPayment = 'FullPayment'
}

export enum OrderCreateMethod {
  OrderCreatedByPurchase = 'OrderCreatedByPurchase',
  OrderCreatedByAdmin = 'OrderCreatedByAdmin',
  OrderCreatedByRenew = 'OrderCreatedByRenew'
}

export enum OrderBenefitState {
  BenefitWait = 'BenefitWait',
  BenefitCalculated = 'BenefitCalculated',
  BenefitBookKept = 'BenefitBookKept'
}
