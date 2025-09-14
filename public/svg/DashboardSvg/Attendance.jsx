import React from 'react'

const Attendance = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'Attendance' ||  readPath === 'EmployeePortal/Attendance' ? 'white' : '#5D6150'} strokeWidth="1.3125">
        <path d="M8.75 6.125H1.75"  strokeLinecap="round"/>
        <path d="M7 10.5H1.75"  strokeLinecap="round"/>
        <path d="M8.75 14.875H1.75"  strokeLinecap="round"/>
        <path d="M14.875 14.875C17.2912 14.875 19.25 12.9162 19.25 10.5C19.25 8.08375 17.2912 6.125 14.875 6.125C12.4588 6.125 10.5 8.08375 10.5 10.5C10.5 12.9162 12.4588 14.875 14.875 14.875Z" />
        <path d="M14.875 8.75V10.3654L15.75 11.375"  strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default Attendance