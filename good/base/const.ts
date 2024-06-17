export enum GoodType {
  PowerRental = 'PowerRental',
  MachineRental = 'MachineRental',
  MachineCustody = 'MachineCustody',
  LegacyPowerRental = 'LegacyPowerRental',
  TechniqueServiceFee = 'TechniqueServiceFee',
  ElectricityFee = 'ElectricityFee',
  DelegatedStaking = 'DelegatedStaking',
  FbmCrowdFunding = 'FbmCrowdFunding'
}
export const GoodTypes = Object.values(GoodType)

export enum BenefitType {
  BenefitTypePlatform = 'BenefitTypePlatform',
  BenefitTypePool = 'BenefitTypePool',
}

export const BenefitTypes = Object.values(BenefitType)

export enum StartMode {
  GoodStartModeTBD = 'GoodStartModeTBD',
  GoodStartModeInstantly = 'GoodStartModeInstantly',
  GoodStartModeNextDay = 'GoodStartModeNextDay',
  GoodStartModePreset = 'GoodStartModePreset'
}

export const StartModes = Object.values(StartMode)

export enum GoodLabel {
  GoodLabelPromotion = 'GoodLabelPromotion',
  GoodLabelNoviceExclusive = 'GoodLabelNoviceExclusive',
  GoodLabelInnovationStarter = 'GoodLabelInnovationStarter',
  GoodLabelLoyaltyExclusive = 'GoodLabelLoyaltyExclusive'
}
export const GoodLabels = Object.values(GoodLabel)

export enum GoodTopMostType {
  TopMostPromotion = 'TopMostPromotion',
  TopMostNoviceExclusive = 'TopMostNoviceExclusive',
  TopMostBestOffer = 'TopMostBestOffer',
  TopMostInnovationStarter = 'TopMostInnovationStarter',
  TopMostLoyaltyExclusive = 'TopMostLoyaltyExclusive',
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
  GoodSettledByPaymentPercent = 'GoodSettledByPaymentPercent',
  GoodSettledByPaymentAmount = 'GoodSettledByPaymentAmount',
  GoodSettledByProfitPercent = 'GoodSettledByProfitPercent'
}
export const GoodSettlementTypes = Object.values(GoodSettlementType)

export enum GoodStockMode {
  GoodStockByMiningPool = 'GoodStockByMiningPool',
  GoodStockByUnique = 'GoodStockByUnique'
}
export const GoodStockModes = Object.values(GoodStockMode)

export enum BenefitState {
  BenefitWait = 'BenefitWait',
  BenefitTransferring = 'BenefitTransferring',
  BenefitBookKeeping = 'BenefitBookKeeping',
  BenefitUserBookKeeping = 'BenefitUserBookKeeping',
  BenefitSimulateBookKeeping = 'BenefitSimulateBookKeeping',
  BenefitDone = 'BenefitDone',
  BenefitFail = 'BenefitFail'
}
export const BenefitStates = Object.values(BenefitState)

export enum CancelMode {
  CancellableBeforeStart = 'CancellableBeforeStart',
  CancellableBeforeBenefit = 'CancellableBeforeBenefit',
  Uncancellable = 'Uncancellable',
  CancellableBeforeUsed = 'CancellableBeforeUsed'
}
export const CancelModes = Object.values(CancelMode)

export enum GoodSaleMode {
  GoodSaleModeMainnetSpot = 'GoodSaleModeMainnetSpot',
  GoodSaleModeMainnetPresaleSpot = 'GoodSaleModeMainnetPresaleSpot',
  GoodSaleModeMainnetPresaleScratch = 'GoodSaleModeMainnetPresaleScratch',
  GoodSaleModeTestnetPresale = 'GoodSaleModeTestnetPresale'
}
export const GoodSaleModes = Object.values(GoodSaleMode)
