import type { Metadata } from 'next'
import type { ReactNode } from 'react'

type AuthRouteLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Login',
}

const LoginLayout = ({ children }: AuthRouteLayoutProps) => children

export default LoginLayout
