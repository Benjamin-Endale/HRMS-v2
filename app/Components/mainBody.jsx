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

const MainBody = ({ readPath }) => {
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
                        <h4 className={`${['Dashboard' , 'Organization' , 'Employees', 'Attendance' , 'LeaveManagment' ,"EmployeeRegistration/AddNewemployee" ,'EmployeeRegistration/AddNewemployeesecond',"EmployeeRegistration/Compensation","EmployeeRegistration/System"].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>CORE</h4>
                    </div>
                    <div className='flex items-center' >
                        <div className={`${readPath === 'Dashboard' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <DashboardIcon readPath={readPath}/>
                            <div>
                                <Link href="/Dashboard"><h4 className={`${readPath === 'Dashboard' ? 'text-white' : 'text-limegray'} ` }>Dashboard</h4></Link>
                            </div>
                        </div>
                    </div>
                     {/* Organization */}
                     <div className='flex items-center' >
                        <div className={`${readPath === 'Organization' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Organization readPath={readPath}/>
                            <div>
                                <Link href="/Organization"><h4 className={`${readPath === 'Organization' ? 'text-white' : 'text-limegray'} ` }>Organization</h4></Link>
                            </div>
                        </div>
                    </div>
                    {/* Employee */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'Employees' || readPath === 'EmployeeRegistration/AddNewemployee' || readPath === 'EmployeeRegistration/AddNewemployeesecond' || readPath === 'EmployeeRegistration/Compensation' || readPath === 'EmployeeRegistration/System' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Employee readPath={readPath}/>
                            <div>
                                <Link href="/Employees"><h4 className={`${readPath === 'Employees' || readPath === 'EmployeeRegistration/AddNewemployee' || readPath === 'EmployeeRegistration/AddNewemployeesecond' || readPath === 'EmployeeRegistration/Compensation' || readPath === 'EmployeeRegistration/System' ? 'text-white' : 'text-limegray'} ` }>Employees</h4></Link>
                            </div>
                        </div>
                    </div>
                    {/* Attendance */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'Attendance' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Attendance readPath={readPath}/>
                            <div>
                                <Link href="/Attendance"><h4 className={`${readPath === 'Attendance' ? 'text-white' : 'text-limegray'} ` }>Attendance</h4></Link>
                            </div>
                        </div>
                    </div>
                    {/* Leave Management */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'LeaveManagment' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <LeaveManegment readPath={readPath}/>
                            <div>
                                <Link href="/LeaveManagment"><h4 className={`${readPath === 'LeaveManagment' ? 'text-white' : 'text-limegray'} ` }>Leave Managment</h4></Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Talent */}
                <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 
                    <div>
                        <h4 className= {`${['Recruitment', 'PerformancePages/Overview' , 'Training' , 'RecruitmentPages/Jobposting', 'RecruitmentPages/Candidates', 'RecruitmentPages/Interviews' , 'PerformancePages/Reviews' ,  "PerformancePages/Goals", "/RecruitmentPages/Shortlist" , "PerformancePages/FeedBack" ,"TrainingPages/Program", "TrainingPages/Enrolment", "TrainingPages/Feedback", 'TrainingPages/OverviewTraining'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>TALENT</h4>
                    </div>
                    {/* Recruitment */}
                   <div className='flex items-center' >
                        <div className={`${readPath === "RecruitmentPages/Jobposting" || readPath === "RecruitmentPages/Candidates" || readPath === "RecruitmentPages/Interviews"  || readPath === "RecruitmentPages/Shortlist" ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Recruitment readPath={readPath}/>
                            <div>
                                <Link href="/RecruitmentPages/Jobposting"><h4 className={`${readPath === 'Recruitment' || readPath === "RecruitmentPages/Jobposting" || readPath === "RecruitmentPages/Candidates" || readPath === "RecruitmentPages/Interviews" ? 'text-white' : 'text-limegray'} ` }>Recruitment</h4></Link>
                            </div>
                        </div>
                    </div>                    
                    {/* Performance */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'PerformancePages/Overview' || readPath === "PerformancePages/Goals" || readPath === "PerformancePages/FeedBack" || readPath === "PerformancePages/Reviews"  ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Performance readPath={readPath}/>
                            <div>
                                <Link href="/PerformancePages/Overview"><h4 className={`${readPath === 'PerformancePages/Overview' || readPath === "PerformancePages/Goals" || readPath === "PerformancePages/Reviews" || readPath === "PerformancePages/FeedBack" ? 'text-white' : 'text-limegray'} ` }>Performance</h4></Link>
                            </div>
                        </div>
                    </div>    
                    {/* Training */}
                   <div className='flex items-center' >
                        <div className={`${readPath === 'Training' || readPath === 'TrainingPages/OverviewTraining'  || readPath === 'TrainingPages/Feedback' || readPath === 'TrainingPages/Enrolment' || readPath === 'TrainingPages/Program'? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Training readPath={readPath}/>
                            <div>
                                <Link href="/TrainingPages/OverviewTraining"><h4 className={`${readPath === 'Training' || readPath === 'TrainingPages/OverviewTraining'  || readPath === 'TrainingPages/Feedback' || readPath === 'TrainingPages/Enrolment' || readPath === 'TrainingPages/Program'? 'text-white' : 'text-limegray'} ` }>Training</h4></Link>
                            </div>
                        </div>
                    </div> 
                </section>


                {/* OPERATION */}
                <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 

                    <div>
                        <h4 className= {`${['assets', 'Announcement'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>OPERATION</h4>
                    </div>

                    {/* Assets                    
                    <div className='flex items-center   '>
                        <div  className={`${readPath === 'assets' ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'assets' ? 'white' : '#5D6150'} stroke-width="1.5">
<path d="M13.6305 2.95922L15.3805 3.87758C17.2632 4.86558 18.2045 5.35958 18.7273 6.24727C19.25 7.13497 19.25 8.23959 19.25 10.4488V10.5512C19.25 12.7604 19.25 13.8651 18.7273 14.7528C18.2045 15.6405 17.2632 16.1344 15.3805 17.1224L13.6305 18.0408C12.0943 18.8469 11.3263 19.25 10.5 19.25C9.67374 19.25 8.90566 18.8469 7.3695 18.0408L5.6195 17.1224C3.7368 16.1344 2.79544 15.6405 2.27272 14.7528C1.75 13.8651 1.75 12.7604 1.75 10.5512V10.4488C1.75 8.23959 1.75 7.13497 2.27272 6.24727C2.79544 5.35958 3.7368 4.86558 5.6195 3.87758L7.3695 2.95922C8.90566 2.15308 9.67374 1.75 10.5 1.75C11.3263 1.75 12.0943 2.15308 13.6305 2.95922Z"  stroke-linecap="round"/>
<path d="M18.375 6.5625L14.875 8.3125M14.875 8.3125C14.875 8.3125 14.6084 8.44582 14.4375 8.53125C12.8998 9.30011 10.5 10.5 10.5 10.5M14.875 8.3125V11.375M14.875 8.3125L6.5625 3.9375M10.5 10.5L2.625 6.5625M10.5 10.5V18.8125"  stroke-linecap="round"/>
                            </svg>

                            <div>
                                <NavLink to='/assets'><h4 className={`${readPath === 'assets' ? 'text-white' : 'text-limegray'}`}>Assets</h4></NavLink>
                            </div>
                        </div>
                    </div> */}
                    {/* Announcement */}
                    <div className='flex items-center' >
                        <div className={`${readPath === 'Announcement' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                        <div className='navLinkconfig'>
                            <Announcement readPath={readPath}/>
                            <div>
                                <Link href="/Announcement"><h4 className={`${readPath === 'Announcement' ? 'text-white' : 'text-limegray'} ` }>Announcement</h4></Link>
                            </div>
                        </div>
                    </div> 
                </section>
            </nav>
        </aside>
        

    </>
  )
}

export default MainBody