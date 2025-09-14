'use client';
import React from 'react'

import Link from 'next/link';
import DashboardIcon from '@/public/svg/DashboardSvg/Dashboard'
import Organization from '@/public/svg/DashboardSvg/Organization'
import Employee from '@/public/svg/DashboardSvg/Employee';
import Attendance from '@/public/svg/DashboardSvg/Attendance';
import LeaveManegment from '@/public/svg/DashboardSvg/LeaveManegment';
import Recruitment from '@/public/svg/DashboardSvg/Recruitment';
import Performance from '@/public/svg/DashboardSvg/Performance';
import Training from '@/public/svg/DashboardSvg/Training';
import Announcement from '@/public/svg/DashboardSvg/Announcement';
import Setting from '@/public/svg/DashboardSvg/Setting';

const EmployeePortal = ({ readPath }) => {
  return (

    <>
        <aside className='font-semibold  customBorder scrollBar w-[20.5rem]  h-screen flex flex-col gap-[4.25rem] relative  pt-[3.5rem] overflow-y-auto '>
            <div className=' flex items-center gap-[1.25rem] pl-[2.75rem]'>
                <img className='w-[2.0625rem] h-[2.3125rem]' src="/image/logo.png" alt="" />
                <div >
                    <h1 className='text-[1.4rem] text-white font-semibold'>HRMS Platforms</h1>
                    <h4 className='text-limegray'>Multi-Tenant HR System </h4>
                </div>
            </div>
            <nav className='flex flex-col gap-[4.0625rem] overflow-y-auto scrollBar '>
                {/* Core */}
                <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 
                    <div>
                        <h4 className={`${['EmployeePortal/Dashboard','EmployeePortal/Attendance','EmployeePortal/LeaveRequest'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>CORE</h4>
                    </div>
                    <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/Dashboard' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <DashboardIcon readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/Dashboard"><h4 className={`${readPath === 'EmployeePortal/Dashboard' ? 'text-white' : 'text-limegray'} ` }>Dashboard</h4></Link>
                            </div>
                        </div>
                    </div>
                    {/* Attendance */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/Attendance' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Attendance readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/Attendance"><h4 className={`${readPath === 'EmployeePortal/Attendance' ? 'text-white' : 'text-limegray'} ` }>Attendance</h4></Link>
                            </div>
                        </div>
                    </div>
                    {/* Leave Management */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/LeaveRequest' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <LeaveManegment readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/LeaveRequest"><h4 className={`${readPath === 'EmployeePortal/LeaveRequest' ? 'text-white' : 'text-limegray'} ` }>Leave Request</h4></Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Talent */}
                <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 
                    <div>
                        <h4 className= {`${['EmployeePortal/Performance','EmployeePortal/Training'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>TALENT</h4>
                    </div>                
                    {/* Performance */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/Performance'   ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Performance readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/Performance"><h4 className={`${readPath === 'EmployeePortal/Performance'  ? 'text-white' : 'text-limegray'} ` }>Performance</h4></Link>
                            </div>
                        </div>
                    </div>    
                    {/* Training */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/Training' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Training readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/Training"><h4 className={`${readPath === 'EmployeePortal/Training' ? 'text-white' : 'text-limegray'} ` }>Training</h4></Link>
                            </div>
                        </div>
                    </div> 
                </section>


                {/* OPERATION */}
                <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 

                    <div>
                        <h4 className= {`${['EmployeePortal/Setting', 'EmployeePortal/Announcement'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>OPERATION</h4>
                    </div>
                    {/* Announcement */}
                    <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/Announcement' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Announcement readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/Announcement"><h4 className={`${readPath === 'EmployeePortal/Announcement' ? 'text-white' : 'text-limegray'} ` }>Announcement</h4></Link>
                            </div>
                        </div>
                    </div> 
                    {/* Settings */}
                    <div className='flex items-center' >
                        <div className={`${readPath === 'EmployeePortal/Setting' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Setting readPath={readPath}/>
                            <div>
                                <Link href="/EmployeePortal/Setting"><h4 className={`${readPath === 'EmployeePortal/Setting' ? 'text-white' : 'text-limegray'} ` }>Setting</h4></Link>
                            </div>
                        </div>
                    </div> 
                </section>
            </nav>
        </aside>
        

    </>
  )
}

export default EmployeePortal