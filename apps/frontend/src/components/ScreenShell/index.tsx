'use client'
import styles from './index.module.css'

type Props = {
  title?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export default function ScreenShell({ title = 'タイトル', children }: Props) {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.h1}>{title}</h1>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <button type="button" className={styles.btnPrimary}>
          アクション
        </button>
      </footer>
    </div>
  )
}
