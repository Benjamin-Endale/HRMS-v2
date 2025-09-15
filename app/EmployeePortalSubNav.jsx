'use client'
import React , {useState} from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import ModalContainerApplyLeave from './Modals/ApplyLeave/ModalContainerApplyLeave';
import ApplyLeave from './Modals/ApplyLeave/ApplyLeave';


const EmployeePortalSubNav = ({ readPath }) => {
    const leaveRequest = [
    { label: "Approved", path: "/EmployeePortal/LeaveRequest/Approved" },
    { label: "Pending", path: "/EmployeePortal/LeaveRequest/Pending" },
    { label: "Rejected", path: "/EmployeePortal/LeaveRequest/Rejected" },
  ]

    const Performance = [
    { label: "My Performance", path: "/EmployeePortal/Performance/MyPerformance" },
    { label: "Goals & KPIs", path: "/EmployeePortal/Performance/Goals" },
    { label: "Reviews ", path: "/EmployeePortal/Performance/Reviews" },
    { label: "360 Feedback ", path: "/EmployeePortal/Performance/Feedback" },

  ]
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen,setisOpen] = useState(false)


  return (
    <>
    <div className='font-semibold'>
        <div className={`${readPath === '/EmployeePortal/LeaveRequest/Approved' || readPath === "/EmployeePortal/LeaveRequest/Pending" || readPath === "/EmployeePortal/LeaveRequest/Rejected" ? 'block' : 'hidden'} cursor-pointer flex flex-col gap-[3.3125rem]`}>
            {/* InformationContainers */}
            <div className='flex gap-[3.025rem]'>
                <div className='carDash2 flex-1'>
                    <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                            <img src="/image/Icon/TimeIcon.png" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-formColor'>25</span>
                        <span className='text-formColor'>Total Leave</span>
                    </div>
                    </div>
                </div>
                <div className='carDash2 flex-1'>
                    <div className='h-full between flex-col'>
                        <div className='flex justify-between'>
                            <div>
                                <img src="/image/Icon/TimeIcon.png" alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='text-5xl text-formColor'>15</span>
                            <span className='text-formColor'>Used Leaved</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative'>
                <div className="center-center gap-[1.75rem]">
                    {leaveRequest.map(item => (
                    <div
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className={`w-[8.875rem]  text-center py-[0.875rem] relative px-[1.875rem]  text-nowrap  ${pathname === item.path ? 'text-lemongreen' : 'textLimegray1'}`}>
                        {item.label}
                        <div className={`${pathname === item.path ? 'absolute left-0 h-[3px] w-full bottom-0 rounded-[0.375rem] bg-lemongreen' : ''}`}></div>
                    </div>
                    ))}
                    
                </div>
                <div className='absolute right-0 top-0'>
                    <button onClick={()=>setisOpen(true)} type="button" className='center-center w-[20.3125rem] h-[3.4375rem] bg-lemongreen rounded-[10px] cursor-pointer'  >
                        <div className='flex gap-[0.625rem] center-center'>
                            <img src="/image/Icon/ExportLeave.png" alt="" />
                            <h4 className='text-black'>Apply Leaves</h4>
                        </div>
                    </button>
                    <ModalContainerApplyLeave open={isOpen}>
                        <ApplyLeave onClose={() => setisOpen(false)}/>
                    </ModalContainerApplyLeave>
                </div>
            </div>
        </div>
        <div className={`${readPath === '/EmployeePortal/Performance/Goals' || readPath === "/EmployeePortal/Performance/Reviews" || readPath === "/EmployeePortal/Performance/Feedback" || readPath === "/EmployeePortal/Performance/MyPerformance" ? 'block' : 'hidden'} cursor-pointer flex flex-col gap-[3.3125rem]`}>
            <div>
                <div className="flex font-medium gap-[1.75rem]">
                    {Performance.map(item => (
                    <div
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className={`w-[8.875rem] center-center py-[0.875rem] relative px-[1.875rem]  text-nowrap  ${pathname === item.path ? 'text-lemongreen' : 'textLimegray1'}`}>
                        {item.label}
                        <div className={`${pathname === item.path ? 'absolute left-0 h-[3px] w-full bottom-0 rounded-[0.375rem] bg-lemongreen' : ''}`}></div>
                    </div>
                    ))}
                    
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default EmployeePortalSubNav