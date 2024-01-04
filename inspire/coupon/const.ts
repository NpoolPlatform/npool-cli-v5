export enum API {
  CREATE_COUPONPOOL = '/inspire/v1/create/couponpool',
  UPDATE_COUPONPOOL = '/inspire/v1/update/couponpool',
  GET_COUPONPOOLS = '/inspire/v1/get/couponpools',
  GET_APP_COUPONPOOLS = '/inspire/v1/get/app/couponpools'
}

export enum CouponType {
  FixAmount = 'FixAmount',
  Discount = 'Discount',
}

export const CouponTypes = Object.values(CouponType)

export enum CouponConstraint {
  Normal = 'Normal',
  PaymentThreshold = 'PaymentThreshold',
}
export const CouponConstraints = Object.values(CouponConstraint)

export enum CouponScope {
  AllGood = 'AllGood',
  Whitelist = 'Whitelist',
  Blacklist = 'Blacklist',
}

export const CouponScopes = Object.values(CouponScope)

export enum ControlType {
  DefaultControlType = "DefaultControlType",
  KycApproved = "KycApproved",
  CreditThreshold = "CreditThreshold",
  OrderThreshold = "OrderThreshold",
  PaymentAmountThreshold = "PaymentAmountThreshold",
}

export const ControlTypes = Object.values(ControlType)