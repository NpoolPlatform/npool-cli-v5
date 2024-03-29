export enum API {
  GET_ORDERS = '/order/v1/get/orders',
  CREATE_ORDER = '/order/v1/create/order',
  UPDATE_ORDER = '/order/v1/update/order',
  GET_ORDER = '/order/v1/get/order',
  GET_APP_ORDERS = '/order/v1/get/app/orders',
  CREATE_USER_ORDER = '/order/v1/create/user/order',
  UPDATE_USER_ORDER = '/order/v1/update/user/order',
  GET_N_APP_ORDERS = '/order/v1/get/n/app/orders',
  CREATE_APP_USER_ORDER = '/order/v1/create/app/user/order',
  UPDATE_APP_USER_ORDER = '/order/v1/update/app/user/order',
  CREATE_SIMULATE_ORDER = '/order/v1/create/simulate/order',
  CREATE_SIMULATE_ORDERS = '/order/v1/create/simulate/orders',
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
  PayWithOffline = 'PayWithOffline',
  PayWithNoPayment = 'PayWithNoPayment'
}

export enum InvestmentType {
  UnionMining = 'UnionMining',
  FullPayment = 'FullPayment'
}
