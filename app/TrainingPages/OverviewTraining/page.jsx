'use client'
import React from 'react'
import SubNavigation from '@/app/SubNavigation';
const page = () => {
    const recentActivity = [
    { name: "React Hooks Deep Dive", date: 'Feb 01, 2024"' , hour: '5 hours ago' },
    { name: "Performance Optimization", date: 'Feb 08, 2024' , hour: '2 hours ago' },
    { name: "Testing Strategies", date: 'Feb 15, 2024' , hour: '1 hours ago' },
    { name: "Testing Strategies", date: 'Feb 15, 2024' , hour: '1 hours ago' },
    ];

    const recentProgram = [
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    { name: "Advanced React Development", Technical: 'Technical' , difficulty: 'Advanced' , members: '24' , rating: '4.7' },
    ];



    return (
    <>
      <SubNavigation readPath ='/TrainingPages/OverviewTraining'/>
        <div className='font-semibold mt-[3.1875rem]'>
            <div className='flex gap-[5.0625rem]'>
                <div className='w-[43.625rem] '>
                    <div>
                        {/* firstContainer */}
                        <div className='flex flex-col gap-[2.375rem]'>
                            <div>
                                <h1 className='textFormColor '>Upcoming Sessions</h1>
                                <h4 className='textLimegray'>Training sessions scheduled for this week</h4>
                            </div>
                            <div>
                                <ul className='space-y-[1.3125rem] '>
                                    {recentActivity.map((act,id) =>(
                                        <div key={id} className='pl-4 customBorder1'>
                                            <li className=' list-disc marker:text-lemongreen'>
                                                <div className='between  pb-[1.5rem]'>
                                                    <div className='flex  flex-col gap-[0.5rem]'>
                                                        <h1 className='text-limeLight font-semibold'>{act.name}</h1>
                                                        <h4 className='textLimegray'>{act.date}</h4>
                                                    </div>
                                                    <div className='items-start '>
                                                        <span className='text-formColor text-[14px] rounded-[2.0625rem] backgroundColor px-[1.125rem] py-[0.5rem]'>{act.hour}</span>
                                                    </div>
                                                </div>                            
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[43.625rem]'>
                    <div>
                        {/* firstContainer */}
                        <div className='flex flex-col gap-[2.375rem]'>
                            <div>
                                <h1 className='textFormColor '>Popular Programs</h1>
                                <h4 className='textLimegray'>Most enrolled training programs</h4>
                            </div>
                            <div>
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
                </div>
            </div>
        </div>
    </>
  )
}

export default page