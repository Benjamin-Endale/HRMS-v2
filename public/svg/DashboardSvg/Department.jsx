import React from 'react'



const Department = ({readPath}) => {
  return (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 7.875V11.375M10.5 11.375H7.875C6.22508 11.375 5.40012 11.375 4.88757 11.8876C4.375 12.4002 4.375 13.2251 4.375 14.875M10.5 11.375H13.125C14.7749 11.375 15.5998 11.375 16.1124 11.8876C16.625 12.4002 16.625 13.2251 16.625 14.875" stroke={readPath === 'Admin/Department' || readPath === 'Admin/DepartmentView'  ? 'white' : '#5D6150'}  strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1.75758 18.375C1.75 18.1234 1.75 17.8343 1.75 17.5C1.75 16.2626 1.75 15.6439 2.13442 15.2594C2.51885 14.875 3.13757 14.875 4.375 14.875C5.61243 14.875 6.23115 14.875 6.61558 15.2594C7 15.6439 7 16.2626 7 17.5C7 17.8343 7 18.1234 6.99242 18.375" stroke={readPath === 'Admin/Department' || readPath === 'Admin/DepartmentView'  ? 'white' : '#5D6150'}  strokeWidth="1.3125" strokeLinecap="round"/>
        <path d="M14.0076 18.375C14 18.1234 14 17.8343 14 17.5C14 16.2626 14 15.6439 14.3844 15.2594C14.7689 14.875 15.3876 14.875 16.625 14.875C17.8624 14.875 18.4811 14.875 18.8656 15.2594C19.25 15.6439 19.25 16.2626 19.25 17.5C19.25 17.8343 19.25 18.1234 19.2424 18.375" stroke={readPath === 'Admin/Department' || readPath === 'Admin/DepartmentView'  ? 'white' : '#5D6150'}  strokeWidth="1.3125" strokeLinecap="round"/>
        <path d="M8.99999 2.625H12C13.8152 2.625 14 3.59619 14 5.25C14 6.90381 13.8152 7.875 12 7.875H8.99999C7.1848 7.875 7 6.90381 7 5.25C7 3.59619 7.1848 2.625 8.99999 2.625Z" stroke={readPath === 'Admin/Department' || readPath === 'Admin/DepartmentView'  ? 'white' : '#5D6150'}  strokeWidth="1.3125"/>
        </svg>

  )
}

export default Department