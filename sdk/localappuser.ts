import { useLocalUserStore } from '../appuser/user/local'
import { computed } from 'vue'

const user = useLocalUserStore()
export const loginedUser = computed(() => user.User)
export const loginedUserID = computed(() => user.loginedUserID)
