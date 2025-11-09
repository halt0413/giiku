'use client'

import { apiClient } from '../apiClient'
import { type EventDto } from '@common/dto/event.dto'
export { type EventDto } from '@common/dto/event.dto'

export interface CreateGroupFormData {
  place: string
  time: string
  keyword: string
  penaltyInterval: number
  penaltyAmount: number
}

type ApiCreateEventPayload = Pick<
  EventDto,
  'location_name' | 'meeting_time'
> & {
  minute?: number
  penalty?: number
  latitude?: number
  longitude?: number
}

export const createGroup = async (formData: CreateGroupFormData) => {

  const apiPayload: ApiCreateEventPayload = {
    location_name: formData.place,
    meeting_time: formData.time, 
    minute: formData.penaltyInterval,
    penalty: formData.penaltyAmount,
  }

  try {
    const response = await apiClient.post(
      'event/create',
      {
        json: apiPayload,
      },
    )
    return await response.json()
  } catch (error) {
    console.error('Error creating group:', error)
    throw error
  }
}