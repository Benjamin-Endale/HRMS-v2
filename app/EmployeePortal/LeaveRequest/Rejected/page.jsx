import React from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'

const page = () => {
  return (
    <>
    <EmployeePortalSubNav readPath= '/EmployeePortal/LeaveRequest/Rejected'/>
    <div className='mt-[4.5625rem] font-semibold'>
      <table>
        <thead className='text-formColor tableBordercolor'>
          <tr>
            <th className='pb-[0.8125rem] pr-[12.75rem]'>Leave Type</th>
            <th className='pb-[0.8125rem] pr-[9.375rem]'>Duration</th>
            <th className='pb-[0.8125rem] pr-[12.125rem]'>Date</th>
            <th className='pb-[0.8125rem] pr-[34rem]'>Reason</th>
            <th className='pb-[0.8125rem] pr-[6.5625rem]'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-limegray'>
            <td className='pt-[2.3125rem]'>Annual Leave</td>
            <td className='pt-[2.3125rem]'>5 days</td>
            <td className='pt-[2.3125rem]'>02-43-2025</td>
            <td className='pt-[2.3125rem]'>I am writing to respectfully request permission to be absent....</td>
            <td className='pt-[2.3125rem]'>
              <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-Error'>Rejected</span>
              </div>
            </td>
          </tr>
          <tr className='text-limegray'>
            <td className='pt-[2.3125rem]'>Annual Leave</td>
            <td className='pt-[2.3125rem]'>5 days</td>
            <td className='pt-[2.3125rem]'>02-43-2025</td>
            <td className='pt-[2.3125rem]'>I am writing to respectfully request permission to be absent....</td>
            <td className='pt-[2.3125rem]'>
              <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-Error'>Rejected</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

export default page