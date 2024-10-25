import { computed } from 'vue'
import { eventinspire, constant, notify } from '..'

const _eventInspire = eventinspire.useEventStore()

const getPageEventInspires = (targetAppID: string, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _eventInspire.adminGetEvents({
    TargetAppID: targetAppID,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_EVENTS',
        Message: 'MSG_GET_EVENTS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<eventinspire.Event>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageEventInspires(targetAppID, ++pageIndex, pageEnd, done)
  })
}

export const getEventInspires = (targetAppID: string, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageEventInspires(targetAppID, pageStart, pages ? pageStart + pages : pages, done)
}

export const eventInspires = computed(() => _eventInspire.events())
