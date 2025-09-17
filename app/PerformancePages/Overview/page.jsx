import React from 'react'
import { ProgressRate } from '@/app/Components/ProgressRate'
import HorizontalScroll from '@/app/Components/HorizontalScroll';
import SubNavigation from '@/app/SubNavigation';

const page = () => {
    const overview = [
    { name: "Engineering Avg", rate: 2.2 },
    { name: "Engineering Avg", rate: 4.2 },
    { name: "Engineering Avg", rate: 4.2 },
    { name: "Engineering Avg", rate: 4.2 },
    { name: "Engineering Avg", rate: 4.2 },
 
    ];
    const recentActivity = [
    { name: "Goal Completed", parag: 'Sarah Johnson completed "Launch Mobile App Feature"' , hour: '2 hours ago' },
    { name: "Review Scheduled", parag: 'Annual review scheduled for John Smith' , hour: '2 hours ago' },
    { name: "Feedback Received", parag: '360° feedback submitted for Mike Chen' , hour: '2 hours ago' },
    ];


  return (
    <>
        <SubNavigation readPath='PerformancePages/Overview'/>
        <div className='font-semibold space-y-[3.75rem]'>
            <div className='flex flex-col gap-[2.375rem]'>
                <div className='flex flex-col'>
                    <h1 className='textFormColor'>Performance Analytics</h1>
                    <h4 className='textLimegray'>Department-wise performance breakdown</h4>
                </div>
                <div className="w-[94.9375rem] scrollbar-hide  ">
                    <HorizontalScroll>
                        <div className="flex gap-[3.625rem] flex-nowrap">
                            {overview.map((over, idx) => (
                            <div
                                key={idx}
                                className="w-[26.1875rem] space-y-[0.9375rem] flex-shrink-0"
                            >
                                <div>
                                <h1 className="text-formColor text-4xl">{over.rate}</h1>
                                <span className="text-limeLight text-[15px]">{over.name}</span>
                                </div>

                                <ProgressRate 
                                rating={over.rate}
                                low="bg-[#E3694A]"
                                medium="bg-[#F7AB1E]"
                                high="bg-[#BEE532]"
                                />
                            </div>
                            ))}
                        </div>
                    </HorizontalScroll>
                </div>                    
            </div>
            <div className='between'>
                {/* firstContainer */}
                <div className='flex flex-col gap-[0.875rem] w-[43.625rem]'>
                    <div>
                        <h1 className='textFormColor'>Recent Activity</h1>
                        <h4 className='textLimegray'>Sarah Johnson completed "Launch Mobile App Feature"</h4>
                    </div>
                    <div>
                        <ul className='space-y-[1.3125rem] '>
                            {recentActivity.map((act,id) =>(
                                <div key={id} className='pl-4 customBorder1'>
                                    <li className=' list-disc marker:text-lemongreen'>
                                        <div className='between  py-[1.6875rem]'>
                                            <div className='flex flex-col gap-[0.5rem]'>
                                                <h1 className='text-limeLight'>{act.name}</h1>
                                                <h4 className='textLimegray'>{act.parag}</h4>
                                            </div>
                                            <div className='items-start'>
                                                <span className='textLimegray'>{act.hour}</span>
                                            </div>
                                        </div>                            
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* SeconContainer */}
                <div className='flex flex-col gap-[0.875rem] w-[43.625rem]'>
                    <div>
                        <h1 className='textFormColor'>Recent Activity</h1>
                        <h4 className='textLimegray'>Sarah Johnson completed "Launch Mobile App Feature"</h4>
                    </div>
                    <div className='space-y-[1.3125rem]'>
                        <div className='flex between-center customBorder1 '>
                            <div className='max-w-[17.8125rem]'>
                                <ul className='pl-4'>
                                    <li className=' list-disc marker:text-lemongreen'>
                                        <div className='py-[1.6875rem]'>
                                            <div className='flex  flex-col w-full gap-[0.5rem]'>
                                                <h1 className='text-limeLight'>John Smith</h1>
                                                <h4 className='textLimegray break-words'>Annual review schedule for John Smith</h4>
                                            </div>
                                        </div>                            
                                    </li>      
                                </ul>
                            </div>
                            <div>
                                <span className='textLimegray'>4/5</span>
                            </div>
                            <div>
                                <span className='textLimegray'>Goals: 3/5</span>
                            </div>
                            <div>
                                <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Completed</span>
                            </div>
                        </div>
                        <div className='flex between-center customBorder1 '>
                            <div className='max-w-[17.8125rem]'>
                                <ul className='pl-4'>
                                    <li className=' list-disc marker:text-lemongreen'>
                                        <div className='py-[1.6875rem]'>
                                            <div className='flex  flex-col w-full gap-[0.5rem]'>
                                                <h1 className='text-limeLight'>John Smith</h1>
                                                <h4 className='textLimegray break-words'>Annual review schedule for John Smith</h4>
                                            </div>
                                        </div>                            
                                    </li>      
                                </ul>
                            </div>
                            <div>
                                <span className='textLimegray'>4/5</span>
                            </div>
                            <div>
                                <span className='textLimegray'>Goals: 3/5</span>
                            </div>
                            <div>
                                <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-yellowCust'>In Progress</span>
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