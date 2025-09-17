'use client'

import React, { useState } from 'react'
import { ProgressDashPerformance } from '@/app/Components/ProgressDashPerformance'
import ModalContainerGoal from '@/app/Modals/AddGoal/ModalContainerGoal';
import AddGoal from '@/app/Modals/AddGoal/AddGoal';
import SubNavigation from '@/app/SubNavigation';


const page = () => {
    const [isOpen , setisOpen ] = useState(false)
    const performance = [
    { Progress:'Progress',Header: "Improve Code Review Process", parag: 'Implement automated code review tools and reduce review time by 30%', name:'John Smith', date: 'Due: Mar 31, 2024', process: 'Process Improvement', percentage: 85},
    { Progress:'Progress',Header: "Launch Mobile App Feature", parag: 'Implement automated code review tools and reduce review time by 30%', name:'John Smith', date: 'Due: Mar 31, 2024', process: 'Process Improvement', percentage: 45},
    { Progress:'Progress',Header: "Launch Mobile App Feature", parag: 'Implement automated code review tools and reduce review time by 30%', name:'John Smith', date: 'Due: Mar 31, 2024', process: 'Process Improvement', percentage: 45},

    { Progress:'Progress',Header: "Launch Mobile App Feature", parag: 'Implement automated code review tools and reduce review time by 30%', name:'John Smith', date: 'Due: Mar 31, 2024', process: 'Process Improvement', percentage: 45}
    ];
  return (
    <>
        <SubNavigation readPath="/PerformancePages/Goals"/>
        <div className='font-semibold '>
            <div className='space-y-[2.25rem] '>
                <div className='flex w-full flex-col gap-[3.625rem]'>
                    <div className='space-y-[2.25rem]'>
                        {/* header */}
                        <div className='between'>
                            <div className='flex flex-col'>
                                <h1 className='textFormColor'>Goals & KPI Management</h1>
                                <h4 className='textLimegray'>Track and manage employee goals and key performance indicators</h4>
                            </div>
                            <div>
                                <button type="button" className='cursor-pointer ' onClick={()=>setisOpen(true)}>
                                    <div className='center-center w-[12.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                                        <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                                        <span className='text-black'>Create Goal</span>
                                    </div>
                                </button>
                                {/* Modal */}
                                <ModalContainerGoal  open={isOpen}>
                                    <AddGoal onClose={() => setisOpen(false)} />
                                </ModalContainerGoal>
                            </div>
                        </div>
                        {/* SearchArea */}
                        <div className='flex gap-[2.125rem]'>
                            <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
                                <img src="/image/Icon/SearchIcon.png" alt="" />
                                <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
                            </div>

                        {/* filter */}
                        <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                            <div className='flex items-center gap-[0.625rem]'>
                                <img src="/svg/SvgImage/Filter.svg" alt="" />
                                <span className='text-white'>All Status</span>
                            </div>
                            <img src="/image/Icon/ArrowDown.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                
                    <div className='h-[25rem] space-y-12 pb-12 overflow-y-auto scrollBarDash'>
                        {performance.map((per, idx) => (
                            <React.Fragment key={idx}>
                                <div className='flex flex-col gap-[2.25rem] '>
                                    {/* MaincontainerHeader */}
                                    <div className='flex w-full justify-between '>
                                        {/* Container */}
                                        <div className='space-y-[0.8125rem]'>
                                            {/* Header */}
                                            <div className='w-full flex gap-[0.875rem] items-center '>               
                                                <h1 className='textFormColor1'>{per.Header}</h1>
                                                <div className='flex items-center gap-[0.5rem]'>
                                                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[7px] rounded-full text-Error'>High</span>
                                                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[7px] rounded-full text-yellowCust '>In Progress</span>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-[1.6875rem]'>
                                                <h4 className='textLimegray'> {per.parag}</h4>
                                                <div className='flex gap-[3.25rem] '>
                                                    <div className='flex items-center gap-[0.75rem]'>
                                                        <img src="/image/Icon/Action/users.png" alt="" />
                                                        <span className='textLimegray'>{per.name}</span>
                                                    </div>
                                                    <div className='flex items-center gap-[0.75rem]'>
                                                        <img src="/image/Icon/Action/calendarSecond.png" alt="" />
                                                        <span className='textLimegray'>{per.date}</span>
                                                    </div>
                                                    <div className='flex items-center gap-[0.75rem]'>
                                                        <img src="/image/Icon/Action/Bars.png" alt="" />
                                                        <span className='textLimegray'>{per.process}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ActionBtn */}
                                        <div className='flex items-start gap-[2.5625rem] '>
                                            <button type="button" className='cursor-pointer'>
                                                <img src="/image/Icon/Action/eye.png" alt="" />
                                            </button>
                                            <button type="button" className='cursor-pointer'>
                                                <img src="/image/Icon/Action/pen.png" alt="" />
                                            </button>
                                            <button type="button" className='cursor-pointer'>
                                                <img src="/image/Icon/Action/Trash.png" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='space-y-[1.1875rem]'>
                                        <div className='between-center'>
                                            <div className='flex space-x-[1.375rem]'>
                                                <span className='text-formColor text-[1rem] font-medium'>{per.Progress}</span>
                                            </div>
                                            <div>
                                                <ul className='text-white flex gap-[1.75rem]'>
                                                    <li className='text-limeLight'>
                                                        {per.percentage.toFixed(1)}% 
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* Progress bar */}
                                        <ProgressDashPerformance percentage={per.percentage} low={'bg-[#E3694A]'} high={'bg-[#BEE532]'} medium={'bg-[#F7AB1E]'}/>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}            
                    </div>
            </div>
        </div>

    </>
  )
}

export default page