import { useLocalUserStore } from '../appuser/user/local'

const user = useLocalUserStore()
export const loginedUser = () => user.User
export const loginedUserID = () => user.loginedUserID
