import { defineStore } from 'pinia'
import { Notification } from './types'
import { useI18n } from 'vue-i18n'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    Notifications: [] as Array<Notification>,
    i18n: useI18n()
  }),
  getters: {},
  actions: {
    pushNotification (notification: Notification) {
      if (notification.Description) {
        notification.Description = this.i18n.t(notification.Description)
      }
      if (notification.Message) {
        notification.Message = this.i18n.t(notification.Message)
      }
      if (notification.Title) {
        notification.Title = this.i18n.t(notification.Title)
      }
      this.Notifications.push(notification)
    },
    popNotification (): Notification | undefined {
      if (this.Notifications.length > 0) {
        const notification = this.Notifications[0]
        this.Notifications = this.Notifications.splice(0, 1)
        return notification
      }
      return undefined
    }
  }
})

export * from './helper'
export * from './const'
export * from './types'
