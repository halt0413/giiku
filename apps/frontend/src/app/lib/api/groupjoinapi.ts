'use client'

import type { GroupDto } from '@common/dto/group.dto'
import { apiClient } from '../apiClient'

export const joinGroup = async (joinData: GroupDto) => {
  try {
    const response = await apiClient('group/join', joinData)
    return response
  } catch (error) {
    console.error('API (joinGroup) エラー:', error)
    throw error
  }
}
