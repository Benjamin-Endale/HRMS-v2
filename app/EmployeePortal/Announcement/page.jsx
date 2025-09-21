'use client'


import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const Announcement = [
    {Title:'Open Enrollment 2025 is Live (Nov 1-15)' , Announcement: 'It,s time to select your 2025 be...' ,catagory: 'Ops & Systems' , date:'Mar 31, 2024' },
    {Title:'Open Enrollment 2025 is Live (Nov 1-15)' , Announcement: 'It,s time to select your 2025 be 1...' ,catagory: 'Ops & Systems' , date:'Mar 31, 2024' },
    {Title:'Open Enrollment 2025 is Live (Nov 1-15)' , Announcement: 'It,s time to select your 2025 be 2...' ,catagory: 'Ops & Systems' , date:'Mar 31, 2024' },


  ]
  const router = useRouter()
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
                {Announcement.map((announce)=>(
                    <tr key={announce.Announcement} className='text-limegray'>
                        <td className='pt-[2.3125rem]'>{announce.Title}</td>
                        <td className='pt-[2.3125rem]'>{announce.Announcement}</td>
                        <td className='pt-[2.3125rem]'>
                            <div className='flex items-center'>
                                <h4 className='px-[18px]  py-[8px] rounded-full bg-[rgba(190,229,50,0.05)] text-formColor'>{announce.catagory}</h4>
                            </div>
                        </td>
                        <td className='pt-[2.3125rem]'>{announce.date}</td>
                        <td className='pt-[2.3125rem]'>
                            <button onClick={()=>router.push('/EmployeePortal/Announcement/AnnouncementDetail')} className='cursor-pointer'>
                                <img src="/image/Icon/Action/eye.png " alt="" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
  )
}

export default page