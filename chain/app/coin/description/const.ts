export enum API {
  CREATE_COINDESCRIPTION = '/chain/v1/create/coindescription',
  GET_COINDESCRIPTIONS = '/chain/v1/get/coindescriptions',
  UPDATE_COINDESCRIPTION = '/chain/v1/update/coindescription',

  CREATE_APP_COINDESCRIPTION = '/chain/v1/create/app/coindescription',
  GET_APP_COINDESCRIPTIONS = '/chain/v1/get/app/coindescriptions',
  UPDATE_APP_COINDESCRIPTION = '/chain/v1/update/app/coindescription',
}

export enum CoinDescriptionUsedFor {
  DefaultUsedFor = 'DefaultUsedFor',
  ProductPage = 'ProductPage',
}

export const CoinDescriptionUsedFors = Object.values(CoinDescriptionUsedFor)
