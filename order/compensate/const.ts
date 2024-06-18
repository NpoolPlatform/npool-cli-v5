export enum API {
    GET_COMPENSATES = '/order/v1/get/compensates',
    GET_MY_COMPENSATES = '/order/v1/get/my/compensates',
    ADMIN_GET_COMPENSATES = '/order/v1/admin/get/compensates'
}

export enum CompensateType {
  CompensateMalfunction = 'CompensateMalfunction',
  CompensateWalfare = 'CompensateWalfare',
  CompensateStarterDelay = 'CompensateStarterDelay'
}
export const CompensateTypes = Object.values(CompensateType)
