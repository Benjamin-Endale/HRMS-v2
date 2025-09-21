import React from 'react'
import { ProgressDash } from '@/app/Components/ProgressDash';

const page = () => {
const departments = [
  { name: "Engineering", total: 100, attended: 80},
  { name: "Marketing", total: 30, attended: 25 },
  { name: "HR", total: 400, attended: 375 },
  { name: "Sales", total: 40, attended: 2 },
  { name: "Finance", total: 25, attended: 20 },
];

  return (
    <>
    
      {/* mainContainer */}
      <div className='flex gap-[3.25rem]'>
        {/* firstSection */}
        <div className='flex flex-col gap-[4.875rem] font-semibold'>
          {/* firstCardsection */}
          <div className='flex gap-[2.5625rem]'>
            {/* cardDashMainContent */}
            <div className='cardDash bg-[url(/image/imageDashcard.png)]'>
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
                  <span className='text-5xl'>1230</span>
                  <span>Total Employees</span>
                </div>
              </div>
            </div>
            {/* cardDashMainContent */}

            <div className='cardDash bg-[rgba(190,229,50,0.03)]'>
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
                  <span className='text-5xl text-white'>234</span>
                  <span className='text-white'>Today's Attendance</span>
                </div>
              </div>
            </div>
          </div>

          {/* secondSectionofDash */}
          <div className='space-y-[3.875rem]'>
            <div className='between'>
              {/* header */}
              <div>
                <h1 className='text-white text-xl'>Department Overview</h1>
                <h4 className='text-limegray text-[15px] font-medium'>Employee count and attendance by department</h4>
              </div>
              <button type="button" className='text-lemongreen font-medium self-end text-[15px]'>See more</button>
            </div>

        {/* headerSection */}
          <div className='space-y-[2.25rem] h-[23.0625rem] scrollBarDash overflow-y-auto'>
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
          </div>
        </div>
        




        {/* secondSection */}
        <div className='w-[30.375rem] center-center h-[49.9375rem] bg-[rgba(190,229,50,0.05)] rounded-3xl font-semibold'>
          <div className='space-y-[5.125rem] w-[24.1875rem]' >
            <div className='flex flex-col  gap-[3.0625rem] h-[22.3125rem]'>
              {/* activitiesContainer */}
              <div className='between'>
                <div>
                  <h1 className='text-white text-xl'>Recent Activities</h1>
                  <h4 className='text-accountColor text-[15px] font-medium'>Latest updates and notifications</h4>
                </div>
                <button type="button" className='text-lemongreen font-medium self-end text-[15px]'>See more</button>
              </div>

              {/* notificationContainer */}
              <div className='flex flex-col gap-[0.9375rem] scrollBarDash overflow-y-auto'>

                <div className='cardActivitydash'>
                  <div>
                    <img src="/image/Icon/TimeIcon.png" alt="" />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-accountColor'> New employee John Doe joined Marketing</span>
                    <span className='text-white text-sm font-normal'>1 day ago</span>
                  </div>
                </div>
                <div className='cardActivitydash'>
                  <div>
                    <img src="/image/Icon/TimeIcon.png" alt="" />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-accountColor'> New employee John Doe joined Marketing</span>
                    <span className='text-white text-sm font-normal'>1 day ago</span>
                  </div>
                </div>
                
              </div>
            </div>

            {/* SecurtiySection */}
            <div className='flex flex-col  gap-[3.0625rem] h-[16.875rem]' >
              <div className='between'>
                <div>
                  <h1 className='text-white text-xl'>System Alerts</h1>
                  <h4 className='text-accountColor text-[15px] font-medium'>Critical System Notification</h4>
                </div>
                <button type="button" className='text-lemongreen font-medium self-end text-[15px]'>See more</button>
              </div>
              {/* notificationContainer */}
              <div className='flex flex-col gap-[0.9375rem]  scrollBarDash overflow-y-auto'>
                {/* activitiesContainer */}
                <div className='cardActivitydash'>
                  <div>
                    <img src="/image/Icon/PerformanceIcon.png" alt="" />
                  </div>
                  <div className='flex flex-col '>
                    <span className='text-accountColor text-nowrap'> Performance Review Deadline</span>
                    <span className='text-white text-sm font-normal'>Q2 reviews due in 5 days</span>
                  </div>
                </div>
                <div className='cardActivitydash'>
                  <div>
                    <img src="/image/Icon/PerformanceIcon.png" alt="" />
                  </div>
                  <div className='flex flex-col '>
                    <span className='text-accountColor text-nowrap'> Performance Review Deadline</span>
                    <span className='text-white text-sm font-normal'>Q2 reviews due in 5 days</span>
                  </div>
                </div>
                <div className='cardActivitydash'>
                  <div>
                    <img src="/image/Icon/PerformanceIcon.png" alt="" />
                  </div>
                  <div className='flex flex-col '>
                    <span className='text-accountColor text-nowrap'> Performance Review Deadline</span>
                    <span className='text-white text-sm font-normal'>Q2 reviews due in 5 days</span>
                  </div>
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