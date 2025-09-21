
'use client'
import React from 'react'
import SubNavigation from '@/app/SubNavigation'


const page = () => {
  return (
    <>
      <SubNavigation readPath='/RecruitmentPages/Shortlist'/>
      <div className='font-semibold space-y-[3.3125rem]'>
        <div className='flex flex-col'>
            <h1 className='textFormColor'>Shortlisted candidate</h1>
            <h4 className='textLimegray'>here listed Shortlisted candidate</h4>
        </div>
        {/* table */}
        <div>
          <table>
            <thead className='tableBordercolor'>
              <tr className='textFormColor1'>
                <th className='pb-[0.8125rem] pr-[7.125rem]'>Candidate</th>
                <th className='pb-[0.8125rem] pr-[13.9375rem]'>Position</th>
                <th className='pb-[0.8125rem] pr-[7.3125rem]'>Interviewer</th>
                <th className='pb-[0.8125rem] pr-[6.8125rem]'>Date & Time</th>
                <th className='pb-[0.8125rem] pr-[10.8125rem]'>Type</th>
                <th className='pb-[0.8125rem] pr-[8.625rem]'>Status</th>
                <th className='pb-[0.8125rem] pr-[10.125rem]'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Engineering</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Senior Software Engineer</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Bereket Daniel</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div className='flex flex-col'>
                    <h1 className='text-limeLight'>Jan 25, 2024</h1>
                    <h4 className='textLimegray'>2:00 PM</h4>
                  </div>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Technical Interview</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Shortlist</span>
                  </div>
                </td>
                <td className='pt-[2.0625rem] flex items-center gap-[2.5625rem]'>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/calendar.png" alt="" />
                  </button>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/ban.png" alt="" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Engineering</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Senior Software Engineer</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Bereket Daniel</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div className='flex flex-col'>
                    <h1 className='text-limeLight'>Jan 25, 2024</h1>
                    <h4 className='textLimegray'>2:00 PM</h4>
                  </div>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>HR Interview</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Shortlist</span>
                  </div>
                </td>
                <td className='pt-[2.0625rem] flex items-center gap-[2.5625rem]'>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/calendar.png" alt="" />

                  </button>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/ban.png" alt="" />
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