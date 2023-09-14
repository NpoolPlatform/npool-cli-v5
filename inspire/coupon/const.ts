export enum API {
  CREATE_COUPONPOOL = '/inspire/v1/create/couponpool',
  UPDATE_COUPONPOOL = '/inspire/v1/update/couponpool',
  GET_COUPONPOOLS = '/inspire/v1/get/couponpools',
  GET_APP_COUPONPOOLS = '/inspire/v1/get/app/couponpools'
}

export enum CouponType {
  FixAmount = 'FixAmount',
  Discount = 'Discount',
  SpecialOffer = 'SpecialOffer'
}
export const CouponTypes = Object.values(CouponType)

export enum CouponConstraint {
  Normal = 'Normal',
  PaymentThreshold = 'PaymentThreshold',
  GoodOnly = 'GoodOnly',
  GoodThreshold = 'GoodThreshold'
}
export const CouponConstraints = Object.values(CouponConstraint)
