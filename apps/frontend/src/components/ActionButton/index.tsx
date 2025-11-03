'use client'
import styles from './index.module.css'

type Props = {
  children?: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  ariaLabel?: string
}

export default function ActionButton({ children, onClick, variant = 'primary', ariaLabel }: Props) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
