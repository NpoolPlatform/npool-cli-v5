import { defineStore } from 'pinia'

export const useLocaleStringStore = defineStore('local-localestring-v4', {
  getters: {
    getLocaleString () {
      return (num: number | string, minDigits?: number, maxDigits?: number) => {
        const _num = Number(num)

        if (minDigits !== undefined && maxDigits === undefined) {
          return _num.toLocaleString('en-US', { minimumFractionDigits: minDigits })
        }
        if (maxDigits !== undefined && minDigits === undefined) {
          return _num.toLocaleString('en-US', { maximumFractionDigits: maxDigits })
        }
        if (maxDigits !== undefined && minDigits !== undefined) {
          return _num.toLocaleString('en-US', { minimumFractionDigits: minDigits, maximumFractionDigits: maxDigits })
        }
        return _num.toLocaleString('en-US', { maximumFractionDigits: 4 })
      }
    }
  }
})
