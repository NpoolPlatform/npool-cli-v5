export enum SignMethodType {
  Mobile = 'Mobile',
  Email = 'Email',
  Twitter = 'Twitter',
  Github = 'Github',
  Facebook = 'Facebook',
  Linkedin = 'Linkedin',
  Wechat = 'Wechat',
  Google = 'Google',
  Username = 'Username'
}

export enum SigninVerifyType {
  Mobile = SignMethodType.Mobile,
  Email = SignMethodType.Email,
  Google = SignMethodType.Google
}

export const SignMethodTypes = Object.values(SignMethodType)

export enum RecaptchaType {
  GoogleRecaptchaV3 = 'GoogleRecaptchaV3'
}

export const RecaptchaTypes = Object.values(RecaptchaType)

export enum AccountType {
  Mobile = 'Mobile',
  Email = 'Email',
  Twitter = 'Twitter',
  Github = 'Github',
  Facebook = 'Facebook',
  Linkedin = 'Linkedin',
  Wechat = 'Wechat',
  Google = 'Google',
  Username = 'Username'
}

export enum DocumentType {
  DefaultKycDocumentType = 'DefaultKycDocumentType',
  IDCard = 'IDCard',
  DriverLicense ='DriverLicense',
  Passport = 'Passport'
}

export enum EntityType {
  DefaultKycEntityType = 'DefaultKycEntityType',
  Individual = 'Individual',
  Organization = 'Organization'
}

export enum KYCState {
  DefaultState = 'DefaultState',
  Approved = 'Approved',
  Reviewing = 'Reviewing',
  Rejected = 'Rejected'
}

export enum ImageType {
  DefaultKycImageType = 'DefaultKycImageType',
  FrontImg = 'FrontImg',
  BackImg = 'BackImg',
  SelfieImg = 'SelfieImg'
}

export enum KYCReviewState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'Approved',
  Wait ='Wait',
  Rejected = 'Rejected'
}

export enum CreateInvitationCodeWhen {
  DefaultWhen = 'DefaultWhen',
  Registration = 'Registration',
  SetToKol ='SetToKol',
  HasPaidOrder = 'HasPaidOrder'
}

export const CreateInvitationCodeWhens = Object.values(CreateInvitationCodeWhen)
