'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import styles from './index.module.css'
import { TextInput } from '@/components/TextInput'
import GroupButton from '@/components/GroupButton'
import { joinGroup } from '@/app/lib/api/groupjoinapi'

export default function GroupParticipationForm() {
  const router = useRouter()
  const [invitationCode, setInvitationCode] = useState('')
  const [pending, setPending] = useState(false)

  //
  const handleBack = () => {
    router.back()
  }

  //
  const handleJoin = async () => {
    if (!invitationCode.trim()) {
      notifications.show({
        title: '入力エラー',
        message: 'あいことばを入力してください。',
        color: 'red',
      })
      return
    }
    if (pending) return

    setPending(true)

    try {
      await joinGroup(invitationCode)
      notifications.show({
        title: '成功',
        message: 'グループに参加しました！',
        color: 'teal',
      })
      //
      router.push('/group/groupactions')
    } catch (err) {
      notifications.show({
        title: 'エラー',
        message: (err as Error).message || 'グループに参加できませんでした。',
        color: 'red',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <h1 className={styles.title}>グループ参加</h1>

        <TextInput
          id="invitation-code"
          label="あいことば"
          placeholder="あいことばを入力"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          disabled={pending}
        />

        <div className={styles.buttonRow}>
          <GroupButton variant="cancel" onClick={handleBack}>
            戻る
          </GroupButton>
          <GroupButton
            variant="submit"
            onClick={pending ? undefined : handleJoin}
            aria-disabled={pending}
          >
            {pending ? '参加中...' : '決定'}
          </GroupButton>
        </div>
      </main>
    </div>
  )
}
