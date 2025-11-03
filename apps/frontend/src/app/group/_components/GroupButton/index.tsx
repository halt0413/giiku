'use client'

import Image from 'next/image'
import ActionButton from '@/components/ActionButton'
import styles from './index.module.css'

export default function GroupButton() {
  return (
    <div className={styles.container}>
      <ActionButton>
        <div className={styles.inner}>
          <span className={styles.text}>グループを作成する</span>
          <Image src="/group.svg" alt="グループ作成アイコン" width={32} height={32} />
        </div>
      </ActionButton>

      <ActionButton>
        <div className={styles.inner}>
          <span className={styles.text}>グループに参加する</span>
          <Image src="/done.svg" alt="グループ参加アイコン" width={32} height={32} />
        </div>
      </ActionButton>
    </div>
  )
}
