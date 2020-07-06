export interface AuthState {
  status: '' | 'success' | 'error'
  error?: string
  token?: string
}
