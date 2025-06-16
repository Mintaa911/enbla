"use client";

import { Home, Calendar, Users, User, Bell, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

export function MainSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();


  const desktopNavItems = [
    { href: "/home", label: "For You", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/friends", label: "Friends", icon: Users },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/profile", label: "Profile", icon: User },
  ];
  const mobileNavItems = [
    { href: "/home", label: "For You", icon: Home },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/friends", label: "Friends", icon: Users },
    { href: "/profile", label: "Profile", icon: User },
  ];



  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-[250px]">
        <Sidebar className="w-[250px]">
          <SidebarHeader className="py-4">
            <Link href="/home" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Enbla
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent >
            <div className="flex flex-col flex-1">
              <SidebarMenu>
                {desktopNavItems.map(({ href, label, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === href}
                      tooltip={label}
                    >
                      <Link href={href} className="w-full">
                        <Icon className="w-5 h-5" />
                        <span className="inline">{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

              <div className="flex-1" />

              <SidebarFooter className="p-4">
                <SidebarMenuButton
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                  tooltip="Sign Out"
                >
                  <button className="w-full" onClick={signOut}>
                    <LogOut className="w-5 h-5" />
                    <span className="inline">Sign Out</span>
                  </button>
                </SidebarMenuButton>
              </SidebarFooter>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Mobile Sidebar (Icons only, with menu button) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-background border-t px-2 py-4 md:hidden">
        <div className="flex flex-1 justify-around">
          {mobileNavItems.map(({ href, icon: Icon }) => (
            <Link key={href} href={href} className="flex flex-col items-center justify-center">
              <Icon className={`w-6 h-6 ${pathname === href ? 'text-primary' : ''}`} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
} 