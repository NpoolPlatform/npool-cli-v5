import { KYCState, KYCStates } from '../appuser/kyc/const'
import { useLocalUserStore } from '../appuser/user/local'

const user = useLocalUserStore()
export const loginedUser = () => user.User
export const loginedUserID = () => user.loginedUserID
export const logined = () => user.logined
export const kycConfigured = () => KYCStates.includes(user.User?.State)
export const kycRejected = () => KYCState.Rejected === user.User?.State
export const kycProcessing = () => KYCState.Reviewing === user.User?.State
export const kycApproved = () => KYCState.Approved === user.User?.State
export const mobileBound = () => user.User?.PhoneNO?.length > 0
export const emailBound = () => user.User?.EmailAddress?.length > 0
export const googleAuthenticated = () => user.User?.GoogleAuthVerified
