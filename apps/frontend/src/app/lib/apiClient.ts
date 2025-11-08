'use client'

import ky from 'ky'

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  hooks: {
    beforeRequest: [
      (request) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token')

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }
        }
      },
    ],

    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401 && typeof window !== 'undefined') {
          console.error('認証エラー (401)。ログインページにリダイレクトします。')
          localStorage.removeItem('auth_token')
          window.location.href = '/auth/login'
        }
      },
    ],
  },
})
