'use client'

import React , {useState} from 'react'
import { ProgressDashTraining } from '@/app/Components/ProgressDashTraining'
import ModalContainerProgram from '@/app/Modals/AddProgram/ModalContainerProgram';
import ModalContainerMaterial from '@/app/Modals/AddProgram/ModalContainerMaterial';
import AddProgram from '@/app/Modals/AddProgram/AddProgram';
import AddProgramMaterial from '@/app/Modals/AddProgram/AddProgramMaterial';
import SubNavigation from '@/app/SubNavigation';

const page = () => {
    const [isOpen,setisOpen] = useState(false)
    const [isOpen2,setisOpen2] = useState(false)
    const Tranining = [
    { Progress:'Enrollment',Header: "Advanced React Development", parag: 'Comprehensive course covering advanced React patterns, hooks, and performance optimization', name:'John Smith', time: '20', process: 'Technical', attended: '30', max:'30'},
    ];
  return (
    <>
    <SubNavigation readPath="/TrainingPages/Program"/>
    <div>
        <div className='space-y-[2.25rem] '>
            <div className='flex w-full flex-col gap-[3.625rem]'>
                <div className='space-y-[2.25rem]'>
                    {/* header */}
                    <div className='between'>
                        <div className='flex flex-col'>
                            <h1 className='textFormColor'>Training Programs</h1>
                            <h4 className='textLimegray'>Manage training courses and learning paths</h4>
                        </div>
                        <div>
                            <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                                <div className='center-center w-[12.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                                    <img src="/svg/SvgImage/plusSign.svg" alt="" />
                                    <span className='text-black font-semibold'>Create Program</span>
                                </div>
                            </button>
                            {/* Modal */}
                            <ModalContainerProgram  open={isOpen}>
                                <AddProgram onClose={() => setisOpen(false)} />
                            </ModalContainerProgram>
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
                            <span className='text-white'>Category </span>
                        </div>
                        <img src="/image/Icon/ArrowDown.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            
                <div className='h-[25rem] space-y-12 pb-12 overflow-y-auto scrollBarDash'>
                    {Tranining.map((per, idx) => (
                        <React.Fragment key={idx}>
                            <div className='flex flex-col gap-[2.25rem] '>
                                {/* MaincontainerHeader */}
                                <div className='flex w-full justify-between '>
                                    {/* Container */}
                                    <div className='space-y-[0.8125rem] '>
                                        {/* Header */}
                                        <div className='w-full flex gap-[0.875rem] items-center '>               
                                            <h1 className='textFormColor1'>{per.Header}</h1>
                                            <div className='flex items-center gap-[0.5rem]'>
                                                <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[7px] rounded-full text-Error'>Advance</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-[1.6875rem]'>
                                            <h4 className='textLimegray'> {per.parag}</h4>
                                            <div className='flex gap-[3.25rem] '>
                                                <div className='flex items-center gap-[0.75rem]'>
                                                    <img src="/image/Icon/Action/users.png" alt="" />
                                                    <span className='textLimegray'>Instructor: {per.name}</span>
                                                </div>
                                                <div className='flex items-center gap-[0.75rem]'>
                                                    <img src="/image/Icon/Action/timer.png" alt="" />
                                                    <span className='textLimegray'>{per.time} Hour</span>
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
                                        <div>
                                            <button type="button" onClick={()=>setisOpen2(true)} className='cursor-pointer'>
                                                <img src="/image/Icon/Action/Export.png" alt="" />
                                            </button>
                                            {/* Modal */}
                                            <ModalContainerMaterial  open={isOpen2}>
                                                <AddProgramMaterial onClose={() => setisOpen2(false)} />
                                            </ModalContainerMaterial>
                                        </div>
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
                                                    {per.attended}/{per.max}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <ProgressDashTraining attended={per.attended} max = {per.max} low={'bg-[#E3694A]'} high={'bg-[#BEE532]'} medium={'bg-[#F7AB1E]'}/>
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