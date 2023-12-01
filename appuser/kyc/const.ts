export enum API {
  CREATE_KYC = '/appuser/v1/create/kyc',
  GET_KYC = '/appuser/v1/get/kyc',
  GET_KYC_IMAGE = '/appuser/v1/get/kycimage',
  UPDATE_KYC = '/appuser/v1/update/kyc',
  UPLOAD_KYC_IMAGE = '/appuser/v1/upload/kycimage',
  GET_USER_KYCIMAGE = '/appuser/v1/get/user/kycimage',
  GET_APP_USER_KYCIMAGE = '/appuser/v1/get/app/user/kycimage'
}

export enum DocumentType {
  IDCard = 'IDCard',
  DriverLicense ='DriverLicense',
  Passport = 'Passport'
}

export enum EntityType {
  Individual = 'Individual',
  Organization = 'Organization'
}

export enum KYCState {
  Approved = 'Approved',
  Reviewing = 'Reviewing',
  Rejected = 'Rejected'
}

export enum ImageType {
  FrontImg = 'FrontImg',
  BackImg = 'BackImg',
  SelfieImg = 'SelfieImg'
}
