import React from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'
import { tr } from 'zod/v4/locales';

const page = ({tenantId, leaveType,userId,token ,leaves}) => {
 const handleState = (status) => {
  switch (status) {
    case "Pending": return "text-yellowCust";  
    default: return "text-Error"; // Default case
  }
};
  return (
    <>
    <EmployeePortalSubNav leaves={leaves} leaveType={leaveType} userId={userId} tenantId={tenantId} token={token} readPath= '/EmployeePortal/LeaveRequest/Pending'/>
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
          {leaves.leavesByStatus?.Pending ? (leaves.leavesByStatus.Pending.map((lvl) => (
            <tr key={lvl.leaveId} className='text-limegray'>
              <td className='pt-[2.3125rem]'> {lvl.leaveType}</td>
              <td className='pt-[2.3125rem]'>{lvl.duration}</td>
              <td className='pt-[2.3125rem]'>{lvl.date ? new Date(lvl.date).toLocaleDateString('en-GB').replace(/\//g,'-') : '--'}</td>
              <td className='pt-[2.3125rem]'>{lvl.reason}</td>
                <td className='pt-[2.3125rem]'>
                  <span className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(lvl.status)}`}>
                    {lvl.status || 'Unknown'}
                  </span>
                </td>
            </tr>
          ))) : (
            <tr className=''>
              <td colSpan='5' className=  'pt-[2.3125rem] text-limegray text-center '>No Leaves</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default page