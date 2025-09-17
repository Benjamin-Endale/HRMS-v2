import React from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'


const page = () => {
  return (
    <>
    <EmployeePortalSubNav readPath= '/EmployeePortal/Performance/MyPerformance'/>
    <div className='mt-[2.3125rem] font-semibold'>
      <div className='flex gap-[1.25rem]'>
          <div className='carDash2'>
              <div className='h-full between flex-col'>
              <div className='flex justify-between'>
                  <div>
                      <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                  </div>
              </div>
              <div className='flex flex-col'>
                  <span className='text-5xl text-formColor'>81%</span>
                  <span className='text-formColor'>Attendance </span>
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
                  <span className='text-5xl text-formColor'>56%</span>
                  <span className='text-formColor'>Goal Achieved </span>
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
                      <span className='text-5xl text-formColor'>4.0</span>
                      <span className='text-formColor'>Feedback Star / 5.0</span>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default page