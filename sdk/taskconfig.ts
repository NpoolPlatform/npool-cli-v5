import { computed } from 'vue'
import { inspiretaskconfig, constant, notify } from '..'

const _taskconfig = inspiretaskconfig.useTaskConfigStore()

const getPageTaskConfigs = (targetAppID: string, pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  _taskconfig.adminGetTaskConfigs({
    TargetAppID: targetAppID,
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TASK_CONFIGS',
        Message: 'MSG_GET_TASK_CONFIGS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, orders?: Array<inspiretaskconfig.TaskConfig>, total?: number) => {
    if (error || !orders?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTaskConfigs(targetAppID, ++pageIndex, pageEnd, done)
  })
}

export const getTaskConfigs = (targetAppID: string, pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTaskConfigs(targetAppID, pageStart, pages ? pageStart + pages : pages, done)
}

export const taskConfigs = computed(() => _taskconfig.taskConfigs())
