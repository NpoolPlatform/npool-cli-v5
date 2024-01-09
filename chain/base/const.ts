/** @default "DefaultFeedType" */
export enum CurrencyFeedType {
  CoinGecko = 'CoinGecko',
  CoinBase = 'CoinBase',
  StableUSDHardCode = 'StableUSDHardCode',
}
export const CurrencyFeedTypes = Object.values(CurrencyFeedType)

export enum ConsensusType {
  ConsensusProofOfWork = 'ConsensusProofOfWork',
  ConsensusProofOfSpaceTime = 'ConsensusProofOfSpaceTime',
  ConsensusDelegatedProofOfStake = 'ConsensusDelegatedProofOfStake',
  ConsensusProofOfStake = 'ConsensusProofOfStake'
}
export const ConsensusTypes = Object.values(ConsensusType)

export enum ConsensusPowerType {
  ConsensusPowerSHAHashrate = 'ConsensusPowerSHAHashrate',
  ConsensusPowerScryptHashrate = 'ConsensusPowerScryptHashrate',
  ConsensusZKProof = 'ConsensusZKProof',
  ConsensusStorageCapacity = 'ConsensusStorageCapacity'
}
export const ConsensusPowerTypes = Object.values(ConsensusPowerType)
