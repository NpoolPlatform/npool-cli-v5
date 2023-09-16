export enum API {
  UPDATE_KYCREVIEW = '/review/v2/update/kycreview',
  GET_KYCREVIEWS = '/review/v2/get/kycreviews',
  UPDATE_APP_KYCREVIEW = '/review/v2/update/app/kycreview',
  GET_APP_KYCREVIEWS = '/review/v2/get/app/kycreviews',
}

export enum KycState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'Approved',
  Wait = 'Wait',
  Rejected ='Rejected'
}
