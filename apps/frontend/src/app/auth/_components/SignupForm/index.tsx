'use client'
import { Alert, Button, PasswordInput, Space, Stack, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import styles from './index.module.css'

export default function SignupForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '')
    const password = String(fd.get('password') || '')
    if (!name || !password) return setError('すべての項目を入力してください。')

    setPending(true)
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Title order={1} className={styles.siteTitle}>
        サイト名
      </Title>
      <Space h={28} />
      <Stack gap="lg">
        <TextInput
          name="name"
          label="名前"
          classNames={{ label: styles.label, input: styles.pill }}
          size="md"
          radius="xl"
          required
        />
        <PasswordInput
          name="password"
          label="パスワード"
          classNames={{ label: styles.label, input: styles.pill }}
          size="md"
          radius="xl"
          required
        />
        {error && (
          <Alert title="エラー" color="red">
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          loading={pending}
          radius="xl"
          size="md"
          className={styles.signupBtn}
          fullWidth
        >
          アカウント作成
        </Button>
      </Stack>
    </form>
  )
}
