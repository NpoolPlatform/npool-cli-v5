import { Notification } from '../notify'

export interface ReqMessage {
  Info?: Notification
  Error?: Notification
}

export interface BaseRequest {
  Message?: ReqMessage
}

export interface NotifyRequest {
  NotifyMessage?: ReqMessage
}

export interface BasePager {
  LoadingPages: number[]
  LoadedPages: number[]
  PageStart: number
  PageLimit: number
  TotalPages: number
  TotalRows: number

  loadPage (page: number): void
  loadedPage (page: number): void
  incrementPageStart (): void
  subtractPageStart (): void
  setPageLimit (limit: number): void
  setTotalPages (pages: number): void
  setTotalRows (rows: number): void
  totalPages (): number
  totalRows (): number
  pageStart (): number
  pageLimit (): number
  pageLoaded (page: number): boolean
  pageLoading (page: number): boolean
}

export class Pager implements BasePager {
  LoadedPages: number[] = []
  LoadingPages: number[] = []
  PageStart = 0
  PageLimit = 10
  TotalPages = 0
  TotalRows = 0

  loadPage (page: number): void {
    this.LoadingPages.push(page)
  }

  loadedPage (page: number): void {
    const index = this.LoadingPages.findIndex((el) => el === page)
    this.LoadingPages.splice(index >= 0 ? index : 0, index >= 0 ? 1 : 0)
    this.LoadedPages.push(page)
  }

  incrementPageStart (): void {
    this.PageStart++
  }

  subtractPageStart (): void {
    this.PageStart--
    this.PageStart = Math.max(this.PageStart, 0)
  }

  setPageLimit (limit: number): void {
    this.PageLimit = limit
  }

  setTotalPages (pages: number): void {
    this.TotalPages = pages
  }

  setTotalRows (rows: number): void {
    this.TotalRows = rows
  }

  totalPages (): number {
    return this.TotalPages
  }

  totalRows (): number {
    return this.TotalRows
  }

  pageStart (): number {
    return this.PageStart
  }

  pageLimit (): number {
    return this.PageLimit
  }

  pageLoaded (page: number): boolean {
    return this.LoadedPages.includes(page)
  }

  pageLoading (page: number): boolean {
    return this.LoadingPages.includes(page)
  }
}
