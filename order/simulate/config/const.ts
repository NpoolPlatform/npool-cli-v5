export enum API {
  GET_SIMULATE_CONFIG = '/order/v1/get/simulate/config',
  GET_SIMULATE_CONFIGS = '/order/v1/get/simulate/configs',
  CREATE_SIMULATE_CONFIG = '/order/v1/create/simulate/config',
  UPDATE_SIMULATE_CONFIG = '/order/v1/update/simulate/config',
  GET_APP_SIMULATE_CONFIGS = '/order/v1/get/app/simulate/configs',
  CREATE_APP_SIMULATE_CONFIG = '/order/v1/create/app/simulate/config',
  UPDATE_APP_SIMULATE_CONFIG = '/order/v1/update/app/simulate/config',
  DELETE_APP_SIMULATE_CONFIG = '/order/v1/delete/app/simulate/config',
}

export enum SendCouponMode {
  WITHOUT_COUPON = 'WithoutCoupon',
  FIRST_BENIFIT = 'FirstBenifit',
  RANDOM_BENIFIT = 'RandomBenifit',
  FIRST_AND_RANDOM_BENIFIT = 'FirstAndRandomBenifit',
}

export const SendCouponModes = Object.values(SendCouponMode)
