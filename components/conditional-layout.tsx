'use client'

import { usePathname } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Navigation from "@/components/navigation"
import { AppBreadcrumb } from './app-breadcrumb'  

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/auth')
  
  // If it's an auth page, just render children without sidebar/navigation
  if (isAuthPage) {
    return <>{children}</>
  }
  
  // For non-auth pages, render with sidebar and navigation
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navigation />
          <main className="flex-1">
            <div className='py-3 px-8 border-b bg-white dark:bg-gray-900'>
              <AppBreadcrumb />
            </div>
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
