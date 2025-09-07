"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0">
        <CardHeader className="text-center space-y-3 pb-6 pt-8">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Continue with an account
          </CardTitle>
          <p className="text-gray-600 text-sm">
            You must log in or register to continue.
          </p>
        </CardHeader>

        <CardContent className="space-y-4 px-8 pb-8">
          {/* Google Sign In Button */}
          <Button
            variant="outline"
            className="w-full h-12 my-3 border-gray-300 hover:bg-gray-50 bg-white text-gray-700 font-normal rounded-full"
            onClick={() => {
              window.location.href = '/api/auth/google'
            }}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Email Login Button */}
          <Link href="/login">
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-normal rounded-full ">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Login with Email
            </Button>
          </Link>

          {/* Create Account Link */}
          <div className="text-center pt-6">
            <Link href="/register">
              <button className="text-gray-900 hover:text-gray-700 font-medium text-sm border-b border-gray-900 hover:border-gray-700 pb-0.5">
                New User? Create New Account
              </button>
            </Link>
          </div>

          {/* Privacy Policy and Terms */}
          <div className="text-center pt-8 text-xs text-gray-500 leading-relaxed">
            <p>
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 underline underline-offset-2"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-gray-600 hover:text-gray-800 underline underline-offset-2"
              >
                T&Cs
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
