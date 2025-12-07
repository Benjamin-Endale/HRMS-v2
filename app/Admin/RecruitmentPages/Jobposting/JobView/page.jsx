'use client';

import React , {useState} from 'react'
import AddJob from '@/app/Modals/AddJob/AddJob'

import ModalContainerJob from '@/app/Modals/AddJob/ModalContainerJob'
import SubNavigation from '@/app/SubNavigation';

// Recruitment

const page = ({token, tenantId , jobs}) => {
  const [isOpen,setisOpen] = useState(false)
  return (
    <>
      <SubNavigation jobs={jobs} readPath= '/RecruitmentPages/Jobposting'/>
      <div className='font-semibold'>
        <div className='flex flex-col gap-[2.0625rem]'>
          {/* header */}
          <div className='between'>
            <div className='flex flex-col'>
              <h1 className='textFormColor'>Job Postings</h1>
              <h4 className='textLimegray'>Manage job requisitions and postings</h4>
            </div>
            <div>
              <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                <div className='center-center w-[15.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                  <img src="/svg/Svgimage/PlusSign.svg" alt="" />
                  <span className='text-black'>Creating Job Postings</span>
                </div>
              </button>
              {/* Modal */}
                <ModalContainerJob  open={isOpen}>
                  <AddJob token={token} tenantId={tenantId} onClose={() => setisOpen(false)} />
                </ModalContainerJob>
            </div>
          </div>
            {/* SearchArea */}
            <div className='flex gap-[2.125rem]'>
              <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
                <img src="/image/Icon/SearchIcon.png" alt="" />
                <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
              </div>

              {/* filter */}
              <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                <div className='flex items-center gap-[0.625rem]'>
                  <img src="/svg/SvgImage/Filter.svg" alt="" />
                  <span className='text-white'>All Status</span>
                </div>
                <img src="/image/Icon/ArrowDown.png" alt="" />
              </div>
            </div>
            <div>
              <table className='w-full pt-[4rem]'>
                <thead className='border-b border-limegray'>
                  <tr className='textFormColor1'>
                    <th className='pb-[0.8125rem] pr-74.75'>Job Title</th>
                    <th className='pb-[0.8125rem] pr-54.5'>Department</th>
                    <th className='pb-[0.8125rem] pr-65.5'>Location</th>

                    <th className='pb-[0.8125rem] pr-49.75'>Posted Date</th>
                    <th className='pb-[0.8125rem] pr-[9.5rem]'>Action</th>
                  </tr>
                </thead>
                <tbody className='space-y-[1.375rem]'>
                    {jobs.jobs.length != 0 ? (jobs.jobs.map((jbs) => (
                        <tr key={jbs.id}>
                            <td className='pt-[1.625rem] '>
                            <div className='flex flex-col'>
                                <h1 className='text-limeLight'>{jbs.jobTitle}</h1>
                                <h4 className='textLimegray'>{jbs.jobType}</h4>
                            </div>
                            </td>
                            <td className='pt-[1.625rem]'>
                            <h4 className='text-limegray'>{jbs.departmentName}</h4>
                            </td>
                            <td className='pt-[1.625rem]'>
                            <h4 className='text-limegray'>{jbs.location}</h4>
                            </td>
                            <td className='pt-[1.625rem]'>
                                <h4 className='text-limegray'>{jbs.createdAt ? new Date(jbs.createdAt).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</h4>
                            </td>
                            <td className='flex items-center gap-[2.5625rem] pt-[2.1875rem]'>
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
                    ))) : (
                      <tr className='text-center  '>
                          <td colSpan="5" className='text-lemongreen pt-19'>No Job Posted recently</td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
        </div>

      </div>
    </>
  )
}

export default page