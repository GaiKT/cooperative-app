'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { SidebarTrigger } from './ui/sidebar'

export default function Navigation() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="h-16 bg-white dark:bg-gray-800 shadow-sm border-b p-4">Loading...</div>
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className='flex items-center'>
            <SidebarTrigger />
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gray-700 dark:text-gray-300">
                  ยินดีต้อนรับ, <span className='font-semibold'>{session.user?.name || session.user?.email}</span>
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  ออกจากระบบ
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  สร้างบัญชี
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
