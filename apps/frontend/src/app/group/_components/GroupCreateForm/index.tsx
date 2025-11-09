'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './index.module.css'
import { TextInput } from '@/components/TextInput'
import GroupButton from '@/components/GroupButton'
import { createGroup, type CreateGroupFormData } from '@/app/lib/api/groupcreateapi'

export default function GroupCreateForm() {
  const router = useRouter()
  const [place, setPlace] = useState('')
  const [time, setTime] = useState('')
  const [keyword, setKeyword] = useState('')
  const [penaltyInterval, setPenaltyInterval] = useState(1)
  const [penaltyAmount, setPenaltyAmount] = useState(100)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!place || !time || !keyword) {
      setError('集合場所、集合時間、あいことばは必須です。')
      setIsLoading(false)
      return
    }

    const groupData: CreateGroupFormData = {
      place,
      time,
      keyword,
      penaltyInterval: Number(penaltyInterval),
      penaltyAmount: Number(penaltyAmount),
    }

    try {
      await createGroup(groupData)
      router.push('/home/menu')
    } catch (err) {
      setError('グループの作成に失敗しました。')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h1 className={styles.title}>グループ作成</h1>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label} htmlFor="place">
          集合場所
        </label>
        <TextInput
          id="place"
          label=""
          placeholder=""
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          disabled={isLoading}
        />

        <label className={styles.label} htmlFor="time">
          集合時間
        </label>
        <TextInput
          id="time"
          type="time"
          label=""
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={isLoading}
        />

        <label className={styles.label} htmlFor="keyword">
          あいことば
        </label>
        <TextInput
          id="keyword"
          label=""
          placeholder=""
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={isLoading}
        />

        <legend className={styles.label}>遅刻者ペナルティ</legend>
        <div className={styles.penaltyRow}>
          <TextInput
            type="number"
            min="1"
            label=""
            aria-label="遅刻間隔 (分毎)"
            value={penaltyInterval}
            onChange={(e) => setPenaltyInterval(Number(e.target.value))}
            disabled={isLoading}
          />
          <span className={styles.unit}>分毎</span>
          <TextInput
            type="number"
            min="0"
            label=""
            aria-label="ペナルティ金額 (円)"
            value={penaltyAmount}
            onChange={(e) => setPenaltyAmount(Number(e.target.value))}
            disabled={isLoading}
          />
          <span className={styles.unit}>円</span>
        </div>

        <div className={styles.buttonRow}>
          <GroupButton
            variant="cancel"
            type="button"
            onClick={isLoading ? undefined : handleCancel}
          >
            戻る
          </GroupButton>
          <GroupButton
            variant="submit"
            type="submit"
            aria-disabled={isLoading}
          >
            {isLoading ? '作成中...' : '決定'}
          </GroupButton>
        </div>
      </form>
    </div>
  )
}