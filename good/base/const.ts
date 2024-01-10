export enum GoodType {
  PowerRenting = 'PowerRenting',
  MachineRenting = 'MachineRenting',
  MachineHosting = 'MachineHosting',
  DelegatedStaking = 'DelegatedStaking',
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
  GoodStartModeInstantly = 'GoodStartModeInstantly',
  GoodStartModeNextDay = 'GoodStartModeNextDay',
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

export enum GoodUnitType {
  GoodUnitByDuration = 'GoodUnitByDuration',
  GoodUnitByQuantity = 'GoodUnitByQuantity',
  GoodUnitByDurationAndQuantity = 'GoodUnitByDurationAndQuantity'
}
export const GoodUnitTypes = Object.values(GoodUnitType)

export enum GoodUnitCalculateType {
  GoodUnitCalculateBySelf = 'GoodUnitCalculateBySelf',
  GoodUnitCalculateByParent = 'GoodUnitCalculateByParent'
}
export const GoodUnitCalculateTypes = Object.values(GoodUnitCalculateType)

export enum GoodDurationType {
  GoodDurationByHour = 'GoodDurationByHour',
  GoodDurationByDay = 'GoodDurationByDay',
  GoodDurationByMonth = 'GoodDurationByMonth',
  GoodDurationByYear = 'GoodDurationByYear'
}
export const GoodDurationTypes = Object.values(GoodDurationType)

export enum GoodSettlementType {
  GoodSettledByCash = 'GoodSettledByCash',
  GoodSettledByProfit = 'GoodSettledByProfit'
}
export const GoodSettlementTypes = Object.values(GoodSettlementType)
