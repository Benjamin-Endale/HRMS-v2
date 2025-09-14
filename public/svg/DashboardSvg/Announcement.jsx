import React from 'react'

const Announcement = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke = {readPath === 'Announcement' || readPath === 'EmployeePortal/Announcement' ? 'white' : '#5D6150'} strokeWidth="1.5" >
        <path d="M10.5 6.125V14.875"  strokeLinecap="round"/>
        <path d="M14.875 8.75V12.25"  strokeLinecap="round"/>
        <path d="M6.125 7.875V13.125"  strokeLinecap="round"/>
        <path d="M1.75 10.5C1.75 6.37521 1.75 4.31281 3.03141 3.03141C4.31281 1.75 6.37521 1.75 10.5 1.75C14.6248 1.75 16.6872 1.75 17.9686 3.03141C19.25 4.31281 19.25 6.37521 19.25 10.5C19.25 14.6248 19.25 16.6872 17.9686 17.9686C16.6872 19.25 14.6248 19.25 10.5 19.25C6.37521 19.25 4.31281 19.25 3.03141 17.9686C1.75 16.6872 1.75 14.6248 1.75 10.5Z" />
    </svg>
  )
}

export default Announcement