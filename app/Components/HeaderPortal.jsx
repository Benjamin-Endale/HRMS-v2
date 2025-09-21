import Announcement from '@/public/svg/DashboardSvg/Announcement'
import React from 'react'
import { SignOutButton } from './SignOutButton'

const HeaderPortal = ({ readPath,session }) => {
  // Object with code-friendly keys
  const parag = {
    Dashboard: "Welcome back! Heres whats happening at your portal today.",
    Organization: "Welcome back! Heres whats happening at your portal today.",
    Performance: "Welcome back! Heres whats happening at your portal today.",
    Attendance: "Welcome back! Heres whats happening at your portal today.",
    Leave_Request: "Welcome back! Heres whats happening at your portal today.",
    Training: "Welcome back! Heres whats happening at your portal today.",
    Setting:"Welcome back! Heres whats happening at your portal today.",
    Announcement:"Welcome back! Heres whats happening at your portal today.",

  }

  // Map human-readable titles to object keys
  const keyMap = {
    'EmployeePortal/Dashboard':'Dashboard',
    'EmployeePortal/Attendance':'Attendance',
    'EmployeePortal/LeaveRequest':'Leave_Request',
    'EmployeePortal/Performance':'Performance',
    'EmployeePortal/Training/Enrolment':'Training',
    'EmployeePortal/Training/Programs':'Training',
    'EmployeePortal/Announcement':'Announcement',
    'EmployeePortal/Setting':'Setting',
    'EmployeePortal/LeaveRequest/Approved':'Leave_request',
    'EmployeePortal/LeaveRequest/Pending': 'Leave_request',
    'EmployeePortal/LeaveRequest/Rejected': 'Leave_request',
    'EmployeePortal/Performance/Feedback': 'Performance',
    'EmployeePortal/Performance/Goals': 'Performance',
    'EmployeePortal/Performance/MyPerformance': 'Performance',
    'EmployeePortal/Performance/Reviews': 'Performance',
    "SuperAdmin/AllOrganization":"Performance",
    "EmployeePortal/Announcement/AnnouncementDetail":"Announcement"


  }

  // Safely access the right key
  const description = parag[keyMap[readPath]] || ""

  return (
    <div className='flex items-center w-full'>
      <header className='w-[calc(100%-3.0625rem)] flex items-center justify-between'>
        <div className='flex flex-col  leading-none space-y-[0.4375rem]'>
          <h1 className='text-white text-[2rem] font-semibold'>{keyMap[readPath].replace(/_/g, ' ')} </h1>
          <h4 className='text-limegray text-[15px] font-medium'>{description}</h4>
        </div>
        <div className='h-full w-[19.375rem] text-nowrap'>
            <SignOutButton session={session} />
        </div>
      </header> 
    </div>
  )
}

export default HeaderPortal
