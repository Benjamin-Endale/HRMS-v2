import React from 'react'
import SubNavigation from '@/app/SubNavigation'
const page = () => {
  return (
    <>
      <SubNavigation readPath='/RecruitmentPages/Candidates'/>
      <div className='font-semibold space-y-[3.1875rem]'>
        <div className='flex flex-col gap-[2.0625rem]'>
          <div className='flex flex-col'>
            <h1 className='textFormColor'>Candidate Management</h1>
            <h4 className='textLimegray'>Track and manage job applications</h4>
          </div>
          <div className='flex gap-[2.125rem]'>
            <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
              <img src="/image/Icon/SearchIcon.png" alt="" />
              <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
            </div>

            {/* filter */}
            <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
              <div className='flex items-center gap-[0.625rem]'>
                <img src="/svg/SvgImage/Filter.svg" alt="" />
                <span className='text-white'>Position</span>
              </div>
              <img src="/image/Icon/ArrowDown.png" alt="" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <table className='w-full pt-[4rem]'>
            <thead className='tableBordercolor'>
              <tr className='textFormColor1'>
                <th className='pb-[0.8125rem] pr-[7.5rem]'>Candidate</th>
                <th className='pb-[0.8125rem] pr-[7.875rem]'>Contact Information </th>
                <th className='pb-[0.8125rem] pr-[13.1875rem]'>Applied For</th>
                <th className='pb-[0.8125rem] pr-[7.5625rem]'>Applications</th>
                <th className='pb-[0.8125rem] pr-[8.9375rem]'>Application Submitted</th>
                <th className='pb-[0.8125rem] pr-[9.4375rem]'>Action</th>
              </tr>
            </thead>
            <tbody className='space-y-[1.375rem]'>
              <tr>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Engineering</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div className='flex flex-col'>
                    <h1 className='text-limeLight'>sarah.johnson@email.com</h1>
                    <h4 className='textLimegray'>+1 (555) 987-6543</h4>
                  </div>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Senior Software Engineer</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>45</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Jan 15, 2025</h4>
                </td>
                <td className='flex items-center gap-[2.5625rem] pt-[1.4375rem]'>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/message.png" alt="" />
                  </button>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/download.png" alt="" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default page