'use client'
import ModalContainerRevoke from '@/app/Modals/Revoke/ModalContainerRevoke';
import Revoke from '@/app/Modals/Revoke/Revoke';
import ModalContainerSignOut from '@/app/Modals/SignOut/ModalContainerSignOut';
import Signout from '@/app/Modals/SignOut/Signout';
import ModalContainerSuccessful from '@/app/Modals/Successfully/ModalContainerSuccessful';
import Successful from '@/app/Modals/Successfully/Successful';
import { useRouter } from 'next/navigation';
import React , {useState} from 'react'

import { hrmsAPI } from '@/app/lib/api/client';

const page = ({leaves , token}) => {
 

    const [leaveList, setLeaveList] = useState(leaves.leaves || []); 
 
 
  const [isOpen,setisOpen] = useState(false) 
  const [isOpen2,setisOpen2] = useState(false)
    const [selectedUser,setSelectedUser] = useState()
const router = useRouter()
const handleState = (status) => {
  switch (status) {
    case "Approved": return "text-lemongreen";  
    case "Pending": return "text-yellowCust";  
    case "Rejected": return "text-Error";  
    default: return "text-Error"; // Default case
  }
};


  const handleApprove = async () => {
    try {
      if (!selectedUser) return;
      const status = { status: "Approved" };

      // ✅ 1. Update backend
      await hrmsAPI.updateLeave(selectedUser.leaveId, status, token);

      // ✅ 2. Update local state instantly
      setLeaveList(prev =>
        prev.map(leave =>
          leave.leaveId === selectedUser.leaveId
            ? { ...leave, status: "Approved" }
            : leave
        )
      );

      // ✅ 3. Close modal
      setisOpen(false);

    } catch (error) {
      console.error('Failed to approve leave:', error);
    }
  };

    const handleRevoke = async () => {
    try {
      if (!selectedUser) return;
      const status = { status: "Rejected" };

      // ✅ 1. Update backend
      await hrmsAPI.updateLeave(selectedUser.leaveId, status, token);

      // ✅ 2. Update local state instantly
      setLeaveList(prev =>
        prev.map(leave =>
          leave.leaveId === selectedUser.leaveId
            ? { ...leave, status: "Rejected" }
            : leave
        )
      );

      // ✅ 3. Close modal
      setisOpen2(false);

    } catch (error) {
      console.error('Failed to approve leave:', error);
    }
  };

  return (
    <div className='font-semibold space-y-[3.5625rem]'>
      <div className='flex flex-col gap-[4.25rem]'>

        {/* InformationContainers */}
        <div className='flex gap-[1.25rem]'>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                      <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>{leaves.totalRequests || 0}</span>
                    <span className='text-formColor'>Total requests</span>
                </div>
                </div>
            </div>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                      <img src="/image/Icon/Close.png" alt="" />  
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>{leaves.pendingRequests || 0}</span>
                    <span className='text-formColor'>Pending</span>
                </div>
                </div>
            </div>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                           <img src="/svg/SvgImage/cardIcon.svg" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-formColor'>{leaves.approved || 0}</span>
                        <span className='text-formColor'>Approved</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Maincontainer */}
        <div>
          <div className='between'>
            <div className='flex flex-col'>
              <h1 className='textWhite'>Daily Attendance Records</h1>
              <h4 className='textLimegray'>Showing attendance for 7/17/2025</h4>
            </div>
            <div className='flex gap-[1.5rem]'>
              {/* filter */}
              <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                <div className='flex items-center gap-[0.625rem]'>
                  <img src="/svg/SvgImage/Filter.svg" alt="" />
                  <span className='text-white'>All Status</span>
                </div>
                  <img src="/image/Icon/ArrowDown.png" alt="" />
              </div>
              <div>
                <button type="button" className='cursor-pointer '>
                  <div className='center-center w-[10.8125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                      <img src="/image/Icon/Export.png" alt="" />
                    <span className='text-black'>Export Report</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className='h-[20rem] overflow-x-hidden   overflow-y-auto scrollBarDash'>
        <table className='w-full mb-[5rem] '>
          <thead className='border-b border-limegray text-nowrap'>
            <tr className='textFormColor1'>
              <th className='pb-[0.8125rem] pr-[11.5rem]'>Employee Name</th>
              <th className='pb-[0.8125rem] pr-[11.8125rem]'>Leave Type</th>
              <th className='pb-[0.8125rem] pr-[8.625rem]'>Duration</th>
              <th className='pb-[0.8125rem] pr-[13.375rem]'>Reason</th>
              <th className='pb-[0.8125rem] pr-[10.0625rem]'>Status</th>
              <th className='pb-[0.8125rem] pr-[11.375rem]'>Action</th>
            </tr>
          </thead>
          <tbody className=''>
          {leaveList && leaveList.length > 0 ? (
            leaveList.map((lvl) => (
              <tr key={lvl.leaveId}>
                <td className='pt-[2.25rem]'>
                  <h4 className='text-limegray'>{lvl.employeeName}</h4>
                </td>
                <td className='pt-[2.25rem]'>
                  <h4 className='text-limegray'>{lvl.leaveType}</h4>
                </td>
                <td className='pt-[2.25rem]'>
                  <h4 className='text-limegray'>{lvl.durationDays} Days</h4>
                </td>
                <td className='pt-[2.25rem]'>
                  <h4 className='text-limegray'>{lvl.reason}</h4>
                </td>
                <td className='pt-[2.25rem]'>
                  <span className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(lvl.status)}`}>
                    {lvl.status || 'Unknown'}
                  </span>
                </td>
                <td className={`pt-[1.875rem] ${lvl.status === "Pending"  ? '' : 'hidden'}`}>
                  <div className='flex gap-[1.6875rem]'>
                    <button className='flex items-center border rounded-full border-[#303030] cursor-pointer gap-[0.375rem] px-[12px] py-[6px]' onClick={() =>{setSelectedUser(lvl); setisOpen(true);} }>
                      <img src="/image/Icon/Action/Right.png" alt="" />
                      <span className='text-lemongreen text-sm'>Accept</span>
                    </button>
                    <button className='flex items-center border rounded-full border-[#303030] gap-[0.375rem] px-[12px] py-[6px]' onClick={() =>{setSelectedUser(lvl); setisOpen2(true);} }>
                      <img src="/image/Icon/Action/X.png" alt="" />
                      <span className='text-Error text-sm'>Reject</span>
                    </button>
                  </div>
                </td>
                <ModalContainerRevoke open={isOpen}>
                  <Revoke  
                  Header = "Are You Sure"  
                  fontColor='text-black' 
                  color= 'bg-lemongreen' 
                  Parag = "Are you sure you want to approve this user permistion"  
                  onConfirm={handleApprove}
                  onNavigate={()=>setisOpen(false)}    
                  confirmation = "Approve" 
                  onConfirmonClose={() => setisOpen(false)} />
                </ModalContainerRevoke>

                <ModalContainerRevoke open={isOpen2}>
                  <Revoke  
                  Header = "Are You Sure"  
                  fontColor='text-formColor' 
                  color= 'bg-Error' 
                  Parag = "Are you sure you want to revoke this user permistion"  
                  onConfirm={handleRevoke}
                  onNavigate={()=>setisOpen2(false)}    
                  confirmation = "Revoke" 
                  onConfirmonClose={() => setisOpen2(false)} />
                </ModalContainerRevoke>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6' className='text-center text-limegray py-6'>
                No Leave Request Currently
              </td>
            </tr>
          )}

          </tbody>
        </table>
 

      </div>
    </div>
  )
}

export default page