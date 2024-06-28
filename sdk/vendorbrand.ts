import { computed } from 'vue'
import { vendorbrand, constant, notify } from '..'

const _vendorBrand = vendorbrand.useVendorBrandStore()

const getPageVendorBrands = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _vendorBrand.getVendorBrands({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_VENDOR_BRANDS',
        Message: 'MSG_GET_VENDOR_BRANDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<vendorbrand.VendorBrand>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageVendorBrands(++pageIndex, pageEnd, done)
  })
}

export const getVendorBrands = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageVendorBrands(pageStart, pages ? pageStart + pages : pages, done)
}

export const vendorBrands = computed(() => _vendorBrand.vendorBrands)

export const adminCreateVendorBrand = (vendorBrand: vendorbrand.VendorBrand, done?: (error: boolean, vendorBrand?: vendorbrand.VendorBrand) => void) => {
  _vendorBrand.adminCreateVendorBrand({
    ...vendorBrand,
    Message: {
      Error: {
        Title: 'MSG_CREATE_VENDOR_BRANDS',
        Message: 'MSG_CREATE_VENDOR_BRANDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateVendorBrand = (vendorBrand: vendorbrand.VendorBrand, done?: (error: boolean, vendorBrand?: vendorbrand.VendorBrand) => void) => {
  _vendorBrand.adminUpdateVendorBrand({
    ...vendorBrand,
    Message: {
      Error: {
        Title: 'MSG_CREATE_VENDOR_BRANDS',
        Message: 'MSG_CREATE_VENDOR_BRANDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteVendorBrand = (vendorBrand: vendorbrand.VendorBrand, done?: (error: boolean, vendorBrand?: vendorbrand.VendorBrand) => void) => {
  _vendorBrand.adminDeleteVendorBrand({
    ID: vendorBrand.ID,
    EntID: vendorBrand.EntID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_VENDOR_BRANDS',
        Message: 'MSG_DELETE_VENDOR_BRANDS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}
