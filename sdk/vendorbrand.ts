import { computed } from 'vue'
import { vendorbrand, constant, notify } from '..'

const _vendorbrand = vendorbrand.useVendorBrandStore()

const getPageVendorBrands = (offset: number, limit: number, pageIndex: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  const reqOffset = offset + pageIndex * constant.DefaultPageSize
  let reqLimit = constant.DefaultPageSize
  if (limit > 0) {
    reqLimit = limit - pageIndex * constant.DefaultPageSize
  }
  _vendorbrand.getVendorBrands({
    Offset: reqOffset,
    Limit: reqLimit,
    Message: {
      Error: {
        Title: 'MSG_GET_APP_VENDOR_BRANDS',
        Message: 'MSG_GET_APP_VENDOR_BRANDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<vendorbrand.VendorBrand>, totalRows?: number) => {
    if (error || !rows?.length) {
      if (limit === 0) {
        limit = totalRows as number
      } else {
        limit = Math.max(limit - (pageIndex + 1) * constant.DefaultPageSize)
      }
      done?.(error, limit, totalRows as number)
      return
    }
    if (limit <= pageIndex * constant.DefaultPageSize && limit > 0) {
      done?.(error, totalRows as number - offset, 0)
      return
    }
    getPageVendorBrands(offset, limit, ++pageIndex, done)
  })
}

export const getVendorBrands = (offset: number, limit: number, done?: (error: boolean, fetchedRows: number, totalRows: number) => void) => {
  getPageVendorBrands(offset, limit, 0, done)
}

export const vendorBrands = computed(() => _vendorbrand.vendorBrands())
