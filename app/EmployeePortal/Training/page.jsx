import React from 'react'
import SubNavigation from '@/app/SubNavigation'

const page = () => {
  return (
    <>
    
    <div className=''>
      <div className='flex items-center gap-[2.125rem]'>
          <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
            <img src="/image/Icon/SearchIcon.png" alt="" />
            <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
          </div>
          <div className='w-[18.125rem] h-[3.4375rem]  flex items-center justify-center rounded-[0.625rem] bg-[#151812] gap-[4.6875rem]'>
            <div className='flex items-center gap-[0.625rem]'>
              <img src="/svg/SvgImage/Filter.svg" alt="" />
              <span className='text-white'>All Catagory</span>
            </div>
            <img src="/imgae/Icon/ArrowDown.png" alt="" />
          </div>
      </div>
     <table>
      <thead className='tableBordercolor'>
        <tr className='text-formColor'>
          <th className='pb-[0.8125rem] pr-[13.3125rem]'>Course Name</th>
          <th className='pb-[0.8125rem] pr-[10.0625rem]'>Instructor</th>
          <th className='pb-[0.8125rem] pr-[7.5625rem]'>Duration</th>
          <th className='pb-[0.8125rem] pr-[10.8125rem]'>Level</th>
          <th className='pb-[0.8125rem] pr-[10.125rem]'>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className='text-limegray'>
          <td className='pt-[2.25rem]'>
            <p>React Hooks Deep Dive</p>
            <p>Feb 01, 2024 </p>
          </td>
        <td className='flex gap-[0.75rem] pt-[2.25rem] '>
          <img src="/image/userGray.png" alt="" />
          <p >John Smith</p>
        </td>
        <td className='flex gap-2 pt-[2.25rem] '>
          <img src="/image/icon/Action/timer.png" alt="" />
          <p>20 Hour</p>
        </td>
        <td></td>
        </tr>
      </tbody>
     </table>
    </div>
    </>
  )
}

export default page