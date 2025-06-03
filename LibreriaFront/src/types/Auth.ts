export interface AuthResponse {
  access: string
  refresh: string
}

export interface DecodedToken {
  email: string
  nombre: string
  rol: 'admin' | 'cliente'
  exp: number
}

