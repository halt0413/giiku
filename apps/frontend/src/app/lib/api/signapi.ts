'use client'

import { apiClient } from '@/app/lib/apiClient'
import type { AuthDto } from '@common/dto/auth.dto'
import { HTTPError } from 'ky'

export const signup = async (credentials: AuthDto) => {
  try {
    const response = await apiClient.post('auth/sign', { json: credentials }).json()
    return response
  } catch (error) {
    console.error('APIエラー:', error)

    if (error instanceof HTTPError) {
      const errorBody = await error.response.json()
      throw new Error(errorBody.message || 'アカウントの作成に失敗しました。')
    }
    throw new Error('不明なエラーが発生しました。')
  }
}
