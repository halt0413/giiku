import type { ReactNode } from 'react'
import styles from './layout.module.css'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.panel}>{children}</div>
    </section>
  )
}
