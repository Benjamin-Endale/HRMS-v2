"use client";

import React from 'react'
import { useRouter } from "next/navigation";
const page = () => {

const router = useRouter();


  return (
    <div className='font-semibold flex flex-col gap-[3.9375rem]'>
      {/* headerSearcharea */}
      <div className='flex items-center gap-[2.125rem]'>
          <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
            <img src="/image/Icon/SearchIcon.png" alt="" />
            <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
          </div>
          <div className='w-[18.125rem] h-[3.4375rem]  flex items-center justify-center rounded-[0.625rem] bg-[#151812] gap-[4.6875rem]'>
            <div className='flex items-center gap-[0.625rem]'>
              <img src="/svg/SvgImage/Filter.svg" alt="" />
              <span className='text-white'>All Department</span>
            </div>
            <img src="/image/Icon/ArrowDown.png" alt="" />
          </div>
      </div>

      {/* headerSection2 */}
      <div className='between'>
        <div>
          <h1 className='textWhite'>Employees Directory</h1>
          <h4 className='textLimegray'>Manage employee profiles roles, and organization structure</h4>
        </div>
        <button type="button" className='cursor-pointer ' onClick={()=>router.push("EmployeeRegistration/AddNewemployee")}>
          <div className='center-center w-[12.75rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
            <img src="/svg/SvgImage/PlusSign.svg" alt="" />
            <span className='text-black'>Add Employees</span>
          </div>
        </button>
      </div>
      {/* mainContentArea */}
      <div className='h-[31.25rem]  overflow-y-auto scrollBarDash'>
        <table className='w-full text-left'>
          <thead className='text-white border-b border-limegray'>
            <tr>
              <th className='pb-[0.8125rem] pr-[7.5rem]'>Employee ID</th>
              <th className='pb-[0.8125rem] pr-[7.5rem]'>Employee Name</th>
              <th className='pb-[0.8125rem] pr-[7.5rem] '>Department</th>
              <th className='pb-[0.8125rem] pr-[16.875rem]'>Position</th>
              <th className='pb-[0.8125rem] '>Action</th>
            </tr>
          </thead>
          <tbody className='text-input'>
            <tr>
              <td className='pt-[2.25rem]'>EMP002</td>
              <td className='pt-[2.25rem]'>Benjamin Endale</td>
              <td className='pt-[2.25rem]'>Engineering</td>
              <td className='pt-[2.25rem] max-w-[150px] whitespace-normal break-words'>Senior Software Developer</td>
              <td className='flex items-center gap-[2.5625rem] pt-[2.25rem]'>
                <button type="button" className='cursor-pointer'>
                  <img src="/image/Icon/Action/eye.png" alt="" />
                </button>
                <button type="button" className='cursor-pointer'>
                  <img src="/image/Icon/Action/pen.png" alt="" />
                </button>
                <button type="button" className='cursor-pointer'>
                  <img src="/image/Icon/Action/Trash.png" alt="" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* mainContentAreafile */}
    </div>
  )
}

export default page