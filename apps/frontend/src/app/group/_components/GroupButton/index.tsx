'use client'

import Image from 'next/image'
import ActionButton from '@/components/ActionButton'
import styles from './index.module.css'
import { useRouter } from 'next/navigation'

export default function GroupButton() {
  const router = useRouter()

  const handleCreateGroup = () => {
    router.push('/group/groupcreate')
  }

  const handleParticipateGroup = () => {
    router.push('/group/groupparticipation')
  }

  return (
    <div className={styles.container}>
      <ActionButton onClick={handleCreateGroup}>
        <div className={styles.inner}>
          <span className={styles.text}>グループを作成する</span>
          <Image src="/group.svg" alt="グループ作成アイコン" width={32} height={32} />
        </div>
      </ActionButton>

      <ActionButton onClick={handleParticipateGroup}>
        <div className={styles.inner}>
          <span className={styles.text}>グループに参加する</span>
          <Image src="/done.svg" alt="グループ参加アイコン" width={32} height={32} />
        </div>
      </ActionButton>
    </div>
  )
}
