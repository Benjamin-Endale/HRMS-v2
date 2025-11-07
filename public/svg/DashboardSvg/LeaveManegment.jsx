import React from 'react'

const LeaveManegment = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={ readPath==="Admin/LeaveManagment" || readPath === 'EmployeePortal/LeaveRequest/Approved' || readPath === 'EmployeePortal/LeaveRequest' || readPath === 'EmployeePortal/LeaveRequest/Pending' || readPath === 'EmployeePortal/LeaveRequest/Rejected' || readPath==="Admin/OrganizationPages/LeaveManagment" || readPath === 'Admin/OrganizationPages/EmployeePortal/LeaveRequest/Approved' || readPath === 'Admin/OrganizationPages/EmployeePortal/LeaveRequest/Pending' || readPath === 'Admin/OrganizationPages/EmployeePortal/LeaveRequest/Rejected' ? 'white' : '#5D6150'} strokeWidth="1.3125">
        <path d="M1.75 10.5C1.75 7.20017 1.75 5.55026 2.77512 4.52512C3.80026 3.5 5.45017 3.5 8.75 3.5H12.25C15.5498 3.5 17.1998 3.5 18.2248 4.52512C19.25 5.55026 19.25 7.20017 19.25 10.5V12.25C19.25 15.5498 19.25 17.1998 18.2248 18.2248C17.1998 19.25 15.5498 19.25 12.25 19.25H8.75C5.45017 19.25 3.80026 19.25 2.77512 18.2248C1.75 17.1998 1.75 15.5498 1.75 12.25V10.5Z" />
        <path d="M6.125 3.5V2.1875"  strokeLinecap="round"/>
        <path d="M14.875 3.5V2.1875"  strokeLinecap="round"/>
        <path d="M2.1875 7.875H18.8125"  strokeLinecap="round"/>
    </svg>
  )
}

export default LeaveManegment