'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface WithAuthProps {
  // Add any additional props if needed
}

export default function withAuth<T extends WithAuthProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return function AuthenticatedComponent(props: T) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return // Still loading

      if (!session) {
        toast.error('กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้')
        router.push('/auth/signin')
        return
      }
    }, [session, status, router])

    // Show loading while checking authentication
    if (status === 'loading') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">กำลังตรวจสอบสิทธิ์...</p>
          </div>
        </div>
      )
    }

    // Don't render the component if not authenticated
    if (!session) {
      return null
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />
  }
}
