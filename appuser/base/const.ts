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

export enum ResetUserMethod {
  Normal = 'Normal',
  Link = 'Link'
}

export const ResetUserMethods = Object.values(ResetUserMethod)

export enum RecaptchaType {
  GoogleRecaptchaV3 = 'GoogleRecaptchaV3'
}

export const RecaptchaTypes = Object.values(RecaptchaType)

export enum CreateInvitationCodeWhen {
  DefaultWhen = 'DefaultWhen',
  Registration = 'Registration',
  SetToKol ='SetToKol',
  HasPaidOrder = 'HasPaidOrder'
}

export const CreateInvitationCodeWhens = Object.values(CreateInvitationCodeWhen)
