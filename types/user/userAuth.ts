export default interface UserAuth {
  status: UserAuthStatus
  token: string
  errorMsg: string
}

export enum UserAuthStatus {
  NONE,
  SUCCESS,
  ERROR,
}
