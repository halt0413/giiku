'use client'

import { apiClient } from '../apiClient'
import type { AuthDto } from '@common/dto/auth.dto'
import { HTTPError } from 'ky'

type LoginResponse = {
  token: string
}

export const login = async (credentials: AuthDto) => {
  try {
    console.log('ログインAPIを呼び出します。ペイロード:', credentials)
    
    const response: LoginResponse = await apiClient
      .post('auth/login', { json: credentials })
      .json()

    // 
    console.log('ログインAPI成功。レスポンス:', response)

    if (response.token) {
      localStorage.setItem('auth_token', response.token)
      console.log('トークンをlocalStorageに保存しました。')
    } else {
      console.warn('レスポンスに Token がありません。')
    }

    return response
  } catch (error) {
    // 
    console.error('ログインAPIでエラーが発生しました:', error)

    localStorage.removeItem('auth_token')

    if (error instanceof HTTPError) {
      console.error('HTTPErrorステータス:', error.response.status)
      try {
        const errorBody = await error.response.json()
        // 
        console.error('APIエラーボディ:', errorBody)
        throw new Error(errorBody.message || 'ログインに失敗しました。')
      } catch (e) {
        console.error('エラーボディの解析に失敗:', e)
        throw new Error(
          'ログインに失敗し、エラーレスポンスの解析にも失敗しました。',
        )
      }
    }
    throw new Error('不明なエラーが発生しました。')
  }
}

export const logout = () => {
  localStorage.removeItem('auth_token')
  window.location.href = '/auth/login'
}