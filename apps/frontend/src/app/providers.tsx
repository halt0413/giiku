'use client'

import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
}
