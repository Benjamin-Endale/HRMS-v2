import React from 'react'

const Employee = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'Admin/Employees' || readPath === 'Admin/EmployeeRegistration/AddNewemployee' || readPath === "Admin/EmployeeView" || readPath === 'Admin/EmployeeRegistration/AddNewemployeesecond' || readPath === 'Admin/EmployeeRegistration/Compensation' || readPath === 'Admin/EmployeeRegistration/System' ? 'white' : '#5D6150'} strokeWidth="1.5">
        <path d="M7.875 8.75C9.808 8.75 11.375 7.183 11.375 5.25C11.375 3.317 9.808 1.75 7.875 1.75C5.942 1.75 4.375 3.317 4.375 5.25C4.375 7.183 5.942 8.75 7.875 8.75Z" />
        <path d="M13.125 7.875C14.5748 7.875 15.75 6.69974 15.75 5.25C15.75 3.80026 14.5748 2.625 13.125 2.625"  strokeLinecap="round"/>
        <path d="M7.875 18.375C11.2577 18.375 14 16.808 14 14.875C14 12.942 11.2577 11.375 7.875 11.375C4.49226 11.375 1.75 12.942 1.75 14.875C1.75 16.808 4.49226 18.375 7.875 18.375Z" />
        <path d="M15.75 12.25C17.2849 12.5866 18.375 13.439 18.375 14.4375C18.375 15.3381 17.488 16.12 16.1875 16.5116"  strokeLinecap="round"/>
    </svg>
  )
}

export default Employee