'use client'

import styles from './index.module.css'
import { TextInput } from '@/components/TextInput'
import GroupButton from '@/components/GroupButton'
import { useRouter } from 'next/navigation'

export default function GroupParticipationForm() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <h1 className={styles.title}>設定</h1>

        <TextInput id="display-name" label="表示名" placeholder="表示名を入力" />

        <div className={styles.buttonRow}>
          <GroupButton variant="cancel" onClick={handleBack}>
            戻る
          </GroupButton>
        </div>
      </main>
    </div>
  )
}
