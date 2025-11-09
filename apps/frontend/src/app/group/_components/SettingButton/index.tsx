'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './index.module.css'

export default function SettingButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/group/setting')
  }

  return (
    <div className={styles.container}>
      <Image
        src="/settings.svg"
        alt="設定アイコン"
        width={32}
        height={32}
        className={styles.icon}
        onClick={handleClick}
        onKeyUp={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
        role="button"
        tabIndex={0}
      />
    </div>
  )
}
