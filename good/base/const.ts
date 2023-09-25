export enum GoodType {
  PowerRenting = 'PowerRenting',
  MachineRenting = 'MachineRenting',
  MachineHosting = 'MachineHosting',
  TechniqueServiceFee = 'TechniqueServiceFee',
  ElectricityFee = 'ElectricityFee',
}
export const GoodTypes = Object.values(GoodType)

export enum BenefitType {
  BenefitTypePlatform = 'BenefitTypePlatform',
  BenefitTypePool = 'BenefitTypePool',
}

export const BenefitTypes = Object.values(BenefitType)

export enum StartMode {
  GoodStartModeTBD = 'GoodStartModeTBD',
  GoodStartModeConfirmed = 'GoodStartModeConfirmed'
}

export const StartModes = Object.values(StartMode)

export enum GoodLabel {
  GoodLabelPromotion = 'GoodLabelPromotion',
  GoodLabelNoviceExclusive = 'GoodLabelNoviceExclusive',
  GoodLabelInnovationStarter = 'GoodLabelInnovationStarter',
  GoodLabelLoyaltyExclusive = 'GoodLabelLoyaltyExclusive'
}
export const GoodLabels = Object.values(GoodLabel)
