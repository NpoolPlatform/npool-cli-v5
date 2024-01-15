import { computed } from 'vue'
import { notify } from '..'

const _notify = notify.useNotificationStore()
export const notifies = computed(() => _notify.Notifications)
