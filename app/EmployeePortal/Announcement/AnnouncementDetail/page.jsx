'use client'


import React from 'react'
import { useRouter } from 'next/navigation'

const page = ({AnnounceDetail}) => {
 
  const router = useRouter()
  if(AnnounceDetail.message === "No announcements found for this user."){
    return <div className='center-center mt-50'>
      <h4 className='text-Error'>No Announcement</h4>
    </div>
  }
  return (
    <>

    <div className='font-semibold'>
        <table>
            <thead className='tableBordercolor'>
                <tr className='text-formColor'>
                    <th className='pb-[0.8125rem] pr-[24rem]'>Title</th>
                    <th className='pb-[0.8125rem] pr-[16.6875rem]'>Announcement</th>
                    <th className='pb-[0.8125rem] pr-[13.75rem]'>Categories</th>
                    <th className='pb-[0.8125rem] pr-[13.375rem]'>Date</th>
                    <th className='pb-[0.8125rem] pr-[5.75rem]'>Action</th>
                </tr>
            </thead>
            <tbody>
                {AnnounceDetail.announcementemployee.length > 0  ? (AnnounceDetail.announcementemployee.map((announce,index)=>(
                    <tr key={index} className='text-limegray'>
                        <td className='pt-[2.3125rem]'>{announce.title}</td>
                        <td className='pt-[2.3125rem]'>{announce.announcementcontent}</td>
                        <td className='pt-[2.3125rem]'>
                            <div className='flex items-center'>
                                <h4 className='px-[18px]  py-[8px] rounded-full bg-[rgba(190,229,50,0.05)] text-formColor'>{announce.categories}</h4>
                            </div>
                        </td>
                        <td className='pt-[2.3125rem]'>{announce.createdAt ? new Date(announce.createdAt).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</td>
                        <td className='pt-[2.3125rem]'>
                            <button onClick={()=>router.push('/EmployeePortal/Announcement/AnnouncementDetail')} className='cursor-pointer'>
                                <img src="/image/Icon/Action/eye.png " alt="" />
                            </button>
                        </td>
                    </tr>
                ))) : (
                  <tr>
                    <td colSpan='5' className='text-Error text-center'>No Announcement</td>
                  </tr>
                )}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default page