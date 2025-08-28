'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, ChevronRightIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// กำหนดชื่อหน้าสำหรับแต่ละ route
const routeNames: Record<string, string> = {
  '': 'หน้าแรก',
  'home': 'หน้าแรก',
  'welfare': 'ยื่นขอรับสวัสดิการ',
  'welfare/request': 'ยื่นคำขอ',
  'welfare/status': 'ตรวจสอบสถานะ',
  'status': 'ตรวจสอบสถานะ',
  'regulations': 'ระเบียบ',
  'profile': 'ข้อมูลส่วนตัว',
  'profile/change-password': 'เปลี่ยนรหัสผ่าน',
  'settings': 'ตั้งค่า',
  'help': 'ช่วยเหลือ',
  'about': 'เกี่ยวกับ',
}

export function AppBreadcrumb() {
  const pathname = usePathname()
  
  // แยกเส้นทางเป็น segments
  const pathSegments = pathname.split('/').filter(segment => segment !== '')
  
  // ถ้าอยู่ที่หน้าแรก ให้แสดงแค่ไอคอนบ้าน
  if (pathSegments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              หน้าแรก
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* หน้าแรกเสมอ */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-2 hover:text-blue-600">
              <HomeIcon className="h-4 w-4" />
              หน้าแรก
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* สร้าง breadcrumb สำหรับแต่ละ segment */}
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/')
          const isLast = index === pathSegments.length - 1
          const routeKey = pathSegments.slice(0, index + 1).join('/')
          const displayName = routeNames[routeKey] || routeNames[segment] || segment

          return (
            <div key={href} className="flex items-center gap-2">
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-medium text-blue-600">
                    {displayName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      href={href}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {displayName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
