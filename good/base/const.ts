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
  GoodStartModeConfirmed = 'GoodStartModeConfirmed',
  GoodStartModeNextDay = 'GoodStartModeNextDay',
  GoodStartModeInstantly = 'GoodStartModeInstantly',
  GoodStartModePreset = 'GoodStartModePreset'
}

export const StartModes = Object.values(StartMode)

export enum GoodLabel {
  GoodLabelPromotion = 'GoodLabelPromotion',
  GoodLabelNoviceExclusive = 'GoodLabelNoviceExclusive',
  GoodLabelInnovationStarter = 'GoodLabelInnovationStarter',
  GoodLabelLoyaltyExclusive = 'GoodLabelLoyaltyExclusive',
  GoodLabelLatestOffer = 'GoodLabelLatestOffer',
  GoodLabelFirstBatchMining = 'GoodLabelFirstBatchMining',
  GoodLabelClassicCryptoPower = 'GoodLabelClassicCryptoPower',
  GoodLabelDelegatedStaking = 'GoodLabelDelegatedStaking'
}
export const GoodLabels = Object.values(GoodLabel)

export enum GoodTopMostType {
  TopMostPromotion = 'TopMostPromotion',
  TopMostNoviceExclusive = 'TopMostNoviceExclusive',
  TopMostBestOffer = 'TopMostBestOffer',
  TopMostInnovationStarter = 'TopMostInnovationStarter',
  TopMostLoyaltyExclusive = 'TopMostLoyaltyExclusive',
  TopMostLatestOffers = 'TopMostLatestOffers'
}
export const GoodTypeMostTypes = Object.values(GoodTopMostType)
