'use client'
import { Alert, Button, PasswordInput, Space, Stack, TextInput, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './index.module.css'
import { login } from '@/app/lib/api/loginapi'
import type { AuthDto } from '@common/dto/auth.dto' 

export default function LoginForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const id = String(fd.get('id') || '').trim()
    const password = String(fd.get('password') || '').trim()

    if (!id || !password) {
      setError('IDとパスワードを入力してください。')
      return
    }

    setPending(true)
    setError(null)
    
    const credentials: AuthDto = { id, password }

    try {
      await login(credentials)
      router.push('/group/groupactions') 

    } catch (err) {
      setError((err as Error).message || 'ログインに失敗しました。')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Title order={1} className={styles.siteTitle}>
        サイト名
      </Title>
      <Space h={28} />
      <Stack gap="lg">
        <TextInput
          name="id"
          type="text"
          autoComplete="id"
          label="ID"
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
        <Button
          onClick={() => router.push('/auth/signup')}
          variant="link"
          color="gray"
          size="sm"
          fullWidth
          disabled={pending} 
        >
          signupはこちら
        </Button>
        <Button
          onClick={() => router.push('/group/groupactions')}
          variant="link"
          color="gray"
          size="sm"
          fullWidth
          disabled={pending} 
        >
          group
        </Button>
      </Stack>
    </form>
  )
}