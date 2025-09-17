'use server'
import React from 'react'
import { auth } from '@/app/auth'
import  {SignInButton}  from './SignInButton';


export default async function LoginPage() {
  const session = await auth();
  console.log(session)
  return (
      <main className='h-screen w-screen flex items-center justify-center font-semibold bg-[url(/image/Login.png)] '>
        <div className="flex justify-between items-center">
          <div className=" w-[40.875rem] h-[42.4375rem] relative ">
            <section className="flex flex-col gap-[4.78125rem] relative">
              <div>
                <h1 className="text-white text-[2.5rem]">HRMS Login Page</h1>
                <h4 className="text-graysh text-[1rem]">Human Resource Management System</h4>
              </div>
              <div className="maindivider">
                <div className='center'>
                  <img src="/image/userGroup.png" alt="" />
                </div>
              <div className="halfdivider">
                <h1 className="headertxt self-start">Multi-Tenant Architecture</h1>
                <h4 className="text-graysh">Isolated data, custom branding, and flexible multi- <br/>tenant support with schema or database separation.</h4>
              </div>
              </div>
              <div className="maindivider">
                <div className='center'>
                  <img src="/image/Icon/Action/eye.png" alt="" />
                </div>
              <div className="halfdivider">
                <h1 className="headertxt self-start">End-to-End Employee Lifecycle Management</h1>
                <h4 className="text-graysh">End-to-end HR: onboarding to offboarding, with custom <br/> workflows and document management.</h4>
              </div>
              </div>
              <div className="maindivider">
                <div className='center'>
                  <img src="/image/Refresh.png" alt="" />
                </div>
              <div className="halfdivider">
                <h1 className="headertxt self-start">Advanced Automation</h1>
                <h4 className="text-graysh">Secure RBAC access, localized payroll/tax, and <br/>real-time audit logs.</h4>
              </div>
              </div>
              <div className="self-baseline">
                <ul className="marker:text-graysh list-disc list-inside text-graysh flex gap-[1.25rem]">
                  <li className="list-none hover:text-lemongreen cursor-pointer">Term</li>
                  <li className='hover:text-lemongreen cursor-pointer'>Privacy</li>
                  <li className='hover:text-lemongreen cursor-pointer'>Docs</li>
                  <li className='hover:text-lemongreen cursor-pointer'>Helps</li>
                  <li className="flex gap-4">
                    <div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </div>
  
          <div className="border-[0.4px] border-graysh backdrop-blur-[0.3874999880790710625rem]   bg-[linear-gradient(109deg,rgba(27,31,14,0.05)_0%,rgba(136,136,136,0.01)_102.73%)] rounded-[29px]   w-[659px] h-[679px]">
              <section className="flex flex-col gap-[1.5625rem] mt-[74px] mb-[74px] ml-[79px] mr-[79px]">
                <div className="flex  flex-col gap-[0.75rem]">
                  <h1 className="text-white text-2xl">Get Started</h1>
                  <h4 className="text-graysh text-base">Welcome to HRMS - Signup with your account</h4>
                </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
                {/* {form validation} */}
                <div>
                  <form className="flex flex-col gap-[4.75rem]" action="">
                    <div className="flex flex-col gap-[2.4375rem]">
                      <div className="flex flex-col gap-[1rem]">
                        <label className="text-white" htmlFor="username">Username</label>
                        <div className="relative flex items-center w-[31.0625rem] h-[3.4375rem]">
                          <div className="absolute z-10 pl-[1.1875rem]">
                            <img src="/image/userGray.png" alt="" />
                          </div>
                          <input className="pl-[66px] h-full w-full  rounded-[5px] border-2 border-[#1D2015] text-white  focus:outline-none focus:border-lemongreen  focus:ring-lemongreen bg-[#1D2015]" name="username"  type="text"/>
                        </div>
                      </div>
      
                      <div className="flex flex-col gap-[1rem]">
                        <label className="text-white" htmlFor="password">Password</label>
                        <div className="relative flex items-center w-[31.0625rem] h-[3.4375rem]">
                          <div className="absolute z-10 pl-[1.1875rem]">
                            <img src="/image/Icon/Action/LockPassword.png" alt="" />
                          </div>
                          <input className="pl-[4.125rem] h-full w-full  rounded-[0.3125rem] border-2 border-[#1D2015] text-white  focus:outline-none focus:border-lemongreen  focus:ring-lemongreen bg-[#1D2015]" name="password" type="password"/>
                        </div>
                      </div>
  
                        <div className="flex gap-[12.625rem]">
                          <label className="inline-flex items-center cursor-pointer">
                            <input className="peer hidden after" type="checkbox"/>
                            <span className="w-[1.3125rem] h-[1.3125rem] inline-block border rounded-[5px] border-[#1D2015] bg-[#1D2015] peer-checked:bg-[#BEE532] peer-checked:border-[#BEE532]"></span>
                            <span className="text-graysh ml-[0.75rem]">Keep me logged in</span> 
                          </label>
                          <div>
                            <button  className='text-lemongreen cursor-pointer' type="button">Forget Password?</button>
                          </div>
                        </div>
                    </div>
  
                    {/* {Login} */}
                    <div className="bg-lemongreen w-full h-[3.4375rem] flex items-center justify-center rounded-[0.3125rem] ">
                      <button className=" w-full h-[3.4375rem] rounded-[0.3125rem] border-3 outline-2 border-t-[hidden]   hover:outline-lemongreen cursor-pointer" type="submit">Login</button>
                    </div>
                  </form>
                </div>
                <SignInButton />
              </section>
        </div>
        </div>
      </main>
  )
}

