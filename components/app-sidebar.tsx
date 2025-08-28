import { Book, Home, Radio, Key , FilePlus  } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

import { ModeToggle } from "./handle-theme"

// Menu items.
const items = [
  {
    title: "หน้าแรก",
    url: "/",
    icon: Home,
  },
  {
    title: "ยื่นขอรับสวัสดิการ",
    url: "/welfare",
    icon: FilePlus,
  },
  {
    title: "ตรวจสอบสถานะ",
    url: "/status",
    icon: Radio,
  },
  {
    title: "ระเบียบ",
    url: "/regulations",
    icon: Book,
  },
  {
    title: "เปลี่ยนรหัสผ่าน",
    url: "#",
    icon: Key,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 justify-center items-center p-1">
          <div className="h-10 w-10 border rounded-full">
            {/* <Image
              src="/logo.png"
              alt="Logo"
              width={20}
              height={20}
              className="mb-4 border"
            /> */}
          </div>
          <h2 className="text-lg font-semibold">Welfare Djccoop</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center items-center p-4">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}