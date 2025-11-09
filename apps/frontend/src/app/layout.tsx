import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import Providers from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'iOS Fullscreen',
  description: 'iOS-safe fullscreen layout',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'iOS Fullscreen',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
