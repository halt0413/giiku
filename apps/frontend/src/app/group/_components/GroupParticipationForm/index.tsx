import styles from './index.module.css'
import { TextInput } from '@/components/TextInput'
import GroupButton from '@/components/GroupButton'

export default function GroupParticipationForm() {
  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <h1 className={styles.title}>グループ参加</h1>

        <label className={styles.label} htmlFor="place">
          あいことば
        </label>
        <TextInput id="place" label="" placeholder="" />

        <div className={styles.buttonRow}>
          <GroupButton variant="cancel">戻る</GroupButton>
          <GroupButton variant="submit">決定</GroupButton>
        </div>
      </main>
    </div>
  )
}
