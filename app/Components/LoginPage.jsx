'use server'
import React from 'react'
import { auth } from '@/app/auth'
import  {SignInButton}  from './SignInButton';
import { redirect } from 'next/dist/server/api-utils';


export default async function LoginPage() {
  const session = await auth();
  console.log(session)
  if (session) {
    redirect('/SuperAdmin/AllOrganization'); // or wherever your dashboard is
  }
  return (
      <main className='h-screen w-screen flex items-center justify-center font-semibold '>
        <div className="flex justify-between items-center">
          <div className=" w-[40.875rem] h-[42.4375rem] relative ">
            <section className="flex flex-col gap-[4.78125rem] relative">
              <div>
                <h1 className="text-white text-[2.5rem]">HRMS Login Page</h1>
                <h4 className="text-graysh text-[1rem]">Human Resource Management System</h4>
              </div>
              <div className="maindivider">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 10C11.2091 10 13 8.20914 13 6C13 3.79086 11.2091 2 9 2C6.79086 2 5 3.79086 5 6C5 8.20914 6.79086 10 9 10Z" stroke="#BEE532" stroke-width="1.5"/>
    <path d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M9 21C12.866 21 16 19.2091 16 17C16 14.7909 12.866 13 9 13C5.13401 13 2 14.7909 2 17C2 19.2091 5.13401 21 9 21Z" stroke="#BEE532" stroke-width="1.5"/>
    <path d="M18 14C19.7542 14.3847 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
  
              <div className="halfdivider">
                <h1 className="headertxt self-start">Multi-Tenant Architecture</h1>
                <h4 className="text-graysh">Isolated data, custom branding, and flexible multi- <br/>tenant support with schema or database separation.</h4>
              </div>
              </div>
              <div className="maindivider">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z" stroke="#BEE532" stroke-width="1.5"/>
    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#BEE532" stroke-width="1.5"/>
                </svg>
              <div className="halfdivider">
                <h1 className="headertxt self-start">End-to-End Employee Lifecycle Management</h1>
                <h4 className="text-graysh">End-to-end HR: onboarding to offboarding, with custom <br/> workflows and document management.</h4>
              </div>
              </div>
              <div className="maindivider">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333V13H4.42981V11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z" fill="#BEE532"/>
    <path d="M20.3139 11L20.8411 10.4666C20.549 10.1778 20.0788 10.1778 19.7867 10.4666L20.3139 11ZM18.1004 12.1333C17.8058 12.4244 17.8031 12.8993 18.0942 13.1939C18.3854 13.4885 18.8603 13.4913 19.1549 13.2001L18.1004 12.1333ZM21.4729 13.2001C21.7675 13.4913 22.2424 13.4885 22.5335 13.1939C22.8247 12.8993 22.822 12.4244 22.5274 12.1332L21.4729 13.2001ZM5.31794 16.6061C5.1004 16.2536 4.6383 16.1442 4.28581 16.3618C3.93331 16.5793 3.82391 17.0414 4.04144 17.3939L5.31794 16.6061ZM11.8827 21.75C16.9451 21.75 21.0639 17.6915 21.0639 12.6667H19.5639C19.5639 16.8466 16.1332 20.25 11.8827 20.25V21.75ZM21.0639 12.6667V11H19.5639V12.6667H21.0639ZM19.7867 10.4666L18.1004 12.1333L19.1549 13.2001L20.8411 11.5334L19.7867 10.4666ZM19.7867 11.5334L21.4729 13.2001L22.5274 12.1332L20.8411 10.4666L19.7867 11.5334ZM4.04144 17.3939C5.65405 20.007 8.56403 21.75 11.8827 21.75V20.25C9.10023 20.25 6.66584 18.7903 5.31794 16.6061L4.04144 17.3939Z" fill="#BEE532"/>
                </svg>
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
  
          <div className="border-[0.4px] border-graysh backdrop-blur-[0.3874999880790710625rem]   bg-[linear-gradient(109deg,rgba(27,31,14,0.05)_0%,rgba(136,136,136,0.01)_102.73%)] rounded-[29px]  w-[659px] h-[679px]">
              <section className="flex flex-col gap-[3.5625rem] mt-[74px] mb-[74px] ml-[79px] mr-[79px]">
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
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10.5C14.2091 10.5 16 8.70914 16 6.5C16 4.29086 14.2091 2.5 12 2.5C9.79086 2.5 8 4.29086 8 6.5C8 8.70914 9.79086 10.5 12 10.5Z" stroke="#3F4236" stroke-width="1.5"/>
          <path d="M12 21.5C15.866 21.5 19 19.7091 19 17.5C19 15.2909 15.866 13.5 12 13.5C8.13401 13.5 5 15.2909 5 17.5C5 19.7091 8.13401 21.5 12 21.5Z" stroke="#3F4236" stroke-width="1.5"/>
                            </svg>
                          </div>
                          <input className="pl-[66px] h-full w-full  rounded-[5px] border-2 border-[#1D2015] text-white  focus:outline-none focus:border-lemongreen  focus:ring-lemongreen bg-[#1D2015]" name="username"  type="text"/>
                        </div>
                      </div>
      
                      <div className="flex flex-col gap-[1rem]">
                        <label className="text-white" htmlFor="password">Password</label>
                        <div className="relative flex items-center w-[31.0625rem] h-[3.4375rem]">
                          <div className="absolute z-10 pl-[1.1875rem]">
                              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 16.5C2 13.6716 2 12.2574 2.87868 11.3787C3.75736 10.5 5.17157 10.5 8 10.5H16C18.8284 10.5 20.2426 10.5 21.1213 11.3787C22 12.2574 22 13.6716 22 16.5C22 19.3284 22 20.7426 21.1213 21.6213C20.2426 22.5 18.8284 22.5 16 22.5H8C5.17157 22.5 3.75736 22.5 2.87868 21.6213C2 20.7426 2 19.3284 2 16.5Z" stroke="#3F4236" stroke-width="1.5"/>
    <path d="M6 10.5V8.5C6 5.18629 8.68629 2.5 12 2.5C14.7958 2.5 17.1449 4.41216 17.811 7" stroke="#3F4236" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M8 16.5H8.009M11.991 16.5H12M15.991 16.5H16" stroke="#3F4236" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
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
                  <SignInButton/>
                </div>
              </section>
        </div>
        </div>
      </main>
  )
}

