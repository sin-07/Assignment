'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useGuestGuard } from '@/hooks/useAuthGuard'

export default function ForgotPasswordPage() {
  // Redirect authenticated users to dashboard
  useGuestGuard('/leads');

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
              Forgot password
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6 pb-8">
          <form className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 border-gray-300 bg-white"
                required
              />
            </div>

            {/* Reset Button */}
            <Button 
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-normal mt-6"
            >
              Send reset link
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="text-center pt-4">
            <Link 
              href="/login" 
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
