'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { register } from '@/actions/auth'
import { useGuestGuard } from '@/hooks/useAuthGuard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  // Redirect authenticated users to dashboard
  useGuestGuard('/leads');

  const [registrationError, dispatch] = useActionState(register, undefined)
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0">
        <CardHeader className="space-y-4 pb-6 pt-6">
          {/* Back Button */}
          <Link 
            href="/login" 
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back</span>
          </Link>
          
          {/* Title and Subtitle */}
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Register with email
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Register using your email address.
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6 pb-8">
          <form action={dispatch} className="space-y-4">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  className="h-12 border-gray-300 bg-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  className="h-12 border-gray-300 bg-white"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="For eg: bhavya@kandid.ai"
                className="h-12 border-gray-300 bg-white"
                required
              />
            </div>

            {/* Password field with visibility toggle */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisibility ? "text" : "password"}
                  placeholder="Password"
                  className="h-12 border-gray-300 bg-white pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisibility(!passwordVisibility)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {passwordVisibility ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Show registration errors if any occur */}
            {registrationError && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">
                {registrationError}
              </div>
            )}

            {/* Create Account Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-normal mt-6 rounded-full"
            >
              Create my account
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="text-gray-500 hover:text-gray-700"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
