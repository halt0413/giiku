'use client'

import { Button, PasswordInput, Space, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/navigation'
import { signup } from '@/app/lib/api/signapi'
import type { AuthDto } from '@common/dto/auth.dto'
import Image from 'next/image' // 

export default function SignupForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const id = String(fd.get('id') || '').trim()
    const password = String(fd.get('password') || '').trim()

    if (!id || !password) {
      setError('すべての項目を入力してください。')
      return
    }

    setPending(true)
    setError(null)

    const payload: AuthDto = { id, password }

    try {
      await signup(payload)
      router.push('/auth/login')
    } catch (err) {
      setError((err as Error).message || 'アカウントの作成に失敗しました。')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>

      <Image
        src="/icon.png"
        alt="サイトロゴ"
        width={270}
        height={280}
        className={styles.logo}
        priority
      />
      <Space h={28} />
      <Stack gap="lg">
        <TextInput
          name="id"
          label="名前"
          classNames={{ label: styles.label, input: styles.pill }}
          size="md"
          radius="xl"
          required
        />
        <PasswordInput
          name="password"
          label="パスワード"
          autoComplete="new-password"
          classNames={{ label: styles.label, input: styles.pill }}
          size="md"
          radius="xl"
          required
        />
        {error && <div className={styles.error}>{error}</div>}
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