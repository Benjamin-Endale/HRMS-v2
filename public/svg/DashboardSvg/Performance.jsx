import React from 'react'

const Performance = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={ readPath === 'PerformancePages/Overview' || readPath === 'EmployeePortal/Performance'  || readPath === "PerformancePages/Goals" || readPath === 'PerformancePages/FeedBack' || readPath === 'PerformancePages/Reviews' || readPath === 'EmployeePortal/Performance/Goals' || readPath === "EmployeePortal/Performance/Reviews" || readPath === "EmployeePortal/Performance/Feedback" || readPath === "EmployeePortal/Performance/MyPerformance" ? 'white' : '#5D6150'} strokeWidth="1.5">
        <path d="M10.5 1.75C15.3324 1.75 19.25 5.66751 19.25 10.5C19.25 15.3324 15.3324 19.25 10.5 19.25C5.66751 19.25 1.75 15.3324 1.75 10.5C1.75 8.05228 2.75506 5.8393 4.375 4.25125"  strokeLinecap="round"/>
        <path d="M4.375 10.5C4.375 13.8827 7.11726 16.625 10.5 16.625C13.8827 16.625 16.625 13.8827 16.625 10.5C16.625 7.11726 13.8827 4.375 10.5 4.375"  strokeLinecap="round"/>
        <path d="M10.5 14C12.433 14 14 12.433 14 10.5C14 8.567 12.433 7 10.5 7"  strokeLinecap="round"/>
     </svg>
  )
}

export default Performance