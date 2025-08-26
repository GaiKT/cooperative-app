'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
  redirectTo?: string
  showToast?: boolean
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/auth/signin',
  showToast = true 
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      if (showToast) {
        toast.error('กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้')
      }
      router.push(redirectTo)
      return
    }
  }, [session, status, router, redirectTo, showToast])

  // Show loading while checking authentication
  if (status === 'loading') {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!session) {
    return null
  }

  // Render children if authenticated
  return <>{children}</>
}
