export enum API {
  GET_APP_CONFIG = '/order/v1/get/appconfig',
  CREATE_APP_CONFIG = '/order/v1/create/appconfig',
  UPDATE_APP_CONFIG = '/order/v1/update/appconfig',
  ADMIN_GET_APP_CONFIGS = '/order/v1/admin/get/appconfigs',
  ADMIN_CREATE_APP_CONFIG = '/order/v1/admin/create/appconfig',
  ADMIN_UPDATE_APP_CONFIG = '/order/v1/admin/update/appconfig',
  ADMIN_DELETE_APP_CONFIG = '/order/v1/admin/delete/appconfig',
}

export enum SimulateOrderCouponMode {
  WITHOUT_COUPON = 'WithoutCoupon',
  FIRST_BENIFIT = 'FirstBenifit',
  RANDOM_BENIFIT = 'RandomBenifit',
  FIRST_AND_RANDOM_BENIFIT = 'FirstAndRandomBenifit',
}

export const SimulateOrderCouponModes = Object.values(SimulateOrderCouponMode)
