import React from 'react'

const page = () => {
    const availableTraining = [
    { course: "React Hooks Deep Dive", Date: 'Feb 01, 2024 '},
    { course: "Performance Optimization", Date: 'Feb 01, 2024 '},
    { course: "React Hooks Deep Dive", Date: 'Feb 01, 2024 '},
    { course: "React Hooks Deep Dive", Date: 'Feb 01, 2024 '},
    ];

    const latestAnnouncement = [
    { News: "New employee John Doe joined Marketing", Date: '1 Day'},
    { News: "Weekly attendance report generated", Date: '4 hours ago'},
    { News: "Leave request approved for Alice Smith", Date: '4 hours ago'},
    { News: "Leave request approved for Alice Smith", Date: '4 hours ago'},
    ];

  return (
    <>
    <div className='space-y-[4.6875rem] font-semibold pb-[3.3125rem]'>
        <div>
            <div className='flex gap-[2.5625rem]'>
                {/* cardDashMainContent */}
                <div className='carDash1 bg-[url(/image/imageDashcard1.png)]'>
                    <div className='h-full between flex-col'>
                        <div className='flex justify-between'>
                            <div>
                            <img src="/image/Icon/ProfileIcon.png" alt="" />
                            </div>
                            <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                            <img src="/image/Icon/ArrowRightIcon.png" alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-5xl'>86%</span>
                            <span>My Performance</span>
                        </div>
                    </div>
                </div>
                {/* cardDashMainContent */}

                <div className='carDash1 bg-[rgba(190,229,50,0.03)]'>
                    <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                        <img src="/image/Icon/TimeIcon.png" alt="" />
                        </div>
                        <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                        <img src="/image/Icon/ArrowRightIcon.png" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-white'>100 hr</span>
                        <span className='text-white'>From total 160 hr </span>
                    </div>
                    </div>
                </div>

                <div className='carDash1 bg-[rgba(190,229,50,0.03)]'>
                    <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                        <img src="/image/Icon/TimeIcon.png" alt="" />
                        </div>
                        <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                        <img src="/image/Icon/ArrowRightIcon.png" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-white'>15</span>
                        <span className='text-white'>Leave Balance</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='between'>
            <div className='w-[44.75rem] space-y-[2.6875rem]'>
                <div className='between'>
                    <div>
                        <h1 className='textFormColor'>Available Training</h1>
                        <h4 className='textLimegray'>Critical System Notification</h4>
                    </div>
                    <div className='flex items-baseline-last'>
                        <button type="button" className='text-lemongreen text-[0.9375rem] font-medium'>See more</button>
                    </div>
                </div>
                <div>
                    <div>
                        <ul className='space-y-[1.3125rem] '>
                            {availableTraining.map((act,id) =>(
                                <div key={id}>
                                    <li className=''>
                                        <div className='between items-center pl-[1.75rem] h-[4.8125rem] pr-[0.84375rem] py-[1rem] rounded-[15px] bg-[rgba(190,229,50,0.03)]'>
                                            <div className='flex gap-[0.9375rem] '>
                                                <div className='text-lemongreen  pt-1'><img src="/image/Dot.png" alt="" /></div>
                                                <div className='flex  flex-col gap-[0.5rem] leading-none'>
                                                    <h1 className='text-limeLight font-semibold'>{act.course}</h1>
                                                    <div>
                                                        <h4 className='textLimegray'>{act.Date}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <button className='cursor-pointer py-[1.0625rem] px-[2.6875rem] border rounded-[10px] border-[rgba(93,97,80,0.44)] text-formColor font-medium text-[14px]' type="button">Register</button>
                                            </div>
                                        </div>                            
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[44.75rem] space-y-[2.6875rem]'>
               <div className='between'>
                    <div>
                        <h1 className='textFormColor'>Latest Announcement </h1>
                        <h4 className='textLimegray'>Latest updates and notifications</h4>
                    </div>
                    <div className='flex items-baseline-last'>
                        <button type="button" className='text-lemongreen text-[0.9375rem] font-medium'>See more</button>
                    </div>
                </div>
                <div>
                    <div>
                        <ul className='space-y-[1.3125rem] '>
                            {latestAnnouncement.map((act,id) =>(
                                <div key={id}>
                                    <li className=''>
                                        <div className=' flex  items-center h-[4.8125rem] py-[1.125rem] px-[2.625rem] rounded-[15px] bg-[rgba(190,229,50,0.03)]'>
                                            <div className='flex gap-[0.9375rem] '>
                                                <div className='text-lemongreen  pt-1'><img src="/image/Icon/TimeIcon.png" alt="" /></div>
                                                <div className='flex  flex-col gap-[0.5rem] leading-none'>
                                                    <h1 className='text-limeLight font-semibold'>{act.News}</h1>
                                                    <div>
                                                        <h4 className='textLimegray'>{act.Date}</h4>
                                                    </div>
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
    </>
  )
}

export default page