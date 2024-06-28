import { computed } from 'vue'
import { vendorlocation, constant, notify } from '..'

const _vendorLocation = vendorlocation.useVendorLocationStore()

const getPageVendorLocations = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _vendorLocation.getVendorLocations({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_VENDOR_LOCATIONS',
        Message: 'MSG_GET_VENDOR_LOCATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<vendorlocation.VendorLocation>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageVendorLocations(++pageIndex, pageEnd, done)
  })
}

export const getVendorLocations = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageVendorLocations(pageStart, pages ? pageStart + pages : pages, done)
}

export const vendorLocations = computed(() => _vendorLocation.vendorLocations())

export const adminCreateVendorLocation = (vendorLocation: vendorlocation.VendorLocation, done?: (error: boolean, vendorLocation?: vendorlocation.VendorLocation) => void) => {
  _vendorLocation.adminCreateVendorLocation({
    ...vendorLocation,
    Message: {
      Error: {
        Title: 'MSG_CREATE_VENDOR_LOCATIONS',
        Message: 'MSG_CREATE_VENDOR_LOCATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateVendorLocation = (vendorLocation: vendorlocation.VendorLocation, done?: (error: boolean, vendorLocation?: vendorlocation.VendorLocation) => void) => {
  _vendorLocation.adminUpdateVendorLocation({
    ...vendorLocation,
    Message: {
      Error: {
        Title: 'MSG_CREATE_VENDOR_LOCATIONS',
        Message: 'MSG_CREATE_VENDOR_LOCATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminDeleteVendorLocation = (vendorLocation: vendorlocation.VendorLocation, done?: (error: boolean, vendorLocation?: vendorlocation.VendorLocation) => void) => {
  _vendorLocation.adminDeleteVendorLocation({
    ID: vendorLocation.ID,
    EntID: vendorLocation.EntID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_VENDOR_LOCATIONS',
        Message: 'MSG_DELETE_VENDOR_LOCATIONS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}
