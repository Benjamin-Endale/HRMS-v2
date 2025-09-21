import React from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'
const page = () => {
  return (
      <div>
        <EmployeePortalSubNav readPath= '/EmployeePortal/Training/Programs'/>
        <div className='flex gap-[2.125rem]  mt-[3.6875rem]'>
            <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[rgba(21,24,18,1)] rounded-[0.625rem] px-[1.4375rem] '>
              <img src="/svg/SvgImage/Search.svg" alt="" />
                <input type="search" placeholder="Search program" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
            </div>

        {/* filter */}
        <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[rgba(21,24,18,1)] gap-[4.6875rem] px-[1.5625rem]'>
            <div className='flex items-center gap-[0.625rem]'>
              <img src="/svg/SvgImage/Filter.svg" alt="" />
                <span className='text-white'>All Category </span>
            </div>
            <img src="/image/Icon/ArrowDown.png" alt="" />
            </div>
        </div>
      </div>
  )
}

export default page