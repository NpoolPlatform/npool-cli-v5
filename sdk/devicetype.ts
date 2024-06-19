import { computed } from 'vue'
import { devicetype, constant, notify } from '..'

const _deviceType = devicetype.useDeviceTypeStore()

const getPageDeviceTypes = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _deviceType.getDeviceTypes({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_DEVICE_TYPES',
        Message: 'MSG_GET_DEVICE_TYPES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<devicetype.DeviceType>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageDeviceTypes(++pageIndex, pageEnd, done)
  })
}

export const getDeviceTypes = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageDeviceTypes(pageStart, pages ? pageStart + pages : pages, done)
}

export const deviceTypes = computed(() => _deviceType.deviceTypes())

export const adminCreateDeviceType = (deviceType: devicetype.DeviceType, done?: (error: boolean, deviceType?: devicetype.DeviceType) => void) => {
  _deviceType.adminCreateDeviceType({
    DeviceType: deviceType.Type,
    ManufacturerID: deviceType.ManufacturerID,
    PowerConsumption: deviceType.PowerConsumption,
    ShipmentAt: deviceType.ShipmentAt,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DEVICE_TYPES',
        Message: 'MSG_CREATE_DEVICE_TYPES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}

export const adminUpdateDeviceType = (deviceType: devicetype.DeviceType, done?: (error: boolean, deviceType?: devicetype.DeviceType) => void) => {
  _deviceType.adminUpdateDeviceType({
    ID: deviceType.ID,
    EntID: deviceType.EntID,
    DeviceType: deviceType.Type,
    ManufacturerID: deviceType.ManufacturerID,
    PowerConsumption: deviceType.PowerConsumption,
    ShipmentAt: deviceType.ShipmentAt,
    Message: {
      Error: {
        Title: 'MSG_CREATE_DEVICE_TYPES',
        Message: 'MSG_CREATE_DEVICE_TYPES_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, done)
}
