'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // ✅ Import from next-auth/react
import { SignInButton } from './SignInButton';

// ✅ Validation schema
const loginSchema = z.object({
    email: z.string()
      .email("Invalid email address")
      .min(3, "Email must be at least 3 characters long")
      .max(50, "Email must not exceed 50 characters"),

  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)"),
});

export default function LoginPage() {
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  // ✅ Fixed login handler
  const handleLogin = async (data) => {
    setLoginError('');
    setIsLoading(true);

    try {
      // Use signIn with credentials
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        // Handle login errors
        setLoginError("Invalid credentials or login failed");
      } else {
        // &email=${encodeURIComponent(result.email)}
        window.location.href = `/Login/VerifyOtp?email=${encodeURIComponent(data.email)}`;}


    } catch (err) {
      console.error(err);
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <main className='h-screen w-screen flex items-center justify-center font-semibold bg-[url(/image/Login.png)]'>
      <div className="flex justify-between items-center">
        {/* Left side info */}
        <div className="w-[40.875rem] h-[42.4375rem] relative">
          <section className="flex flex-col gap-[4.78125rem] relative">
            <div>
              <h1 className="text-white text-[2.5rem]">HRMS Login Page</h1>
              <h4 className="text-graysh text-[1rem]">Human Resource Management System</h4>
            </div>

            {/* Features */}
            <div className="maindivider">
              <div className='center'>
                <img src="/image/userGroup.png" alt="" />
              </div>
              <div className="halfdivider">
                <h1 className="headertxt self-start">Multi-Tenant Architecture</h1>
                <h4 className="text-graysh">Isolated data, custom branding, and flexible multi-tenant support with schema or database separation.</h4>
              </div>
            </div>

            <div className="maindivider">
              <div className='center'>
                <img src="/image/Icon/Action/eye.png" alt="" />
              </div>
              <div className="halfdivider">
                <h1 className="headertxt self-start">End-to-End Employee Lifecycle Management</h1>
                <h4 className="text-graysh">End-to-end HR: onboarding to offboarding, with custom workflows and document management.</h4>
              </div>
            </div>

            <div className="maindivider">
              <div className='center'>
                <img src="/image/Refresh.png" alt="" />
              </div>
              <div className="halfdivider">
                <h1 className="headertxt self-start">Advanced Automation</h1>
                <h4 className="text-graysh">Secure RBAC access, localized payroll/tax, and real-time audit logs.</h4>
              </div>
            </div>

            {/* Footer links */}
            <div className="self-baseline">
              <ul className="marker:text-graysh list-disc list-inside text-graysh flex gap-[1.25rem]">
                <li className="list-none hover:text-lemongreen cursor-pointer">Term</li>
                <li className='hover:text-lemongreen cursor-pointer'>Privacy</li>
                <li className='hover:text-lemongreen cursor-pointer'>Docs</li>
                <li className='hover:text-lemongreen cursor-pointer'>Helps</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Login form */}
        <div className="w-[40.875rem] h-[42.4375rem] relative">
          <div className="border-[0.4px] border-graysh backdrop-blur-[0.3875rem] bg-[linear-gradient(109deg,rgba(27,31,14,0.05)_0%,rgba(136,136,136,0.01)_102.73%)] rounded-[29px] w-[659px] h-[679px]">
            <section className="flex flex-col gap-[1.5625rem] mt-[74px] mb-[74px] ml-[79px] mr-[79px]">
              <div className="flex flex-col gap-[0.75rem]">
                <h1 className="text-white text-2xl">Get Started</h1>
                <h4 className="text-graysh text-base">Welcome to HRMS - Sign in with your account</h4>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-[4.75rem]">
                {/* Email */}
                <div className="flex flex-col gap-[0.25rem]">
                  <label className="text-white">Email</label>
                  <div className="relative flex items-center w-[31.0625rem] h-[3.4375rem]">
                    <div className="absolute z-10 pl-[1.1875rem]">
                      <img src="/image/userGray.png" alt="Email icon" />
                    </div>
                    <input
                      className="pl-[66px] h-full w-full rounded-[5px] border-2 border-[#1D2015] text-white focus:outline-none focus:border-lemongreen focus:ring-lemongreen bg-[#1D2015]"
                      type="text"
                      placeholder='ex. John Don'
                      {...register("email")}
                    />
                  </div>
                  {errors.email && <span className='text-Error'>{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-[0.25rem]">
                  <label className="text-white">Password</label>
                  <div className="relative flex items-center w-[31.0625rem] h-[3.4375rem]">
                    <div className="absolute z-10 pl-[1.1875rem]">
                      <img src="/image/Icon/Action/LockPassword.png" alt="Password icon" />
                    </div>
                    <input
                      className="pl-[4.125rem] h-full w-full rounded-[0.3125rem] border-2 border-[#1D2015] text-white focus:outline-none focus:border-lemongreen focus:ring-lemongreen bg-[#1D2015]"
                      type="password"
                      placeholder='*******************'
                      {...register("password")}
                    />
                  </div>
                  {errors.password && <span className='text-Error'>{errors.password.message}</span>}
                </div>

                {/* Login button */}
                <div className='flex flex-col gap-2'>
                  <div className="bg-lemongreen w-full h-[3.4375rem] flex items-center justify-center rounded-[0.3125rem]">
                    <button 
                      className="w-full h-full rounded-[0.3125rem] hover:outline-lemongreen cursor-pointer disabled:opacity-50" 
                      type="submit"
                      disabled={isSubmitting || isLoading}
                    >
                      {(isSubmitting || isLoading) ? "Loading..." : "Login"}
                    </button>
                  </div>
                  <div>
                    {loginError && <div className="text-Error text-center">{loginError}</div>}
                  </div>
                </div>
              </form>

              {/* Google Sign In
              <SignInButton /> */}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
