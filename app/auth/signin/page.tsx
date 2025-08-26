'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'react-toastify';

// Zod schema for form validation
const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'อีเมลเป็นข้อมูลที่จำเป็น')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string()
    .min(1, 'รหัสผ่านเป็นข้อมูลที่จำเป็น')
    .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: SignInFormValues) => {
    setLoading(true)
    
    // Show loading toast
    const loadingToastId = toast.loading('กำลังเข้าสู่ระบบ...')

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        toast.update(loadingToastId, {
          render: 'ข้อมูลประจำตัวไม่ถูกต้อง',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
        setError('ข้อมูลประจำตัวไม่ถูกต้อง')
      } else {
        toast.update(loadingToastId, {
          render: 'เข้าสู่ระบบสำเร็จ!',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        setError('')
        await getSession()
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            เข้าสู่ระบบด้วยบัญชีของคุณ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            หรือ{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              สร้างบัญชีใหม่
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ที่อยู่อีเมล</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="กรอกที่อยู่อีเมลของคุณ"
                      type="email"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="กรอกรหัสผ่านของคุณ"
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
