import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type AuthRouteLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Signup',
}

const SignupLayout = ({ children }: AuthRouteLayoutProps) => children

export default SignupLayout
