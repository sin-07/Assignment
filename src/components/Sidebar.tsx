"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  MessageSquare, 
  Linkedin, 
  Settings,
  Activity,
  UserCircle,
  ChevronsUpDown,
  LogOut
} from "lucide-react"
import { getCurrentUser, clearUserSession, type UserData } from '@/lib/userStorage'

// Main navigation structure - I spent way too much time organizing this
// but it makes the sidebar much more maintainable for future updates
const navigationConfig = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Leads", href: "/leads" },
  { icon: Megaphone, label: "Campaign", href: "/campaigns" },
  { icon: MessageSquare, label: "Messages", href: "/messages", badge: "20+" },
  { icon: Linkedin, label: "Linkedin Accounts", href: "/linkedin-accounts" },
]

export default function Sidebar() {
  const currentRoute = usePathname()
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [isUserDataLoading, setIsUserDataLoading] = useState(true)

  // Fetch user info when component mounts
  // Had to handle this manually since we're not using any auth library
  useEffect(() => {
    const fetchedUserData = getCurrentUser()
    setCurrentUser(fetchedUserData)
    setIsUserDataLoading(false)
  }, [])

  // Clean logout function - keeps things simple and straightforward  
  const handleUserSignout = async () => {
    clearUserSession()
    // Simple redirect after clearing user session
    window.location.href = '/login'
  }

  if (isUserDataLoading) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="w-64 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col m-4">
      {/* Brand section with custom logo design */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">LB</span>
          </div>
          <span className="text-xl font-bold text-gray-900">LinkBird</span>
        </div>
      </div>

      {/* Current user information display */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">
              {currentUser && currentUser.firstName ? currentUser.firstName.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {currentUser && currentUser.firstName && currentUser.lastName ? 
                `${currentUser.firstName} ${currentUser.lastName}` : 'User'}
            </p>
            <p className="text-xs text-gray-500">Personal</p>
          </div>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main navigation menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Overview
          </p>
          {navigationConfig.map((navigationItem) => {
            const isCurrentPage = currentRoute === navigationItem.href
            return (
              <Link
                key={navigationItem.label}
                href={navigationItem.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCurrentPage
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <navigationItem.icon className="w-5 h-5" />
                  <span>{navigationItem.label}</span>
                </div>
                {navigationItem.badge && (
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    {navigationItem.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Settings
          </p>
          <Link
            href="/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Setting & Billing</span>
          </Link>
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            Admin Panel
          </p>
          <Link
            href="/activity-logs"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Activity className="w-5 h-5" />
            <span>Activity logs</span>
          </Link>
          <Link
            href="/user-logs"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <UserCircle className="w-5 h-5" />
            <span>User logs</span>
          </Link>
        </div>
      </nav>

      {/* Bottom Profile Section - This took forever to get the spacing right */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {/* User avatar with initials - much cleaner than profile pics everywhere */}
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {currentUser && currentUser.firstName ? 
                  `${currentUser.firstName[0].toUpperCase()}${currentUser.lastName ? currentUser.lastName[0].toUpperCase() : ''}` : 'U'}
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {currentUser && currentUser.firstName ? 
                `${currentUser.firstName}${currentUser.lastName ? ` ${currentUser.lastName}` : ''}` : 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'user@email.com'}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronsUpDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                className="flex items-center space-x-2 text-red-600 cursor-pointer"
                onClick={handleUserSignout}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
