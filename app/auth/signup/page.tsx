'use client'

import { useState } from 'react'
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
import { toast } from 'react-toastify'

// Zod schema for form validation
const signUpSchema = z.object({
  name: z
    .string()
    .min(1, 'ชื่อเป็นข้อมูลที่จำเป็น')
    .min(2, 'ชื่อจะต้องมีอย่างน้อย 2 ตัวอักษร'),
  email: z
    .string()
    .min(1, 'อีเมลเป็นข้อมูลที่จำเป็น')
    .email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z
    .string()
    .min(1, 'รหัสผ่านเป็นข้อมูลที่จำเป็น')
    .min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  confirmPassword: z
    .string()
    .min(1, 'กรุณายืนยันรหัสผ่านของคุณ'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: SignUpFormValues) => {
    setLoading(true)
    
    // Show loading toast
    const loadingToastId = toast.loading('กำลังสร้างบัญชี...')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.update(loadingToastId, {
          render: 'สร้างบัญชีสำเร็จ! กรุณาเข้าสู่ระบบ',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })
        setError('')
        router.push('/auth/signin?message=Registration successful')
      } else {
        toast.update(loadingToastId, {
          render: data.error || 'เกิดข้อผิดพลาดในการสร้างบัญชี',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        })
        setError(data.error || 'เกิดข้อผิดพลาดในการสร้างบัญชี')
      }
    } catch (error) {
      toast.update(loadingToastId, {
        render: 'เกิดข้อผิดพลาดในการสร้างบัญชี',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      })
      setError('เกิดข้อผิดพลาดในการสร้างบัญชี')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            สร้างบัญชีของคุณ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            หรือ{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
              เข้าสู่ระบบด้วยบัญชีของคุณ
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อเต็ม</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="กรอกชื่อเต็มของคุณ"
                      type="text"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="กรอกรหัสผ่านของคุณ (ขั้นต่ำ 6 ตัวอักษร)"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="กรอกรหัสผ่านอีกครั้ง"
                      type="password"
                      autoComplete="new-password"
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
              {loading ? 'กำลังสร้างบัญชี...' : 'สร้างบัญชี'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
