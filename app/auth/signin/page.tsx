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
import Image from 'next/image'
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";

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
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center h-24 w-24 border rounded-full">
              {/* <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="mb-4"
              /> */}
          </div>
          <h1 className='text-center text-xl font-bold text-gray-900 dark:text-white'>
            ระบบสวัสดิการเพื่อการสงเคราะห์สมาชิกออนไลน์ สหกรณ์ออมทรัพย์สื่อสารทหาร จำกัด
          </h1>
          {/* <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            หรือ{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              สร้างบัญชีใหม่
            </Link>
          </div>
          {/* <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            หรือ{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
              สร้างบัญชีใหม่
            </Link>
          </p> */}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>หมายเลขสมาชิก</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="หมายเลขสมาชิก"
                      type="text"
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
                  {/* <FormLabel>รหัสผ่าน</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="รหัสผ่าน"
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

            <div className='mt-6 text-center text-gray-500'>
                <p>ติดต่อสอบถามเจ้าหน้าที่</p>
                <div className='flex gap-3 justify-center mt-2 text-sm dark:text-gray-400'>        
                  <p><FaPhoneSquareAlt className="inline-block mr-1 text-green-600 h-5" /> 02-082-7290</p>
                  <p><FaLine className="inline-block mr-1 text-green-600 h-5" /> @djccoop</p>
                </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
