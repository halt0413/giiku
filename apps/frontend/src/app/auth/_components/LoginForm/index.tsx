'use client'
import { Alert, Button, PasswordInput, Space, Stack, TextInput, Title } from '@mantine/core'
import { useState } from 'react'
import styles from './index.module.css'

export default function LoginForm() {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '').trim()
    const password = String(fd.get('password') || '').trim()
    if (!name || !password) return setError('ユーザー名とパスワードを入力してください。')

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
          autoComplete="username"
          label="ユーザー名"
          classNames={{ label: styles.label, input: styles.pill }}
          size="md"
          radius="xl"
          required
        />
        <PasswordInput
          name="password"
          autoComplete="current-password"
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
          className={styles.loginBtn}
          fullWidth
        >
          ログイン
        </Button>
      </Stack>
    </form>
  )
}
