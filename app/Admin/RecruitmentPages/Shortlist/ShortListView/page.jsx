
'use client'
import React, { useState } from 'react'
import SubNavigation from '@/app/SubNavigation'
import { hrmsAPI } from '@/app/lib/api/client'
import ModalContainerSchedule from '@/app/Modals/AddSchedule/ModalContainerSchedule'
import AddSchedule from '@/app/Modals/AddSchedule/AddSchedule'

const page = ({ShortlIst , jobs , users}) => {
    const [isOpen,setisOpen] = useState(false)
    const handleDelete = async (data) => {
      try {
        console.log(data)
        const DeleteApplicant  = await  hrmsAPI.deleteCandidateShortlist(data)
         console.log("Deleted :  " , DeleteApplicant)
         window.alert("Deleted Succesfully!!")
      } catch (err) {
        console.error("❌ Error Deleting Candidate:", err.message || err);
      }  
  };
  return (
    <>
      <SubNavigation jobs={jobs} readPath='/RecruitmentPages/Shortlist'/>
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
                <th className='pb-[0.8125rem] text-nowrap pr-[7.125rem]'>Candidate</th>
                <th className='pb-[0.8125rem] text-nowrap pr-[13.9375rem]'>Position</th>
                <th className='pb-[0.8125rem] text-nowrap pr-[7.3125rem]'>Interviewer</th>
                <th className='pb-[0.8125rem] text-nowrap pr-[6.8125rem]'>Date & Time</th>
                <th className='pb-[0.8125rem] text-nowrap pr-[10.8125rem]'>Type</th>
                <th className='pb-[0.8125rem] text-nowrap pr-[8.625rem]'>Status</th>
                <th className='pb-[0.8125rem] text-nowrap pr-[10.125rem]'>Action</th>
              </tr>
            </thead>
            <tbody>
                {ShortlIst.shortlistedApplicants.length != 0 ?  (ShortlIst.shortlistedApplicants.map((apps,index) => (
                    <tr key={index}>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>{apps.name}</h4>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>--</h4>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>Not assigned</h4>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <div className='flex flex-col'>
                            <h1 className='text-limeLight'>{apps.shortlistedOn ? new Date(apps.shortlistedOn).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</h1>
                            <h4 className='textLimegray'>2:00 PM</h4>
                        </div>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <h4 className='textLimegray1'>Technical Interview</h4>
                        </td>
                        <td className='pt-[1.4375rem]'>
                        <div>
                            <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>{apps.status}</span>
                        </div>
                        </td>
                        <td className='pt-[2.0625rem] flex items-center gap-[2.5625rem]'>
                        <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                            <img src="/image/Icon/Action/calendar.png" alt="" />
                        </button>
                        {/* Modal */}
                        <ModalContainerSchedule  open={isOpen}>
                          <AddSchedule ShortlIst={ShortlIst} users={users} onClose={() => setisOpen(false)} />
                        </ModalContainerSchedule >
                        <button type="button" className='cursor-pointer' onClick={()=>handleDelete(apps.shortlistID)}>
                            <img src="/image/Icon/Action/ban.png" alt="" />
                        </button>
                        </td>
                    </tr>
                ))) : (
                    <tr className='text-center  '>
                        <td colSpan="7" className='text-lemongreen pt-19'>No ShortListed Candidate!</td>
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