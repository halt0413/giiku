import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type AuthRouteLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Group Actions',
}

const GroupParticipationLayout = ({ children }: AuthRouteLayoutProps) => children

export default GroupParticipationLayout
