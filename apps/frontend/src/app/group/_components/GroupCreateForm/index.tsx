'use client'

import styles from './index.module.css'
import { TextInput } from '@/components/TextInput'
import GroupButton from '@/components/GroupButton'

export default function GroupCreateForm() {
  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <h1 className={styles.title}>グループ作成</h1>

        <label className={styles.label} htmlFor="place">
          集合場所
        </label>
        <TextInput id="place" label="" placeholder="" />

        <label className={styles.label} htmlFor="time">
          集合時間
        </label>
        <TextInput id="time" type="time" label="" />

        <label className={styles.label} htmlFor="keyword">
          あいことば
        </label>
        <TextInput id="keyword" label="" placeholder="" />

        <legend className={styles.label}>遅刻者ペナルティ</legend>
        <div className={styles.penaltyRow}>
          <TextInput type="number" min="0" label="" aria-label="遅刻間隔 (分毎)" />
          <span className={styles.unit}>分毎</span>
          <TextInput type="number" min="0" label="" aria-label="ペナルティ金額 (円)" />
          <span className={styles.unit}>円</span>
        </div>

        <div className={styles.buttonRow}>
          <GroupButton variant="cancel">戻る</GroupButton>
          <GroupButton variant="submit">決定</GroupButton>
        </div>
      </main>
    </div>
  )
}
