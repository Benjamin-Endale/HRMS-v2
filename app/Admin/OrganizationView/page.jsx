'use client'
import React , {useState} from 'react'
import { useRouter } from 'next/navigation'
import { ProgressDash } from '@/app/Components/ProgressDash';
import AddOrg from '@/app/Modals/AddOrg/AddOrg'
import ModalContainerOrg from '@/app/Modals/AddOrg/ModalContainerOrg'

const page = () => {
const departments = [
  { name: "Engineering", total: 100, attended: 80},
  { name: "Marketing", total: 30, attended: 25 },
  { name: "HR", total: 400, attended: 375 },
  { name: "Sales", total: 40, attended: 2 },
  { name: "Finance", total: 25, attended: 20 },
];

    const recentProgram = [
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    ];

    const performanceOverview = [
    { name: "John Smith", job: 'Annual review schedule for John Smith' , Goals: 100 , Status: "Completed" , rating: '4.7' },
    { name: "John Smith", job: 'Annual review schedule for John Smith' , Goals: 100 , Status: "Completed" , rating: '4.7' },

    ];
    const router = useRouter()
  const [isOpen,setisOpen] = useState(false)

  return (
        <div className={`font-semibold flex flex-col gap-[3.3125rem]`}>
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
            <div className='space-y-[4.4375rem]'>
                <div className='flex items-center justify-between '>
                    <div className='flex items-start gap-[0.9375rem]'>
                        <img onClick={() => router.back()} src="/image/Icon/ArrowLeft.png" alt="Back" />
                        <div className=''>
                            <h1 className='textWhite '>Onyx Technology Inc.</h1>
                            <h4 className='textLimegray'>IT Technology</h4>
                        </div>
                    </div>
                    <div className='center-center gap-[1.5rem]'>
                        {/* <div className='w-[14.875rem] h-[3.4375rem] bg-lemongreen rounded-[0.625rem]'>
                            <button type='button' onClick={()=>setisOpen(true)} className='cursor-pointer w-full h-full rounded-[0.625rem] flex items-center justify-center gap-[10px]'>
                                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                                <span>Add Organization</span>
                            </button> 
                            Modal
                            <ModalContainerOrg  open={isOpen}>
                                <AddOrg onClose={() => setisOpen(false)} />
                            </ModalContainerOrg>
                        </div> */}
                        <div className='w-[11.0625rem] h-[3.4375rem] bg-inherit border border-limegray rounded-[0.625rem]'>
                            <button type='button' onClick={()=>setisOpen(true)} className='cursor-pointer w-full h-full rounded-[0.625rem] flex items-center justify-center gap-[10px]'>
                                <img src="/image/Icon/Action/Ban.png" alt="" />
                                <span className='text-white'>Suspend</span>
                            </button> 
                        </div>
                    </div>
                </div>
            {/* headerSection */}
            <div className='flex gap-[4.6875rem]'>
                <div className='space-y-[2.25rem] w-[43.5625rem] px-[1rem] h-[40.9375rem] scrollBarDash overflow-y-auto'>
                {departments.map((dept, idx) => (
                    <div key={idx} className='space-y-[1.1875rem]'>
                    <div className='between-center'>
                        <div className='flex space-x-[1.375rem]'>
                        <span className='text-limegray'>{dept.name}</span>
                        </div>
                        <div>
                        <ul className='text-white flex gap-[1.75rem]'>
                            <li className='textLimegray'>{dept.total} employees</li>
                            <li className='list-disc marker:text-lemongreen textLimegray'>
                            {((dept.attended / dept.total) * 100).toFixed(1)}% attendance
                            </li>
                        </ul>
                        </div>
                    </div>
    
                    {/* Progress bar */}
                    <ProgressDash attended={dept.attended} maxEmp={dept.total} low={'bg-[#E3694A]'} high={'bg-[#DFDFDF]'} medium={'bg-[#F7AB1E]'}/>
                    </div>
                ))}
                </div>
                <div className='flex flex-col gap-[6rem]'>
                    <div className='w-[43.625rem] relative'>
                            {/* firstContainer */}
                            <div className='absolute top-[-3rem]'>
                                    <h1 className='textFormColor '>Popular Programs</h1>
                                </div>
                            <div className='flex flex-col gap-[2.375rem]'>
                                <div className='space-y-[2.25rem] w-[43.5625rem] px-[1rem]  h-[15.96875rem] scrollBarDash overflow-y-auto'>
                                    <ul className='space-y-[1.3125rem] '>
                                        {recentProgram.map((act,id) =>(
                                            <div key={id} className='pl-4 customBorder1'>
                                                <li className=' list-disc marker:text-lemongreen'>
                                                    <div className='between  pb-[1.5rem]'>
                                                        <div className='flex  flex-col gap-[0.5rem]'>
                                                            <h1 className='text-limeLight font-semibold'>{act.name}</h1>
                                                            <div className='flex gap-1'>
                                                                <h4 className='textLimegray'>{act.Technical}</h4>
                                                                <h4 className="textLimegray before:content-['•'] before:mr-1">{act.difficulty}</h4>
                                                            </div>
                                                        </div>
                                                        <div className='items-start '>
                                                            <div className='flex gap-[0.5625rem]'>
                                                                <h4 className='text-formColor'>{act.members}</h4>
                                                                <h4 className='text-formColor'>Enrolled</h4>
                                                            </div>
                                                            <div className='flex items-center  gap-[0.5625rem]'>
                                                                <img src="/image/star.png" alt="" />
                                                                <span className='text-limegray'>{act.rating}</span>
                                                            </div>
                                                        </div>
                                                    </div>                            
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div>
                        <div className='relative'>
                            <div className='absolute top-[-3rem]'>
                                    <h1 className='textFormColor '>Team Performance Overview</h1>
                                </div>
                            <div className='space-y-[2.25rem] w-[43.5625rem] px-[1rem]  h-[15.96875rem] scrollBarDash overflow-y-auto'>
                                <div className='flex between-center  '>
                                    <div className='flex flex-1'>
                                        <ul className='pl-4 w-full'>
                                            {performanceOverview.map((per,id) => (
                                                <div key={id} className='mb-[1.5rem] pb-[1.5rem] flex gap-[7.0625rem] customBorder1 '>
                                                    <li className=' list-disc marker:text-lemongreen'>
                                                        <div className='w-[16.25rem] '>
                                                            <div className='flex  flex-col w-full gap-[0.5rem]'>
                                                                <h1 className='text-limeLight'>{per.name}</h1>
                                                                <h4 className='textLimegray break-words'>{per.job}</h4>
                                                            </div>
                                                        </div>                            
                                                    </li>      
                                                    <div className='flex items-center flex-1 justify-between'>
                                                        <div>
                                                            <span className='textLimegray'>Goals: {per.Goals}%</span>
                                                        </div>
                                                        <div>
                                                            <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>{per.Status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default page