export enum MiningpoolType {
  F2Pool = 'F2Pool',
  AntPool = 'AntPool',
}

export const MiningpoolTypes = Object.values(MiningpoolType)

export enum CoinType {
  BitCoin = 'CoinTypeBitCoin',
}

export const CoinTypes = Object.values(CoinType)

export enum RevenueType {
  FPPS = 'FPPS',
  PPLNS = 'PPLNS',
}

export const RevenueTypes = Object.values(RevenueType)

export enum WithdrawState {
  WithdrawStateWait = 'WithdrawStateWait',
  WithdrawStateProccessing = 'WithdrawStateProccessing',
  WithdrawStateSuccess = 'WithdrawStateSuccess',
  WithdrawStateFailed = 'WithdrawStateFailed',
}

export const WithdrawStates = Object.values(WithdrawState)
