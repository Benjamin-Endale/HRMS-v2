import React from 'react'

const page = () => {
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
                <tr className='text-limegray'>
                    <td className='pt-[2.3125rem]'>Open Enrollment 2025 is Live (Nov 1–15)</td>
                    <td className='pt-[2.3125rem]'>It’s time to select your 2025 be...</td>
                    <td className='pt-[2.3125rem]'>
                        <div className='flex items-center'>
                            <h4 className='px-[18px]  py-[8px] rounded-full bg-[rgba(190,229,50,0.05)] text-formColor'>Urgent</h4>
                        </div>
                    </td>
                    <td className='pt-[2.3125rem]'>23-01-2025</td>
                    <td className='pt-[2.3125rem]'>
                        <button className='cursor-pointer'>
                            <img src="/image/Icon/Action/eye.pn clag" alt="" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

export default page