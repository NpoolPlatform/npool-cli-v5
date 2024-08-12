import { transferaccount, constant, notify } from '..'
import { CreateTransferAccountRequest, TransferAccount } from '../account/user/transfer'

const transfer = transferaccount.useTransferAccountStore()

const getPageTransfers = (pageIndex: number, pageEnd: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  transfer.getTransfers({
    Offset: pageIndex * constant.DefaultPageSize,
    Limit: constant.DefaultPageSize,
    Message: {
      Error: {
        Title: 'MSG_GET_TRANSFERS',
        Message: 'MSG_GET_TRANSFERS_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      }
    }
  }, (error: boolean, rows?: Array<TransferAccount>, total?: number) => {
    if (error || !rows?.length || (pageEnd > 0 && pageIndex === pageEnd - 1)) {
      const totalPages = Math.ceil(total as number / constant.DefaultPageSize)
      done?.(error, totalPages, total as number)
      return
    }
    getPageTransfers(++pageIndex, pageEnd, done)
  })
}

export const getTransfers = (pageStart: number, pages: number, done?: (error: boolean, totalPages: number, totalRows: number) => void) => {
  getPageTransfers(pageStart, pages ? pageStart + pages : pages, done)
}

export const createTransfer = (target: CreateTransferAccountRequest, done?: (error: boolean) => void) => {
  transfer.createTransfer({
    ...target,
    Message: {
      Error: {
        Title: 'MSG_CREATE_TRANSFER',
        Message: 'MSG_CREATE_TRANSFER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_CREATE_TRANSFER',
        Message: 'MSG_CREATE_TRANSFER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error:boolean) => {
    done?.(error)
  })
}

export const deleteTransfer = (target: TransferAccount, done?: (error: boolean) => void) => {
  transfer.deleteTransfer({
    ...target,
    TransferID: target.ID,
    Message: {
      Error: {
        Title: 'MSG_DELETE_TRANSFER',
        Message: 'MSG_DELETE_TRANSFER_FAIL',
        Popup: true,
        Type: notify.NotifyType.Error
      },
      Info: {
        Title: 'MSG_DELETE_TRANSFER',
        Message: 'MSG_DELETE_TRANSFER_SUCCESS',
        Popup: true,
        Type: notify.NotifyType.Success
      }
    }
  }, (error:boolean) => {
    done?.(error)
  })
}

export const userTransferAccounts = (userID?: string | undefined) => transfer.transferAccounts(undefined, userID)
