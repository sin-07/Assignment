"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { authenticate } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [authError, dispatch] = useActionState(authenticate, undefined);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  // Check if user just registered successfully - had to handle this manually
  // since I wanted to show a nice success message after registration
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successMsg = urlParams.get("message");
    if (successMsg) {
      setRegistrationSuccess(successMsg);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg border-0">
        <CardHeader className="space-y-4 pb-6 pt-6">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back</span>
          </Link>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Login with email
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Login using your email address.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-8">
          {/* Success notification after registration */}
          {registrationSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {registrationSuccess}
            </div>
          )}

          <form action={dispatch} className="space-y-4">
            {/* Email or Username */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email or Username
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email or username"
                className="h-12 border-gray-300 bg-white"
                autoComplete="email"
                required
              />
            </div>

            {/* Password input with toggle visibility - love this little UX touch */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 border-gray-300 bg-white pr-12"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {isPasswordVisible ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Display any authentication errors */}
            {authError && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-md">
                {authError}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-normal mt-6 rounded-full"
            >
              Login
            </Button>
          </form>

          {/* Footer Links */}
          <div className="flex justify-between items-center pt-4 text-sm">
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:text-gray-700"
            >
              Forgot password
            </Link>
            <Link
              href="/register"
              className="text-gray-500 hover:text-gray-700"
            >
              Create New Account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
