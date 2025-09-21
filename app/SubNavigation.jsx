'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';



const SubNavigation = ({ readPath }) => {
  const router = useRouter()
  const pathname = usePathname()

    const NavRecruitment = [
    { label: "Job Posting", path: "/Admin/RecruitmentPages/Jobposting" },
    { label: "Candidates", path: "/Admin/RecruitmentPages/Candidates" },
    { label: "Shortlist", path: "/Admin/RecruitmentPages/Shortlist" },
    { label: "Interviews", path: "/Admin/RecruitmentPages/Interviews" }
  ]


  
    const NavPerformance = [
    { label: "Overview", path: "/Admin/PerformancePages/Overview" },
    { label: "Goals & KPIs", path: "/Admin/PerformancePages/Goals" },
    { label: "Reviews", path: "/Admin/PerformancePages/Reviews" },
    { label: "360 Feedback ", path: "/Admin/PerformancePages/FeedBack" }
  ]

      const NavTraning = [
    { label: "Overview", path: "/Admin/TrainingPages/OverviewTraining" },
    { label: "Programs", path: "/Admin/TrainingPages/Program" },
    { label: "Enrolment ", path: "/Admin/TrainingPages/Enrolment" },
    { label: "Feedback", path: "/Admin/TrainingPages/Feedback" }
  ]


  return (
    <div className='w-[calc(100%-2.75rem)]'>
        <div className={`${readPath === 'Recruitment' || readPath === '/RecruitmentPages/Jobposting' || readPath === "/RecruitmentPages/Candidates" || readPath === "/RecruitmentPages/Interviews" || readPath === '/RecruitmentPages/Shortlist' ? 'block' : 'hidden'} cursor-pointer flex flex-col gap-[3.3125rem]`}>
            {/* InformationContainers */}
            <div className='flex gap-[1.25rem]'>
                <div className='carDash2'>
                    <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                            <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-formColor'>12</span>
                        <span className='text-formColor'>Active Jobs</span>
                    </div>
                    </div>
                </div>
                <div className='carDash2'>
                    <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                            <img src="/image/Icon/Close.png" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-formColor'>234</span>
                        <span className='text-formColor'>Total Applications</span>
                    </div>
                    </div>
                </div>
                <div className='carDash2'>
                    <div className='h-full between flex-col'>
                        <div className='flex justify-between'>
                            <div>
                                <img src="/svg/SvgImage/cardIcon.svg" alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-5xl text-formColor'>8</span>
                            <span className='text-formColor'>Interviews Today</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="center-center gap-[1.75rem]">
                {NavRecruitment.map(item => (
                <div
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    className={`w-[8.875rem]  text-center py-[0.875rem] relative px-[1.875rem]  text-nowrap  ${pathname === item.path ? 'text-lemongreen' : 'textLimegray1'}`}>
                    {item.label}
                    <div className={`${pathname === item.path ? 'absolute left-0 h-[3px] w-full bottom-0 rounded-[0.375rem] bg-lemongreen' : ''}`}></div>
                </div>
                ))}
                
            </div>
        </div>
        <div className={`${readPath === 'Performance' || readPath === "/PerformancePages/FeedBack" || readPath === "/PerformancePages/Goals" || readPath === 'PerformancePages/Overview' || readPath === '/PerformancePages/Reviews' ? 'block' : 'hidden'} cursor-pointer flex flex-col gap-[3.3125rem]`}>
            {/* InformationContainers */}
            <div className='flex gap-[1.25rem] font-semibold'>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>12</span>
                    <span className='text-formColor'>Active Jobs</span>
                </div>
                </div>
            </div>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/image/Icon/Close.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>234</span>
                    <span className='text-formColor'>Total Applications</span>
                </div>
                </div>
            </div>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/svg/SvgImage/cardIcon.svg" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>8</span>
                    <span className='text-formColor'>Interviews Today</span>
                </div>
                </div>
            </div>
            </div>
            <div className="center-center gap-[1.75rem] font-semibold">
                {NavPerformance.map(item1 => (
                <div
                    key={item1.path}
                    onClick={() => router.push(item1.path)}
                    className={`w-[8.875rem]  text-center flex justify-center  py-[0.875rem] relative px-[1.875rem]  text-nowrap  ${pathname === item1.path ? 'text-lemongreen' : 'textLimegray1'}`}>
                    {item1.label}
                    <div className={`${pathname === item1.path ? 'absolute left-0 h-[3px] w-full bottom-0 rounded-[0.375rem] bg-lemongreen' : ''}`}></div>
                </div>
                ))}
                
            </div>
        </div>
        <div className={`${readPath === "/TrainingPages/OverviewTraining" || readPath === "/TrainingPages/Feedback" || readPath === "/TrainingPages/Enrolment" || readPath === "/TrainingPages/Program" ? 'block' : 'hidden'} cursor-pointer flex flex-col gap-[3.3125rem]`}>
            {/* InformationContainers */}
            <div className='flex gap-[1.25rem]  font-semibold'>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>12</span>
                    <span className='text-formColor'>Active Programs</span>
                </div>
                </div>
            </div>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/image/Icon/Close.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>234</span>
                    <span className='text-formColor'>Total Enrollments</span>
                </div>
                </div>
            </div>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/svg/SvgImage/cardIcon.svg" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>74%</span>
                    <span className='text-formColor'>Completion Rate</span>
                </div>
                </div>
            </div>
            </div>
            <div className="center-center gap-[0.875rem]     font-semibold">
                {NavTraning.map(item2 => (
                <div
                    key={item2.path}
                    onClick={() => router.push(item2.path)}
                    className={`w-[8.875rem]  flex justify-center py-[0.875rem] relative px-[1.875rem]  text-nowrap  ${pathname === item2.path ? 'text-lemongreen' : 'textLimegray1'}`}>
                    {item2.label}
                    <div className={`${pathname === item2.path ? 'absolute left-0 h-[3px] w-full bottom-0 rounded-[0.375rem] bg-lemongreen' : ''}`}></div>
                </div>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default SubNavigation