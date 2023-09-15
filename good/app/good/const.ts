export enum API {
  GET_APPGOODS = '/good/v1/get/appgoods',
  UPDATE_APPGOOD = '/good/v1/update/appgood',
  GET_APPGOOD = '/good/v1/get/appgood',

  GET_N_APPGOODS = '/good/v1/get/n/appgoods',
  CREATE_N_APPGOOD = '/good/v1/create/n/appgood',
  UPDATE_N_APPGOOD = '/good/v1/update/n/appgood',
}

export enum CancelMode {
  CancellableBeforeStart = 'CancellableBeforeStart',
  CancellableBeforeBenefit = 'CancellableBeforeBenefit',
  UnCancellable = 'Uncancellable'
}

export const CancelModes = Object.values(CancelMode)
