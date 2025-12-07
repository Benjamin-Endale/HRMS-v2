'use client'
import React from 'react'
import SubNavigation from '@/app/SubNavigation'
import { hrmsAPI } from '@/app/lib/api/client'
const page = ({Applicants , jobs}) => {
  // 🟢 Handle password change
  const handleRight = async (data) => {
      try {
        console.log(data)
        const moveInterview  = await  hrmsAPI.createInterview(data)
         console.log("Added To ShortList :  " , moveInterview)
         window.alert("Added Succesfully!!")
      } catch (err) {
        console.error("❌ Error Adding Candidate:", err.message || err);
      }  
  };
  
    const handleDelete = async (data) => {
      try {
        console.log(data)
        const DeleteApplicant  = await  hrmsAPI.deleteApplicant(data)
         console.log("Deleted :  " , DeleteApplicant)
         window.alert("Deleted Succesfully!!")
      } catch (err) {
        console.error("❌ Error Deleting Candidate:", err.message || err);
      }  
  };

  
  return (
    <>
      <SubNavigation  jobs={jobs} readPath='/RecruitmentPages/Candidates'/>
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
                <th className='pb-[0.8125rem] text-nowrap pr-50'>Candidate</th>
                <th className='pb-[0.8125rem] text-nowrap pr-48'>Contact Information </th>
                <th className='pb-[0.8125rem] text-nowrap pr-67'>Applied For</th>
                <th className='pb-[0.8125rem] text-nowrap pr-39'>Application Submitted</th>
                <th className='pb-[0.8125rem] text-nowrap pr-44'>Action</th>
              </tr>
            </thead>
            <tbody className='space-y-[1.375rem]'>
                {Applicants.applicants.length != 0 ?  (Applicants.applicants.map((apps , index)=>(
                    <tr key={index}>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>{apps.name}</h4>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <div className='flex flex-col'>
                            <h1 className='text-limeLight'>{apps.email}</h1>
                            <h4 className='textLimegray'>{apps.phone}</h4>
                        </div>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>{apps.position}</h4>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>{apps.applicationsSubmittedDate ? new Date(apps.applicationsSubmittedDate).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</h4>
                        </td>
                        <td className='flex items-center gap-6.25  pt-[1.4375rem]'>
                          <div className='flex items-center gap-7.75'>
                            <button type="button" className='cursor-pointer'>
                                <img src="/image/Icon/Action/message.png" alt="" />
                            </button>
                            <button type="button" className='cursor-pointer'>
                                <img src="/image/Icon/Action/download.png" alt="" />
                            </button>
                          </div>
                          <div className='w-[1px] bg-[rgba(255,255,255,0.14)] h-6'></div>
                          <div className='flex items-center gap-7.75'>
                            <button type="button" className='cursor-pointer' onClick={()=>handleRight(apps.id)}>
                                <img src="/image/Icon/Action/Right.png" alt="" />
                            </button>
                            <button type="button" className='cursor-pointer  ' onClick={()=>handleDelete(apps.id)}>
                                <img src="/image/Icon/Action/X.png" alt="" />
                            </button>
                          </div>
                        </td>
                    </tr>
                )
                )) : (
                  <tr className='text-center  '>
                    <td colSpan="5" className='text-lemongreen pt-19'>No Candidate Found!</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default page