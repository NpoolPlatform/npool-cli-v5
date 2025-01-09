export enum GoodType {
  PowerRental = 'PowerRental',
  MachineRental = 'MachineRental',
  MachineCustody = 'MachineCustody',
  LegacyPowerRental = 'LegacyPowerRental',
  TechniqueServiceFee = 'TechniqueServiceFee',
  ElectricityFee = 'ElectricityFee',
  DelegatedStaking = 'DelegatedStaking',
  FbmCrowdFunding = 'FbmCrowdFunding',
  Pledge = 'Pledge'
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
  GoodStartModePreset = 'GoodStartModePreset',
  GoodStartModeConfirmed = 'GoodStartModeConfirmed',
  GoodStartModeWithParent = 'GoodStartModeWithParent'
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
export const GoodTopMostTypes = Object.values(GoodTopMostType)

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

export enum GoodSaleMode {
  GoodSaleModeMainnetSpot = 'GoodSaleModeMainnetSpot',
  GoodSaleModeMainnetPresaleSpot = 'GoodSaleModeMainnetPresaleSpot',
  GoodSaleModeMainnetPresaleScratch = 'GoodSaleModeMainnetPresaleScratch',
  GoodSaleModeTestnetPresale = 'GoodSaleModeTestnetPresale'
}
export const GoodSaleModes = Object.values(GoodSaleMode)

export enum CancelMode {
  CancellableBeforeStart = 'CancellableBeforeStart',
  CancellableBeforeBenefit = 'CancellableBeforeBenefit',
  Uncancellable = 'Uncancellable',
  CancellableBeforeUsed = 'CancellableBeforeUsed'
}
export const CancelModes = Object.values(CancelMode)

export enum GoodCommentHideReason {
  GoodCommentHideBySpam = 'GoodCommentHideBySpam',
  GoodCommentHideByNotThisGood = 'GoodCommentHideByNotThisGood',
  GoodCommentHideByFalseDescription = 'GoodCommentHideByFalseDescription'
}
export const GoodCommentHideReasons = Object.values(GoodCommentHideReason)

export enum GoodTopMostConstraint {
  TopMostCreditThreshold = 'TopMostCreditThreshold',
  TopMostRegisterBefore = 'TopMostRegisterBefore',
  TopMostOrderThreshold = 'TopMostOrderThreshold',
  TopMostPaymentAmount = 'TopMostPaymentAmount',
  TopMostKycMust = 'TopMostKycMust'
}
export const GoodTopMostConstraints = Object.values(GoodTopMostConstraint)

export enum ContractState {
  ContractWaitDeployment = 'ContractWaitDeployment',
  ContractInDeployment = 'ContractInDeployment',
  ContractDeploymentSuccess = 'ContractDeploymentSuccess',
  ContractDeploymentFail = 'ContractDeploymentFail'
}
export const ContractStates = Object.values(ContractState)
